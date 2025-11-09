import React, { useEffect, useMemo, useState } from 'react';
import S from './style';
import OrderUserInfo from './OrderUserInfo';
import OrderProduct from './OrderProduct';
import PaymentMethod from './PaymentMathod';
import { useModal } from "../../../components/modal/useModal";

const PORTONE_IMP_KEY = process.env.REACT_APP_PORTONE_IMP_KEY;

const getIMP = (() => {
  let promise;
  return () => {
    if (window.IMP) return Promise.resolve(window.IMP);
    if (promise) return promise;

    promise = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://cdn.iamport.kr/v1/iamport.js';
      script.async = true;
      script.onload = () => {
        if (window.IMP) {
          if (!PORTONE_IMP_KEY) {
            reject(new Error('PORTONE 식별키 없음 (REACT_APP_PORTONE_IMP_KEY)'));
            return;
          }
          window.IMP.init(PORTONE_IMP_KEY);
          resolve(window.IMP);
        } else {
          reject(new Error('PortOne SDK 로드 실패'));
        }
      };
      script.onerror = () => reject(new Error('PortOne 스크립트 로드 실패'));
      document.head.appendChild(script);
    });

    return promise;
  };
})();

const enforceIframeStyles = () => {
  const popup = document.getElementById('portone-payment-popup');
  if (!popup) return;
  popup.style.setProperty('border', 'none', 'important');
  popup.style.setProperty('box-shadow', 'none', 'important');
  popup.style.setProperty('outline', 'none', 'important');
  const iframe = popup.querySelector('iframe');
  if (iframe) {
    iframe.style.setProperty('border', '0', 'important');
    iframe.style.setProperty('box-shadow', 'none', 'important');
    iframe.style.setProperty('outline', 'none', 'important');
    iframe.style.setProperty('overflow', 'hidden', 'important');
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('allowtransparency', 'true');
  }
};

const ShopOrderMenu = () => {
  const { openModal } = useModal();

  const [payType, setPayType] = useState(null);
  const [generalMethod, setGeneralMethod] = useState('card');
  const [payLoading, setPayLoading] = useState(false);
  const isCandy = payType === 'candy';

  const productAmount = 13000;
  const shippingFee = 3000;
  const totalAmount = useMemo(() => productAmount + shippingFee, [productAmount, shippingFee]);

  const buyer = {
    email: 'user@example.com',
    name: '최준서',
    tel: '010-1234-5678',
    addr: '서울 서초구 강남대로 47-6',
    postcode: '06234',
  };

  useEffect(() => {
    getIMP().catch((e) => {
      console.error(e);
      openModal({
        title: '결제 준비 실패',
        message: e.message || 'PortOne SDK를 불러오지 못했습니다.',
        confirmText: '확인',
      });
    });
  }, [openModal]);

  const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);

  const handlePortOnePay = async () => {
    if (payLoading) return;

    if (payType === 'candy') {
      openModal({
        title: '캔디 결제 안내',
        message: '캔디 결제는 별도의 내부 차감 로직으로 처리됩니다.',
        confirmText: '확인',
      });
      return;
    }

    if (!payType) {
      openModal({
        title: '결제 수단 선택',
        message: '결제 수단을 선택해 주세요.',
        confirmText: '확인',
      });
      return;
    }

    setPayLoading(true);
    try {
      const IMP = await getIMP();

      const merchant_uid = `BC_${Date.now()}`;

      let pg = '';
      let pay_method = '';

      switch (payType) {
        case 'toss':
          pg = 'uplus.tlgdacomxpay';
          pay_method = 'card';
          break;
        case 'kakao':
          pg = 'kakaopay.TC0ONETIME';
          pay_method = 'card';
          break;
        case 'general':
          pg = 'nice_v2';
          pay_method = generalMethod;
          break;
        default:
          openModal({
            title: '오류',
            message: '결제 수단을 확인해 주세요.',
            confirmText: '확인',
          });
          setPayLoading(false);
          return;
      }

      IMP.request_pay(
        {
          pg,
          pay_method,
          merchant_uid,
          name: '블루코튼 상품 결제',
          amount: totalAmount,
          buyer_email: buyer.email,
          buyer_name: buyer.name,
          buyer_tel: buyer.tel,
          buyer_addr: buyer.addr,
          buyer_postcode: buyer.postcode,
          ...(isMobile ? { m_redirect_url: window.location.href } : {}),
        },
        (rsp) => {
          requestAnimationFrame(enforceIframeStyles);

          if (rsp.success) {
            console.log('결제 성공: ', rsp);
            openModal({
              title: '결제 완료',
              message: '결제가 완료되었습니다.',
              confirmText: '확인',
              // onConfirm: () => navigate('/orders/complete') 같은 후처리 가능
            });
          } else {
            console.error('결제 실패: ', rsp);
            openModal({
              title: '결제 실패',
              message: `사유: ${rsp.error_msg || '알 수 없는 오류'}`,
              confirmText: '확인',
            });
          }
          setPayLoading(false);
        }
      );
    } catch (e) {
      console.error(e);
      openModal({
        title: '결제 오류',
        message: e.message || '결제 준비 중 오류가 발생했습니다.',
        confirmText: '확인',
      });
      setPayLoading(false);
    }
  };

  return (
    <S.OrderPageWrap className={isCandy ? 'candy-mode' : ''}>
      <S.OrderMainSection>
        <OrderUserInfo />
        <OrderProduct />
        <PaymentMethod value={payType} onChange={setPayType} />
        {/* payType === 'general' 일 때 일반결제 상세 옵션을 보여줄 컴포넌트가 있으면 여기에 렌더 */}
        {/* {payType === 'general' && <GeneralMethod value={generalMethod} onChange={setGeneralMethod} />} */}
      </S.OrderMainSection>

      <S.OrderSideSection>
        <S.SideContainer>
          <S.SideTitle>결제 예정금액</S.SideTitle>
          <S.SideRow>
            <span>상품금액</span>
            <span>13,000원</span>
          </S.SideRow>
          <S.SideRow>
            <span>배송비</span>
            <span>3,000원</span>
          </S.SideRow>
          <S.SideTotal>
            <span>합계</span>
            <span className="price">16,000원</span>
          </S.SideTotal>
          <S.PayButton onClick={handlePortOnePay} disabled={payLoading}>
            {payLoading ? '결제창 여는 중…' : '16,000원 결제하기'}
          </S.PayButton>
        </S.SideContainer>
      </S.OrderSideSection>
    </S.OrderPageWrap>
  );
};

export default ShopOrderMenu;
