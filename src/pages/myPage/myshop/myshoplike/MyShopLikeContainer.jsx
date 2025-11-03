import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ListHeader,
  LikeGrid, LikeCard,
  ProductImageBox, LikeHeartBtn,
  ProductTitleRow, ProductShopName, NewTag, BestTag,
  PriceText, MetaRow, IconText, Spacer, Pagination, PageButton, PageNumber
} from "../style";

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
      <ListHeader>찜한상품({items.length}개)</ListHeader>

      <LikeGrid>
        {items.map(item => {
          const active = liked.has(item.id);

          return (
            <LikeCard key={item.id}>

              <LikeHeartBtn
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
                <ProductImageBox $bg={item.imageUrl} />

                <ProductTitleRow>
                  <ProductShopName title={item.name}>{item.name}</ProductShopName>
                  {item.isNew && <NewTag>NEW</NewTag>}
                  {item.isBest && <BestTag>BEST</BestTag>}
                </ProductTitleRow>

                {/* 가격 */}
                <PriceText>{item.priceText}</PriceText>

                <MetaRow>
                  <IconText>
                    <img src="/assets/icons/review.svg" alt="리뷰 아이콘" />
                    <span>{item.score} ({item.reviewCount})</span>
                  </IconText>
                  <Spacer />
                  <IconText>
                    <img src="/assets/icons/filedlike.svg" alt="찜 아이콘" />
                    <span>{item.likeCount}</span>
                  </IconText>
                </MetaRow>
              </Link>

            </LikeCard>
          );
        })}
      </LikeGrid>

      <Pagination>
        <PageButton disabled>&lt; 이전</PageButton>
        <PageNumber>1</PageNumber>
        <PageButton disabled={false}>다음 &gt;</PageButton>
      </Pagination>
      
      
    </>
  );
};

export default MyShopLikeContainer;
