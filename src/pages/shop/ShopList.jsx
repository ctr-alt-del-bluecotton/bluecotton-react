import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import S from "./style";
import { resolveUrl } from "../../utils/url";
import { useSelector } from "react-redux";
import { useModal } from "../../components/modal";           

const ShopList = ({ items }) => {
  const { currentUser, isLogin } = useSelector((state) => state.user);
  const { openModal } = useModal();                         
  const [liked, setLiked] = useState(new Set());

  const memberId = currentUser.id;

  useEffect(() => {
    const next = new Set();
    (items || []).forEach((item) => {
      const likedFlag =
        item?.isLiked === true || item?.isLiked === 1 || item?.isLiked === "1";
      if (likedFlag) next.add(item.id);
    });
    setLiked(next);
  }, [items]);

  const toggleLike = async (productId) => {
   // 비회원이면 모달을 띄우고 종료
   if (!isLogin || !memberId) {
     openModal({
       title: "로그인이 필요합니다",
       message: "찜하기는 로그인 후 이용할 수 있어요.",
       confirmText: "로그인하러 가기",
       cancelText: "취소",
       onConfirm: () => (window.location.href = "/login"),
     });
     return;
   }

    const isCurrentlyLiked = liked.has(productId);
    const likeData = { memberId, productId };
    const url = `${process.env.REACT_APP_BACKEND_URL}/shop/like/toggle`;

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(likeData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "서버 에러");
      }

      setLiked((prevLiked) => {
        const nextLiked = new Set(prevLiked);
        if (isCurrentlyLiked) nextLiked.delete(productId);
        else nextLiked.add(productId);
        return nextLiked;
      });
    } catch (error) {
      console.error("찜하기 처리 중 오류 발생:", error);
      alert(error.message || "요청을 처리하는 중 오류가 발생했습니다.");
    }
  };

  const data = items;

  return (
    <S.CardGrid>
      {data.map((item, i) => {
        const id = item.id ?? i + 1;
        const isActive = liked.has(id);

        const img = resolveUrl(item.productImageUrl);
        const purchaseType = item.productPurchaseType || item.purchaseType || "CASH";
        const rawPrice = item.productPrice ?? 0;
        const priceNumber = Number(rawPrice) || 0;
        const priceText = `${priceNumber.toLocaleString()}${
          purchaseType === "CANDY" ? "캔디" : "원"
        }`;

        const typeStr = String(item.productType ?? "");
        const isNew = typeStr.includes("NEW");
        const isBest = typeStr.includes("BEST");

        const name = item.productName;
        const score = Number(item.productAvgRating ?? 0).toFixed(1);
        const reviewCount = Number(item.productReviewCount ?? 0);
        const likeCount = Number(item.productLikeCount ?? 0);

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
              }}
            />

            <Link
              to={`/main/shop/read/${id}`}
              style={{ display: "block", textDecoration: "none", color: "inherit" }}
            >
              <S.ProductImageBox
                $bg={resolveUrl(item.imageUrl || "/assets/images/fallback.png")}
              />
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
