// import React, { useEffect, useMemo, useState } from "react";
// import S from "./style";
// import ShopInfo from "./info/ShopInfo";
// import ShopReview from "./review/ShopReview";
// import ShopRelated from "./ShopRelated";
// import { useNavigate, useParams } from "react-router-dom";
// import { useModal } from "../../../components/modal/useModal";


// const formatPrice = (type, value) => {
//   const n = Number(value) || 0;
//   return `${n.toLocaleString()}${type === "CANDY" ? "캔디" : "원"}`;
// };

// const parseSubs = (s) =>
//   typeof s === "string" ? s.split(",").map(v => v.trim()).filter(Boolean) : [];

// const Shop = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { openModal } = useModal();


//   const [title, setTitle] = useState("");
//   const [price, setPrice] = useState(0);
//   const [purchaseType, setPurchaseType] = useState("CASH"); 
//   const [avgRating, setAvgRating] = useState(0);
//   const [reviewCount, setReviewCount] = useState(0);
//   const [likeCount, setLikeCount] = useState(0);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [subImages, setSubImages] = useState([]);

//   const [isNew, setIsNew] = useState(false);
//   const [isBest, setIsBest] = useState(false);

//   const [isLiked, setIsLiked] = useState(false);
//   const [activeTab, setActiveTab] = useState("info");
//   const [count, setCount] = useState(1);

//   const [goCart, setGoCart] = useState([]);
//   const [error, setError] = useState(null);


//   const totalText = useMemo(
//     () => formatPrice(purchaseType, price * count),
//     [purchaseType, price, count]
//   );


//   useEffect(() => {
//     const load = async () => {

//         const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/shop/read/${id}`, {
//           headers: { "Content-Type": "application/json" },
//           method: "GET",
//         });

//         const body = await res.json(); 
//         const data = body?.data;

//         setTitle(data.productName || "");
//         setPrice(Number(data.productPrice) || 0);
//         setPurchaseType(data.productPurchaseType || "CASH");
//         setAvgRating(Number(data.productAvgRating) || 0);
//         setReviewCount(Number(data.productReviewCount) || 0);
//         setLikeCount(Number(data.productLikeCount) || 0);

//         const subs = parseSubs(data.productSubImageUrl);
//         setSubImages(subs);
//         setSelectedImage(data.productMainImageUrl || subs[0] || "/assets/images/fallback.png");

//         const t = String(data.productType || "").toUpperCase();
//         setIsNew(t.includes("NEW"));
//         setIsBest(t.includes("BEST"));

//     };

//     if (id) load(); 
//   }, [id, openModal]);

//   const toggleLike = () => {
//     setIsLiked(prev => {
//       setLikeCount(v => (prev ? v - 1 : v + 1));
//       return !prev;
//     });
//   };

//   // 수량
//   const changeCount = (type) => {
//     if (type === "minus") setCount(v => Math.max(1, v - 1));
//     if (type === "plus") setCount(v => v + 1);
//   };


//   const handleAddToCart = async () => {
//     const itemData = {
//       memberId: 11,
//       productId: id,
//       quantity : count,
//     };

//     const url = `${process.env.REACT_APP_BACKEND_URL}/cart/add`;

//     setError(null);

//     try {
//       const res = await fetch(url, {
//         method: "POST",
//         headers : {
//           'Content-Type' : 'application/json',
//         },
//         body: JSON.stringify(itemData),
//       });

//       if(!res.ok) {
//         throw new Error("장바구니 담기 에러");
//       }
//       const data = await res.json();
      
//       setGoCart(data);
      
//       openModal({
//         title: "장바구니에 상품을 담았습니다.",
//         message: "",
//         cancelText: "닫기",
//         confirmText: "이동",
//         onConfirm: () => navigate("/main/my-page/my-shop/cart"),
//       });
//     } catch (error) {
//       setError(error);
//       console.log("장바구니 추가 중 오류 발생");
//     }
//   };
  

//   return (
//     <S.Page>
//       <S.DetailContainer>
//         {/* 왼쪽: 이미지 */}
//         <S.Left>
//           <S.MainImage>
//             <img src={selectedImage} alt="상품 메인 이미지" />
//           </S.MainImage>

//           {!!subImages.length && (
//             <S.SubImageArea>
//               {subImages.map((src, i) => (
//                 <S.SubImage key={i} onClick={() => setSelectedImage(src)}>
//                   <img src={src} alt={`서브 이미지 ${i + 1}`} />
//                 </S.SubImage>
//               ))}
//             </S.SubImageArea>
//           )}

//           {/* 정보/리뷰 */}
//           <S.InfoSection>
//             <S.InfoTabs>
//               <S.InfoTab $active={activeTab === "info"} onClick={() => setActiveTab("info")}>
//                 정보
//               </S.InfoTab>
//               <S.InfoTab $active={activeTab === "review"} onClick={() => setActiveTab("review")}>
//                 리뷰 {reviewCount}
//               </S.InfoTab>
//             </S.InfoTabs>

//             <S.InfoDivider />

//             {activeTab === "info" ? (
//               <>
//                 <ShopInfo />
//                 <ShopRelated />
//               </>
//             ) : (
//               <>
//                 <ShopReview />
//                 <ShopRelated />
//               </>
//             )}
//           </S.InfoSection>
//         </S.Left>

//         {/* 오른쪽: 상세 정보 */}
//         <S.Right>
//           <S.TagRow>
//             {isNew && <S.DetailNewTag>NEW</S.DetailNewTag>}
//             {isBest && <S.DetailBestTag>BEST</S.DetailBestTag>}
//           </S.TagRow>

//           <S.Title>{title}</S.Title>
//           <S.DetailPrice>{formatPrice(purchaseType, price)}</S.DetailPrice>

//           <S.DetailReviewWrap>
//             <S.Icon src="/assets/icons/review.svg" alt="리뷰 아이콘" />
//             <S.Text>{avgRating} ({reviewCount})</S.Text>
//           </S.DetailReviewWrap>

//           {purchaseType === "CASH" ? (
//             <>
//               <S.DeliveryRow>
//                 <S.Delivery>배송</S.Delivery>
//                 <S.Divider />
//                 <S.DeliveryCharge>3,000원</S.DeliveryCharge>
//               </S.DeliveryRow>
//               <S.DeliveryInfo>30,000원 이상 결제 시 무료</S.DeliveryInfo>
//             </>
//           ) : (
//             <S.DeliveryRow>
//               <S.Delivery>배송</S.Delivery>
//               <S.Divider />
//               <S.DeliveryCharge>무료배송</S.DeliveryCharge>
//             </S.DeliveryRow>
//           )}

//           {/* 수량 */}
//           <S.CountWrap>
//             <S.DeliveryCount>수량</S.DeliveryCount>
//             <S.CountBox>
//               <S.CountBtn
//                 className="minus"
//                 onClick={() => changeCount("minus")}
//                 disabled={count === 1}
//                 $disabled={count === 1}
//               >
//                 -
//               </S.CountBtn>
//               <S.CountNum>{count}</S.CountNum>
//               <S.CountBtn className="plus" onClick={() => changeCount("plus")}>
//                 +
//               </S.CountBtn>
//             </S.CountBox>
//           </S.CountWrap>

//           <S.ProductDetailBar />

//           {/* 합계 */}
//           <S.ProductRow>
//             <S.ProductTotalCount>총 {count}개</S.ProductTotalCount>
//             <S.ProductTotalPrice>{totalText}</S.ProductTotalPrice>
//           </S.ProductRow>

//           {/* 버튼 */}
//           <S.ButtonRow>
//             <S.ProductLikeButton onClick={toggleLike}>
//               <img
//                 src={isLiked ? "/assets/icons/filedlike.svg" : "/assets/icons/favorite.svg"}
//                 alt="좋아요"
//               />
//               <span>{likeCount}</span>
//             </S.ProductLikeButton>

//             <S.CartButton
//               onClick={handleAddToCart}
//             >
//               장바구니
//             </S.CartButton>

//             <S.PurchaseButton onClick={() => navigate("/main/shop/order")}>
//               구매하기
//             </S.PurchaseButton>
//           </S.ButtonRow>
//         </S.Right>
//       </S.DetailContainer>
//     </S.Page>
//   );
// };

// export default Shop;

import React, { useEffect, useMemo, useState } from "react";
import S from "./style";
import ShopInfo from "./info/ShopInfo";
import ShopReview from "./review/ShopReview";
import ShopRelated from "./ShopRelated";
import { useNavigate, useParams } from "react-router-dom";
import { useModal } from "../../../components/modal/useModal";

const formatPrice = (type, value) => {
  const n = Number(value) || 0;
  return `${n.toLocaleString()}${type === "CANDY" ? "캔디" : "원"}`;
};

const parseSubs = (s) =>
  typeof s === "string" ? s.split(",").map((v) => v.trim()).filter(Boolean) : [];

const Shop = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { openModal } = useModal();

  const [headerData, setHeaderData] = useState(null); // 상품 상단 헤더
  const [reviewStats, setReviewStats] = useState(null); // "리뷰 평점"
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [activeTab, setActiveTab] = useState("info");
  const [count, setCount] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [goCart, setGoCart] = useState([]);

  const totalText = useMemo(() => {
    if (!headerData) return "";

    const price = Number(headerData.productPrice) || 0;
    const purchaseType = headerData.productPurchaseType || "CASH";
    return formatPrice(purchaseType, price * count);
  }, [headerData, count]);

  // useEffect 1개로 2개 fetch 날리기
  useEffect(() => {
    const loadAllHeaderData = async () => {
      setLoading(true);
      setError(null);
      setHeaderData(null);
      setReviewStats(null);

      try {
        // 상품 헤더 (read/{id})
        const headerRes = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/shop/read/${id}`,
          {
            headers: { "Content-Type": "application/json" },
            method: "GET",
          }
        );
        if (!headerRes.ok) throw new Error("상품 정보 로딩 실패");
        const headerJson = await headerRes.json();

        // 리뷰 평점 (review/status)
        const statsRes = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/shop/read/${id}/review/status`,
          {
            headers: { "Content-Type": "application/json" },
            method: "GET",
          }
        );
        if (!statsRes.ok) throw new Error("리뷰 통계 로딩 실패");
        const statsJson = await statsRes.json();

        // 상태 저장
        setHeaderData(headerJson.data);
        setReviewStats(statsJson.data);

        setLikeCount(Number(headerJson.data.productLikeCount) || 0);
        const subs = parseSubs(headerJson.data.productSubImageUrl);
        setSelectedImage(
          headerJson.data.productMainImageUrl ||
            subs[0] ||
            "/assets/images/fallback.png"
        );
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadAllHeaderData();
    }
  }, [id]);

  const toggleLike = () => {
    setIsLiked((prev) => {
      setLikeCount((v) => (prev ? v - 1 : v + 1));
      return !prev;
    });
  };

  const changeCount = (type) => {
    if (type === "minus") setCount((v) => Math.max(1, v - 1));
    if (type === "plus") setCount((v) => v + 1);
  };

  const handleAddToCart = async () => {
    const itemData = {
      memberId: 11, // ✅ 실제 로그인 유저 ID로 교체 예정
      productId: id,
      quantity: count,
    };

    const url = `${process.env.REACT_APP_BACKEND_URL}/cart/add`;
    setError(null);

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(itemData),
      });

      if (!res.ok) {
        throw new Error("장바구니 담기 에러");
      }

      const data = await res.json();
      setGoCart(data);

      openModal({
        title: "장바구니에 상품을 담았습니다.",
        message: "",
        cancelText: "닫기",
        confirmText: "이동",
        onConfirm: () => navigate("/main/my-page/my-shop/cart"),
      });
    } catch (error) {
      setError(error);
      console.log("장바구니 추가 중 오류 발생:", error);
    }
  };

  if (!headerData || !reviewStats) {
    return <S.Page>데이터를 표시할 수 없습니다.</S.Page>;
  }

  const {
    productName,
    productPrice,
    productPurchaseType,
    productSubImageUrl,
    productType,
  } = headerData;

  const { avgScore, totalCount: reviewCount } = reviewStats;

  const subImagesOnly = parseSubs(productSubImageUrl);

  const allThumbnails = [
    headerData.productMainImageUrl, ...subImagesOnly             
  ].filter(Boolean);

  const subImages = parseSubs(productSubImageUrl);
  const isNew = String(productType || "").includes("NEW");
  const isBest = String(productType || "").includes("BEST");

  return (
    <S.Page>
      <S.DetailContainer>
        {/* 왼쪽: 이미지 */}
        <S.Left>
          <S.MainImage>
            <img src={selectedImage} alt="상품 메인 이미지" />
            
          </S.MainImage>

          {!!allThumbnails.length && (
            <S.SubImageArea>
              {allThumbnails.map((src, i) => (
                <S.SubImage key={i} onClick={() => setSelectedImage(src)}>
                  <img src={src} alt={`서브 이미지 ${i + 1}`} />
                </S.SubImage>
              ))}
            </S.SubImageArea>
          )}

          {/* 정보/리뷰 탭 */}
          <S.InfoSection>
            <S.InfoTabs>
              <S.InfoTab
                $active={activeTab === "info"}
                onClick={() => setActiveTab("info")}
              >
                정보
              </S.InfoTab>
              <S.InfoTab
                $active={activeTab === "review"}
                onClick={() => setActiveTab("review")}
              >
                리뷰 {reviewCount}
              </S.InfoTab>
            </S.InfoTabs>

            <S.InfoDivider />

            {/* 정보 탭 */}
            <div style={{ display: activeTab === "info" ? "block" : "none" }}>
              <ShopInfo />
            </div>
            {/* 리뷰 탭 */}
            <div style={{ display: activeTab === "review" ? "block" : "none" }}>
              <ShopReview stats={reviewStats} />
            </div>
          </S.InfoSection>
        </S.Left>

        {/* 오른쪽: 상세 정보 */}
        <S.Right>
          <S.TagRow>
            {isNew && <S.DetailNewTag>NEW</S.DetailNewTag>}
            {isBest && <S.DetailBestTag>BEST</S.DetailBestTag>}
          </S.TagRow>

          <S.Title>{productName}</S.Title>
          <S.DetailPrice>
            {formatPrice(productPurchaseType, productPrice)}
          </S.DetailPrice>

          <S.DetailReviewWrap>
            <S.Icon src="/assets/icons/review.svg" alt="리뷰 아이콘" />
            <S.Text>
              {avgScore.toFixed(1)} ({reviewCount})
            </S.Text>
          </S.DetailReviewWrap>

          {productPurchaseType === "CASH" ? (
            <>
              <S.DeliveryRow>
                <S.Delivery>배송</S.Delivery>
                <S.Divider />
                <S.DeliveryCharge>3,000원</S.DeliveryCharge>
              </S.DeliveryRow>
              <S.DeliveryInfo>30,000원 이상 결제 시 무료</S.DeliveryInfo>
            </>
          ) : (
            <S.DeliveryRow>
              <S.Delivery>배송</S.Delivery>
              <S.Divider />
              <S.DeliveryCharge>무료배송</S.DeliveryCharge>
            </S.DeliveryRow>
          )}

          {/* 수량 */}
          <S.CountWrap>
            <S.DeliveryCount>수량</S.DeliveryCount>
            <S.CountBox>
              <S.CountBtn
                className="minus"
                onClick={() => changeCount("minus")}
                disabled={count === 1}
                $disabled={count === 1}
              >
                -
              </S.CountBtn>
              <S.CountNum>{count}</S.CountNum>
              <S.CountBtn className="plus" onClick={() => changeCount("plus")}>
                +
              </S.CountBtn>
            </S.CountBox>
          </S.CountWrap>

          <S.ProductDetailBar />

          {/* 합계 */}
          <S.ProductRow>
            <S.ProductTotalCount>총 {count}개</S.ProductTotalCount>
            <S.ProductTotalPrice>{totalText}</S.ProductTotalPrice>
          </S.ProductRow>

          {/* 버튼 */}
          <S.ButtonRow>
            <S.ProductLikeButton onClick={toggleLike}>
              <img
                src={
                  isLiked
                    ? "/assets/icons/filedlike.svg"
                    : "/assets/icons/favorite.svg"
                }
                alt="좋아요"
              />
              <span>{likeCount}</span>
            </S.ProductLikeButton>

            <S.CartButton onClick={handleAddToCart}>장바구니</S.CartButton>

            <S.PurchaseButton onClick={() => navigate("/main/shop/order")}>
              구매하기
            </S.PurchaseButton>
          </S.ButtonRow>
        </S.Right>
      </S.DetailContainer>
    </S.Page>
  );
};

export default Shop;