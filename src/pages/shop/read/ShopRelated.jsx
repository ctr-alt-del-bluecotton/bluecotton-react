import React from "react";
import { Link } from "react-router-dom";
import S from "./style";

const ShopRelated = () => {
  const relatedItems = [
    { id: 1, name: "솜이 인형", price: 14000, img: "/assets/images/shop_related_product1.png" },
    { id: 2, name: "솜이 키링", price: 12000, img: "/assets/images/shop_related_product2.png" },
    { id: 3, name: "솜이 쿠션", price: 19000, img: "/assets/images/shop_related_product3.png" },
    { id: 4, name: "솜이 티셔츠", price: 25000, img: "/assets/images/shop_related_product4.png" },
  ];

  return (
    <S.RelatedSection>
      <S.RelatedTitleRow>
        <S.BrandLink>블루코튼</S.BrandLink>
        <S.RelatedTitle>의 인기상품</S.RelatedTitle>
      </S.RelatedTitleRow>

      <S.RelatedGrid>
        {relatedItems.map((item) => (
          <S.RelatedCard key={item.id}>
            <S.RelatedThumb>
              <img src={item.img} alt={item.name} />
              <Link to={`/main/shop/read/${item.id}`} className="cover-link" />
            </S.RelatedThumb>

            <S.RelatedName>{item.name}</S.RelatedName>
            <S.RelatedPrice>{item.price.toLocaleString()}원</S.RelatedPrice>
          </S.RelatedCard>
        ))}
      </S.RelatedGrid>
    </S.RelatedSection>
  );
};

export default ShopRelated;
