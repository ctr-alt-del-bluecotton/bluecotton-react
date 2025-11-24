// src/pages/shop/order/ShopOrderMenu.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import S from "./style";
import OrderUserInfo from "./OrderUserInfo";
import OrderProduct from "./OrderProduct";
import PaymentMethod from "./PaymentMathod";
import { useModal } from "../../../components/modal/useModal";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { updateMemberCandy } from "../../../store/userSlice";

const PORTONE_IMP_KEY = process.env.REACT_APP_PORTONE_IMP_KEY;
const API = process.env.REACT_APP_BACKEND_URL;

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
        if (!window.IMP) return reject(new Error("PortOne SDK 로드 실패"));
        if (!PORTONE_IMP_KEY) return reject(new Error("포트원 식별키 없음"));
        window.IMP.init(PORTONE_IMP_KEY);
        resolve(window.IMP);
      };
      script.onerror = () => reject(new Error("PortOne 로드 실패"));
      document.head.appendChild(script);
    });
    return promise;
  };
})();

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
  const { currentUser } = useSelector((s) => s.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const orderId = queryParams.get("orderId");
  const snapshot = location.state?.snapshot || null;

  const [orderData, setOrderData] = useState(null);
  const [isLoadingOrder, setIsLoadingOrder] = useState(true);
  const [payType, setPayType] = useState(null);
  const [generalMethod, setGeneralMethod] = useState("card");
  const [payLoading, setPayLoading] = useState(false);
  const merchantUidRef = useRef(null);
  const [candyBalance, setCandyBalance] = useState(0);

  const [deliveryInfo, setDeliveryInfo] = useState(null);

  useEffect(() => {
    setCandyBalance(Number(currentUser?.memberCandy ?? 0) || 0);
  }, [currentUser]);

  useEffect(() => {
    if (snapshot?.items?.length) {
      const items = snapshot.items.map((it) => {
        const quantity = Number(it.quantity ?? 1);
        const unitPrice = Number(it.unitPrice ?? 0);
        const lineTotal = unitPrice * quantity;
        return {
          productId: it.productId,
          name: it.name ?? it.productName ?? "",
          imageUrl: it.imageUrl ?? it.imgUrl ?? null,
          unitPrice,
          quantity,
          purchaseType: String(it.purchaseType ?? "CASH").toUpperCase(),
          orderTotalPrice: lineTotal,
          lineTotal,
        };
      });
      const totalPrice = Number(
        snapshot.totalPrice ??
          items.reduce((s, v) => s + (v.lineTotal || 0), 0)
      );
      setOrderData({
        orderId: Number(orderId) || undefined,
        items,
        totalPrice,
        provisional: true,
      });
      setIsLoadingOrder(false);
    }
  }, [snapshot, orderId]);

  useEffect(() => {
    if (snapshot?.items?.length) return;
    if (!orderId) {
      openModal({
        title: "오류",
        message: "주문 정보가 유효하지 않습니다.",
        confirmText: "확인",
        onConfirm: () => navigate("/main/shop/cart"),
      });
      return;
    }
    const fetchOrderData = async () => {
      if (!orderId || !currentUser?.id) return;
      setIsLoadingOrder(true);
      try {
        const res = await fetch(
          `${API}/order/option?id=${orderId}&memberId=${currentUser.id}`,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        if (!res.ok) throw new Error("주문 상세 정보 로드 실패");
        const result = await res.json();
        const rawServer = result?.data?.value ?? result?.data ?? null;
        let rawItems = [];
        let resolvedOrderId = Number(orderId);
        let totalPrice = 0;
        if (Array.isArray(rawServer)) {
          rawItems = rawServer;
          if (rawServer.length > 0) {
            resolvedOrderId = Number(rawServer[0].orderId);
          }
        } else if (rawServer) {
          rawItems = rawServer.items || [];
          resolvedOrderId = Number(rawServer.orderId);
          totalPrice = Number(rawServer.totalPrice ?? 0);
        }
        const items = rawItems.map((item) => {
          const quantity = Number(item.orderQuantity ?? 1);
          const unitPrice = Number(item.productPrice ?? 0);
          const lineTotal = Number(item.orderTotalPrice ?? unitPrice * quantity);
          return {
            productId: item.productId,
            name: item.productName ?? "",
            imageUrl: item.imageUrl ?? null,
            unitPrice,
            quantity,
            orderTotalPrice: lineTotal,
            lineTotal,
            purchaseType: String(
              item.purchaseType ?? item.productPurchaseType ?? "CASH"
            ).toUpperCase(),
          };
        });
        if (!totalPrice) {
          totalPrice = items.reduce(
            (sum, it) => sum + (it.orderTotalPrice || 0),
            0
          );
        }
        if (items.length > 0) {
          setOrderData({
            orderId: resolvedOrderId,
            items,
            totalPrice,
          });
        } else {
          setOrderData(null);
        }
      } catch (e) {
        openModal({
          title: "주문 로드 오류",
          message: e.message || "주문 정보를 불러오지 못했습니다.",
        });
        setOrderData(null);
      } finally {
        setIsLoadingOrder(false);
      }
    };
    if (currentUser?.id) fetchOrderData();
  }, [API, currentUser, navigate, openModal, orderId, snapshot]);

  const rawTotal = useMemo(() => {
    if (!orderData) return 0;
    if (
      typeof orderData.totalPrice === "number" &&
      orderData.totalPrice > 0
    ) {
      return orderData.totalPrice;
    }
    return (orderData.items || []).reduce(
      (s, it) => s + (it.orderTotalPrice ?? it.unitPrice * it.quantity),
      0
    );
  }, [orderData]);

  const FIXED_SHIPPING_FEE = 3000;
  const isCandy = payType === "candy";

  const shippingFee = useMemo(() => {
    if (isCandy) return 0;
    return rawTotal >= 30000 ? 0 : FIXED_SHIPPING_FEE;
  }, [rawTotal, isCandy]);

  const shippingFeeDisplay = useMemo(() => {
    if (isCandy) return "캔디 결제 시 배송비 무료";
    if (shippingFee === 0) return "30,000원 이상 결제시 배송비 무료";
    return `${shippingFee.toLocaleString()}원`;
  }, [isCandy, shippingFee]);

  const itemPrice = useMemo(() => rawTotal, [rawTotal]);
  const candyNeedAmount = itemPrice;
  const totalAmount = useMemo(() => itemPrice + shippingFee, [itemPrice, shippingFee]);

  const purchaseTypeForOrder = useMemo(() => {
    if (!orderData?.items?.length) return "CASH";
    return String(orderData.items[0].purchaseType).toUpperCase();
  }, [orderData]);

  const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);

  useEffect(() => {
    getIMP().catch((e) =>
      openModal({
        title: "결제 준비 실패",
        message: e.message,
        confirmText: "확인",
      })
    );
  }, [openModal]);

  const handlePortOnePay = async () => {
    if (!deliveryInfo) {
      return openModal({
        title: "배송 정보 없음",
        message: "배송지를 먼저 입력해주세요.",
      });
    }

    if (payLoading || isLoadingOrder || !orderData) {
      return openModal({
        title: "준비 중",
        message: "주문 정보 로드 대기 중입니다.",
      });
    }

    if (!currentUser?.id) {
      return openModal({
        title: "로그인 필요",
        message: "로그인 후 이용해주세요.",
        confirmText: "로그인",
        onConfirm: () => navigate("/login"),
      });
    }

    if (!payType) {
      return openModal({
        title: "결제 수단 선택",
        message: "결제 수단을 선택해주세요.",
      });
    }

    const effectiveOrderId = Number(orderData.orderId);
    if (!Number.isFinite(effectiveOrderId) || effectiveOrderId <= 0) {
      return openModal({
        title: "주문 오류",
        message: "주문번호가 유효하지 않습니다.",
      });
    }

    const amountToPay = Math.round(totalAmount);
    if (!Number.isFinite(amountToPay) || amountToPay <= 0) {
      return openModal({
        title: "결제 실패",
        message: "결제 금액 오류",
      });
    }

    try {
      setPayLoading(true);

      if (API) {
        await fetch(`${API}/delivery/save`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            orderId: effectiveOrderId,
            memberId: currentUser.id,
            productId: orderData.items[0]?.productId ?? null,
            deliveryReceiverName: deliveryInfo.deliveryReceiverName,
            deliveryReceiverPhone: deliveryInfo.deliveryReceiverPhone,
            deliveryAddress: deliveryInfo.deliveryAddress,
            deliveryRequest: deliveryInfo.deliveryRequest,
            deliveryFee: shippingFee,
            deliveryStatus: "PAID",
          }),
        });
      }

      if (isCandy) {
        if (candyBalance < candyNeedAmount) {
          return openModal({
            title: "캔디 부족",
            message: "보유 캔디가 부족합니다.",
          });
        }

        const res = await fetch(`${API}/payment/candy`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            orderId: effectiveOrderId,
            memberId: currentUser.id,
          }),
        });

        const json = await res.json().catch(() => null);
        const msg =
          json?.message ||
          json?.data?.message ||
          "캔디 결제가 완료되었습니다.";

        const next = Math.max(0, candyBalance - candyNeedAmount);
        setCandyBalance(next);
        dispatch(updateMemberCandy(next));

        openModal({
          title: "캔디 결제 완료",
          message: msg,
          confirmText: "확인",
          onConfirm: () =>
            navigate(`/main/my-page/my-shop/order?memberId=${currentUser.id}`),
        });
        return;
      }

      const IMP = await getIMP();
      let paymentType = "CASH";
      let pg = "";
      let pay_method = "";

      switch (payType) {
        case "toss":
          paymentType = "TOSS";
          pg = "uplus.tlgdacomxpay";
          pay_method = "card";
          break;
        case "kakao":
          paymentType = "KAKAO";
          pg = "kakaopay.TC0ONETIME";
          pay_method = "card";
          break;
        case "general":
          paymentType = "CARD";
          pg = "nice_v2.iamport00m";
          pay_method = generalMethod;
          break;
        default:
          throw new Error("결제 수단 오류");
      }

      let merchantUid = `BC_${effectiveOrderId}_${Date.now()}`;

      if (API) {
        const prepRes = await fetch(`${API}/payment/prepare`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            memberId: currentUser.id,
            orderId: effectiveOrderId,
            amount: amountToPay,
            paymentType,
            merchantUid,
          }),
        });

        const prepJson = await prepRes.json().catch(() => ({}));
        if (prepJson?.data?.merchantUid) {
          merchantUid = prepJson.data.merchantUid;
        }
      }

      merchantUidRef.current = merchantUid;

      await new Promise((resolve) => {
        IMP.request_pay(
          {
            pg,
            pay_method,
            merchant_uid: merchantUidRef.current,
            name:
              orderData.items.length > 1
                ? `${orderData.items[0].name} 외 ${
                    orderData.items.length - 1
                  }`
                : `블루코튼 주문결제 (${effectiveOrderId})`,
            amount: amountToPay,
            buyer_email: currentUser.memberEmail || "",
            buyer_name: currentUser.memberName || "",
            buyer_tel: currentUser.memberPhone || "",
            buyer_addr: deliveryInfo.deliveryAddress,
            buyer_postcode: "00000",
            ...(isMobile ? { m_redirect_url: window.location.href } : {}),
          },
          async (rsp) => {
            requestAnimationFrame(enforceIframeStyles);
            if (!rsp?.imp_uid) {
              openModal({
                title: "결제 실패",
                message: "사용자가 결제를 취소했습니다.",
              });
              resolve();
              return;
            }
            try {
              if (!isMobile) {
                const vRes = await fetch(`${API}/payment/verify`, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    impUid: rsp.imp_uid,
                    merchantUid: merchantUidRef.current,
                    memberId: currentUser.id,
                    paymentType,
                    pg: rsp.pg,
                    easyPayProvider: rsp.easy_pay?.provider,
                  }),
                });
                if (!vRes.ok) throw new Error("검증 실패");
              }

              openModal({
                title: "결제 완료",
                message: "결제가 완료되었습니다.",
                confirmText: "확인",
                onConfirm: () =>
                  navigate(
                    `/main/my-page/my-shop/order?memberId=${currentUser.id}`
                  ),
              });
            } catch (err) {
              openModal({
                title: "결제 검증 오류",
                message: err.message || "결제는 승인되었으나 오류 발생",
              });
            }
            resolve();
          }
        );
      });
    } catch (e) {
      openModal({
        title: "결제 오류",
        message: e.message || "결제 중 오류 발생",
      });
    } finally {
      setPayLoading(false);
    }
  };

  if (isLoadingOrder || !orderData) {
    return <S.OrderPageWrap>주문 정보 불러오는 중</S.OrderPageWrap>;
  }

  return (
    <S.OrderPageWrap className={isCandy ? "candy-mode" : ""}>
      <S.OrderMainSection>
        <OrderUserInfo onDeliveryChange={setDeliveryInfo} />
        <OrderProduct orderData={orderData} />
        <PaymentMethod
          value={payType}
          onChange={setPayType}
          candyBalance={candyBalance}
          candyPrice={itemPrice}
          purchaseType={purchaseTypeForOrder}
          onGeneralMethodChange={setGeneralMethod}
        />
      </S.OrderMainSection>

      <S.OrderSideSection>
        <S.SideContainer>
          <S.SideTitle>결제 예정금액</S.SideTitle>
          <S.SideRow>
            <span>상품금액</span>
            <span>{itemPrice.toLocaleString()}원</span>
          </S.SideRow>
          <S.SideRow>
            <span>배송비</span>
            <span>{shippingFeeDisplay}</span>
          </S.SideRow>
          <S.SideTotal>
            <span>합계</span>
            <span className="price">{totalAmount.toLocaleString()}원</span>
          </S.SideTotal>

          <S.PayButton
            onClick={handlePortOnePay}
            disabled={
              payLoading ||
              !Number.isFinite(Number(orderData?.orderId ?? orderId))
            }
          >
            {payLoading
              ? "결제창 여는 중…"
              : `${totalAmount.toLocaleString()}원 결제하기`}
          </S.PayButton>
        </S.SideContainer>
      </S.OrderSideSection>
    </S.OrderPageWrap>
  );
};

export default ShopOrderMenu;
