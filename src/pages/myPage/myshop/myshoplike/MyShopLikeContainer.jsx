import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import S from "../style";
import { resolveUrl } from "../../../../utils/url";
import { useSelector } from "react-redux";

const likeProduct = (data) => ({
  id: data.id,
  name: data.productName,
  imageUrl: resolveUrl(data.productImageUrl),
  priceText: `${Number(data.productPrice).toLocaleString()}${
    data.productPurchaseType === "CANDY" ? "캔디" : "원"
  }`,
  score: data.productAvgRating || "0.0",
  reviewCount: data.productReviewCount || 0,
  likeCount: data.productLikeCount || 0,
  isNew: (data.productType || "").includes("NEW"),
  isBest: (data.productType || "").includes("BEST"),
});

const MyShopLikeContainer = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { currentUser, isLogin } = useSelector((state) => state.user);
  const memberId = currentUser?.id ?? null;  

  // 찜 목록 
  useEffect(() => {
    const fetchMyLikes = async () => {
      setLoading(true);
      setError(null);
      try {

        const url = `${process.env.REACT_APP_BACKEND_URL}/private/mypage/myshop/like/${memberId}`;

        const res = await fetch(url, {
          method: "GET",
          headers: { "Content-Type": "application/json" ,
             Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
        });

        if (!res.ok) throw new Error("찜 목록을 불러오지 못했습니다.");

        const json = await res.json(); 

  
        const list = Array.isArray(json.data) ? json.data.map(likeProduct) : [];

        setItems(list); 
        
      } catch (err) {
        setError(err.message);
        console.error("찜 목록 fetch 실패:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyLikes();
  }, [isLogin, memberId]); 


  const toggleLike = async(productId) => {

    if (!isLogin || !memberId) return;    

    setItems((currentItems) => currentItems.filter((it) => it.id !== productId));

    const likeData = { memberId, productId };

    const url = `${process.env.REACT_APP_BACKEND_URL}/private/shop/like/toggle`

    const res = await fetch(url, {
      method: "POST",
      headers: {"Content-Type": "application/json" , Authorization: `Bearer ${localStorage.getItem("accessToken")}`},
      body: JSON.stringify(likeData)
    })

    const json = await res.json();

  };



  if (error) {
    return <S.ListHeader>에러: {error}</S.ListHeader>;
  }

  return (
    <>
      <S.ListHeader>찜한상품({items.length}개)</S.ListHeader>

      <S.LikeGrid>
        {items.map((item) => {
          //  항상 찜한 상태(active=true)
          const active = true;

          return (
            <S.LikeCard key={item.id}>
              <S.LikeHeartBtn
                aria-label="찜 취소"
                aria-pressed={active}
                $active={active}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleLike(item.id); 
                }}
                title="찜 취소"
              />

              {/* 상품 클릭 시 상세 페이지로 이동 */}
              <Link
                to={`/main/shop/read/${item.id}`}
                style={{
                  display: "block",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >

                <S.ProductImageBox $bg={item.imageUrl} />

                <S.ProductTitleRow>
                  <S.ProductShopName title={item.name}>
                    {item.name}
                  </S.ProductShopName>
                  {item.isNew && <S.NewTag>NEW</S.NewTag>}
                  {item.isBest && <S.BestTag>BEST</S.BestTag>}
                </S.ProductTitleRow>

                {/* 가격 */}
                <S.PriceText>{item.priceText}</S.PriceText>

                <S.MetaRow>
                  <S.IconText>
                    <img src="/assets/icons/review.svg" alt="리뷰 아이콘" />
                    <span>
                      {item.score} ({item.reviewCount})
                    </span>
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

      {/* 리뷰가 0개일 때 */}
      {items.length === 0 && !loading && (
        <div style={{ padding: 20, textAlign: "center" }}>
          찜한 상품이 없습니다.
        </div>
      )}

      <S.Pagination>
        <S.PageButton disabled>&lt; 이전</S.PageButton>
        <S.PageNumber>1</S.PageNumber>
        <S.PageButton disabled={true}>다음 &gt;</S.PageButton>
      </S.Pagination>
    </>
  );
};

export default MyShopLikeContainer;