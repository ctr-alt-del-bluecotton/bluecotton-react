import React, { useEffect, useMemo, useState } from "react";
import S from "./style";
import OrderUserInfo from "./OrderUserInfo";
import OrderProduct from "./OrderProduct";
import PaymentMethod from "./PaymentMathod"; 
import { useModal } from "../../../components/modal/useModal";

// ✅ 환경변수
const PORTONE_IMP_KEY = process.env.REACT_APP_PORTONE_IMP_KEY;
const API = process.env.REACT_APP_BACKEND_URL;

// ✅ IMP SDK 1회 로드 유틸
const getIMP = (() => {
  let promise;
  return () => {
    if (window.IMP) return Promise.resolve(window.IMP);
    if (promise) return promise;

    promise = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://cdn.iamport.kr/v1/iamport.js";
      script.async = true;
      script.onload = () => {
        if (window.IMP) {
          if (!PORTONE_IMP_KEY) {
            reject(new Error("PORTONE 식별키 없음 (REACT_APP_PORTONE_IMP_KEY)"));
            return;
          }
          window.IMP.init(PORTONE_IMP_KEY);
          resolve(window.IMP);
        } else {
          reject(new Error("PortOne SDK 로드 실패"));
        }
      };
      script.onerror = () => reject(new Error("PortOne 스크립트 로드 실패"));
      document.head.appendChild(script);
    });

    return promise;
  };
})();

// ✅ 결제 팝업 스타일 강제
const enforceIframeStyles = () => {
  const popup = document.getElementById("portone-payment-popup");
  if (!popup) return;
  popup.style.setProperty("border", "none", "important");
  popup.style.setProperty("box-shadow", "none", "important");
  popup.style.setProperty("outline", "none", "important");
  const iframe = popup.querySelector("iframe");
  if (iframe) {
    iframe.style.setProperty("border", "0", "important");
    iframe.style.setProperty("box-shadow", "none", "important");
    iframe.style.setProperty("outline", "none", "important");
    iframe.style.setProperty("overflow", "hidden", "important");
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("allowtransparency", "true");
  }
};

const ShopOrderMenu = () => {
  const { openModal } = useModal();

  // ✅ 결제 상태
  const [payType, setPayType] = useState(null); // 'toss' | 'kakao' | 'general' | 'candy'
  const [generalMethod, setGeneralMethod] = useState("card"); // 'card' | 'vbank' | 'trans' 등
  const [payLoading, setPayLoading] = useState(false);

  const isCandy = payType === "candy";

  // ✅ 금액(예시)
  const productAmount = 1000;
  const shippingFee = 0;
  const totalAmount = useMemo(() => productAmount + shippingFee, [productAmount, shippingFee]);

  // ✅ 구매자 정보(예시)
  const buyer = {
    email: "user@example.com",
    name: "최준서",
    tel: "010-1234-5678",
    addr: "서울 서초구 강남대로 47-6",
    postcode: "06234",
  };

  // ✅ SDK 준비
  useEffect(() => {
    getIMP().catch((e) => {
      console.error(e);
      openModal({
        title: "결제 준비 실패",
        message: e.message || "PortOne SDK를 불러오지 못했습니다.",
        confirmText: "확인",
      });
    });
  }, [openModal]);

  const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);

  // ✅ 결제 버튼 핸들러
  const handlePortOnePay = async () => {
    if (payLoading) return;

    const amountToPay = Number(totalAmount);

    if (!Number.isFinite(amountToPay) || amountToPay <= 0) {
    return openModal({ title:"결제 실패", message:"결제 금액이 올바르지 않습니다.", confirmText:"확인" });
  }

    
    // 캔디 결제 분기
    if (payType === "candy") {
      openModal({
        title: "캔디 결제 안내",
        message: "캔디 결제는 별도의 내부 차감 로직으로 처리됩니다.",
        confirmText: "확인",
      });
      return;
    }

    if (!payType) {
      openModal({
        title: "결제 수단 선택",
        message: "결제 수단을 선택해 주세요.",
        confirmText: "확인",
      });
      return;
    }

    setPayLoading(true);
    try {
      const IMP = await getIMP();

      // ✅ 가맹점 주문번호
      const merchant_uid = `BC_${Date.now()}`;

      // ✅ PG/결제수단 매핑
      let pg = "";
      let pay_method = "";

      switch (payType) {
        case "toss":
          // tosspayments 권장
          pg = "uplus.tlgdacomxpay";
          pay_method = "card";
          break;
        case "kakao":
          pg = "kakaopay.TC0ONETIME"; // kakaopay.TC0ONETIME도 가능하나 간단 표기
          pay_method = "card";
          break;
        case "general":
          pg = "nice_v2";
          pay_method = generalMethod; // 'card' | 'vbank' | 'trans' 등
          break;
        default:
          openModal({
            title: "오류",
            message: "결제 수단을 확인해 주세요.",
            confirmText: "확인",
          });
          setPayLoading(false);
          return;
      }
      if (!API) {
        console.warn("REACT_APP_BACKEND_URL이 설정되지 않아 사전등록/검증을 생략합니다.");
      } else {
        const prepRes = await fetch(`${API}/payment/prepare`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ merchantUid: merchant_uid, amount: amountToPay }), 
        });
        if (!prepRes.ok) {
          const message = await prepRes.text();
          throw new Error(`사전 등록 실패 : ${message || prepRes.status}`);
        }
      }

      // ✅ 결제 요청 (콜백에 async 사용하도록 래핑)
      await new Promise((resolve) => {
        IMP.request_pay(
          {
            pg,
            pay_method,
            merchant_uid,
            name: "블루코튼 상품 결제",
            amount: amountToPay,
            buyer_email: buyer.email,
            buyer_name: buyer.name,
            buyer_tel: buyer.tel,
            buyer_addr: buyer.addr,
            buyer_postcode: buyer.postcode,
            ...(isMobile ? { m_redirect_url: window.location.href } : {}),
          },
          async (rsp) => {
            // 팝업 열리자마자 스타일 강제 적용
            requestAnimationFrame(enforceIframeStyles);

            if (rsp.success || rsp.imp_uid) {
              try {
                // ✅ 웹(PC) 환경일 때 서버 검증
                if (!isMobile && API) {
                  const vRes = await fetch(`${API}/payment/verify`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      impUid: rsp.imp_uid,
                    }),
                  });
                  if (!vRes.ok) {
                    const message = await vRes.text();
                    throw new Error(`검증 실패 : ${message || vRes.status}`);
                  }
                }

                console.log("결제 성공: ", rsp);
                openModal({
                  title: "결제 완료",
                  message: "결제가 완료되었습니다.",
                  confirmText: "확인",
                  // onConfirm: () => navigate('/orders/complete')
                });
              } catch (err) {
                console.error(err);
                openModal({
                  title: "결제 검증 오류",
                  message: err.message || "결제 검증 중 오류가 발생했습니다.",
                  confirmText: "확인",
                });
              }
            } else {
              console.error("결제 실패: ", rsp);
              openModal({
                title: "결제 실패",
                message:  rsp.error_msg || rsp.fail_reason || (rsp.error_code ? `오류코드: ${rsp.error_code}` : "알 수 없는 오류"),
                confirmText: "확인",
              });
            }

            resolve(); // Promise 종료
          }
        );
      });
    } catch (e) {
      console.error(e);
      openModal({
        title: "결제 오류",
        message: e.message || "결제 준비 중 오류가 발생했습니다.",
        confirmText: "확인",
      });
    } finally {
      setPayLoading(false);
    }
  };

  return (
    <S.OrderPageWrap className={isCandy ? "candy-mode" : ""}>
      <S.OrderMainSection>
        <OrderUserInfo />
        <OrderProduct />
        <PaymentMethod value={payType} onChange={setPayType} />
        {/* 일반결제(method) 세부 옵션 UI가 있다면 아래에 렌더 */}
        {/* {payType === 'general' && <GeneralMethod value={generalMethod} onChange={setGeneralMethod} />} */}
      </S.OrderMainSection>

      <S.OrderSideSection>
        <S.SideContainer>
          <S.SideTitle>결제 예정금액</S.SideTitle>
          <S.SideRow>
            <span>상품금액</span>
            <span>{productAmount.toLocaleString()}원</span>
          </S.SideRow>
          <S.SideRow>
            <span>배송비</span>
            <span>{shippingFee.toLocaleString()}원</span>
          </S.SideRow>
          <S.SideTotal>
            <span>합계</span>
            <span className="price">{totalAmount.toLocaleString()}원</span>
          </S.SideTotal>
          <S.PayButton onClick={handlePortOnePay} disabled={payLoading}>
            {payLoading ? "결제창 여는 중…" : `${totalAmount.toLocaleString()}원 결제하기`}
          </S.PayButton>
        </S.SideContainer>
      </S.OrderSideSection>
    </S.OrderPageWrap>
  );
};

export default ShopOrderMenu;
