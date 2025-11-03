import React, { useState } from 'react';
import OrderUserInfo from './OrderUserInfo';
import OrderProduct from './OrderProduct';
import PaymentMathod from './PaymentMathod'; 
import ChoosePayment from './ChoosePayment';
import ShopOrderMenu from './ShopOrderMenu';

const ShopOrder = () => {
  const [payType, setPayType] = useState(null); 

  return (
    <div>
      <ShopOrderMenu />
    </div>
  );
};

export default ShopOrder;
