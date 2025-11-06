import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import S from "../style";

const MyShopLikeContainer = () => {
  const initialItems = useMemo(
    () =>
      [...Array(8)].map((_, i) => ({
        id: i + 1,
        name: `BT인형 ${i + 1}`,
        imageUrl: `/assets/images/products/sample_${i + 1}.png`,
        priceText: "14,000캔디",
        score: "4.8",
        reviewCount: 22,
        likeCount: 255,
        isNew: i % 2 === 0,
        isBest: i % 3 === 0,
      })),
    []
  );

  // 목록과 좋아요 상태
  const [items, setItems] = useState(initialItems);
  const [liked, setLiked] = useState(new Set(initialItems.map(it => it.id)));

  const toggleLike = (id) => {
    setLiked(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        setItems(curr => curr.filter(it => it.id !== id));
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <>
      <S.ListHeader>찜한상품({items.length}개)</S.ListHeader>

      <S.LikeGrid>
        {items.map(item => {
          const active = liked.has(item.id);

          return (
            <S.LikeCard key={item.id}>

              <S.LikeHeartBtn
                aria-label={active ? "찜 취소" : "찜하기"}
                aria-pressed={active}
                $active={active}
                onClick={(e) => {
                  e.preventDefault(); 
                  e.stopPropagation();
                  toggleLike(item.id);
                }}
                title={active ? "찜 취소" : "찜하기"}
              />

              {/* 상품 클릭 시 상세 페이지로 이동 */}
              <Link
                to={`/main/shop/read/${item.id}`}
                style={{ display: "block", textDecoration: "none", color: "inherit" }}
              >
                {/* 218×290 세로 직사각형 이미지 타일 */}
                <S.ProductImageBox $bg={item.imageUrl} />

                <S.ProductTitleRow>
                  <S.ProductShopName title={item.name}>{item.name}</S.ProductShopName>
                  {item.isNew && <S.NewTag>NEW</S.NewTag>}
                  {item.isBest && <S.BestTag>BEST</S.BestTag>}
                </S.ProductTitleRow>

                {/* 가격 */}
                <S.PriceText>{item.priceText}</S.PriceText>

                <S.MetaRow>
                  <S.IconText>
                    <img src="/assets/icons/review.svg" alt="리뷰 아이콘" />
                    <span>{item.score} ({item.reviewCount})</span>
                  </S.IconText>
                  <S.Spacer />
                  <S.IconText>
                    <img src="/assets/icons/filedlike.svg" alt="찜 아이콘" />
                    <span>{item.likeCount}</span>
                  </S.IconText>
                </S.MetaRow>
              </Link>

            </S.LikeCard>
          );
        })}
      </S.LikeGrid>

      <S.Pagination>
        <S.PageButton disabled>&lt; 이전</S.PageButton>
        <S.PageNumber>1</S.PageNumber>
        <S.PageButton disabled={false}>다음 &gt;</S.PageButton>
      </S.Pagination>
      
      
    </>
  );
};

export default MyShopLikeContainer;
