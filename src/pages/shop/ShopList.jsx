import React, { useState } from "react";
import { Link } from "react-router-dom";
import S from "./style";

const ShopList = ({ items }) => {
  const [liked, setLiked] = useState(new Set());
  const toggleLike = (id) =>
    setLiked((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const data = Array.isArray(items) && items.length > 0
      ? items
      : [...Array(8)].map((_, i) => ({
          id: i + 1,
          name: `상품 ${i + 1}`,
          imageUrl: `products/sample_${i + 1}.png`,
          priceText: "10,000원",
          score: "4.8",
          reviewCount: 22,
          likeCount: 255,
          isNew: true,
          isBest: i % 2 === 0,
        }));

  return (
    <S.CardGrid>
      {data.map((item, i) => {
        const id = item.id ?? i + 1;
        const isActive = liked.has(id);
        return (
          <S.Card key={id}>
            <S.LikeButton
              type="button"
              aria-label="찜하기"
              aria-pressed={isActive}
              $active={isActive}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleLike(id);
              }}/>

            <Link to={`/main/shop/read/${id}`} 
            style={{ display: "block", textDecoration: "none", color: "inherit" }}>
              <S.ProductImageBox $bg={item.imageUrl} />
              <S.ProductTitleRow>
                <S.ProductName>{item.name}</S.ProductName>
                {item.isNew && <S.NewTag>NEW</S.NewTag>}
                {item.isBest && <S.BestTag>BEST</S.BestTag>}
              </S.ProductTitleRow>

              <S.ProductPrice>{item.priceText}</S.ProductPrice>

              <S.ProductSubInfo>
                <S.IconText>
                  <img src="/assets/icons/review.svg" alt="리뷰 아이콘" />
                  <S.Text>
                    {item.score} ({item.reviewCount})
                  </S.Text>
                </S.IconText>
                <S.IconText>
                  <img src="/assets/icons/filedlike.svg" alt="찜하기 아이콘" />
                  <S.Text>{item.likeCount}</S.Text>
                </S.IconText>
              </S.ProductSubInfo>
            </Link>
          </S.Card>
        );
      })}
    </S.CardGrid>
  );
};

export default ShopList;
