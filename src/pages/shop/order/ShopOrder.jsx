import React, { useState } from 'react';

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
