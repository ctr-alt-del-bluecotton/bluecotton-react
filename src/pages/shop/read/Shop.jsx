import React, { useEffect, useMemo, useState } from "react";
import S from "./style";
import ShopInfo from "./info/ShopInfo";
import ShopReview from "./review/ShopReview";
import { useNavigate, useParams } from "react-router-dom";
import { useModal } from "../../../components/modal/useModal";
import { resolveUrl } from "../../../utils/url";
import { useSelector } from "react-redux";

const formatPrice = (type, value) => {
  const n = Number(value) || 0;
  return `${n.toLocaleString()}${type === "CANDY" ? "캔디" : "원"}`;
};

const parseSubs = (s) =>
  typeof s === "string"
    ? s.split(",").map((v) => v.trim()).filter(Boolean)
    : [];

const Shop = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { openModal } = useModal();
  const { currentUser, isLogin } = useSelector((state) => state.user);

  const [headerData, setHeaderData] = useState(null); 
  const [reviewStats, setReviewStats] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [activeTab, setActiveTab] = useState("info");
  const [count, setCount] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [setGoCart] = useState([]);

  const totalText = useMemo(() => {
    if (!headerData) return "";

    const price = Number(headerData.productPrice) || 0;
    const purchaseType = headerData.productPurchaseType || "CASH";
    return formatPrice(purchaseType, price * count);
  }, [headerData, count]);

  useEffect(() => {
    const loadAllHeaderData = async () => {
      setLoading(true);
      setError(null);
      setHeaderData(null);
      setReviewStats(null);

      try {
        const base = process.env.REACT_APP_BACKEND_URL;

        const memberId =
          isLogin && currentUser && currentUser.id ? currentUser.id : null;

        const headerUrl = memberId
          ? `${base}/shop/read/${id}?memberId=${memberId}`
          : `${base}/shop/read/${id}`;

        const headerRes = await fetch(headerUrl, {
          headers: { "Content-Type": "application/json" },
          method: "GET",
        });
        if (!headerRes.ok) throw new Error("상품 정보 로딩 실패");
        const headerJson = await headerRes.json();

    
        const statsRes = await fetch(
          `${base}/shop/read/${id}/review/status`,
          {
            headers: { "Content-Type": "application/json" },
            method: "GET",
          }
        );
        if (!statsRes.ok) throw new Error("리뷰 통계 로딩 실패");
        const statsJson = await statsRes.json();

        setHeaderData(headerJson.data);
        setReviewStats(statsJson.data);

        
        setLikeCount(Number(headerJson.data.productLikeCount) || 0);

   
        const likedFlag =
          headerJson.data.productIsLiked ?? headerJson.data.isLiked;
        if (likedFlag !== undefined && likedFlag !== null) {
          setIsLiked(likedFlag === 1 || likedFlag === true);
        } else {
          setIsLiked(false);
        }

        const subs = parseSubs(headerJson.data.productSubImageUrl);

        setSelectedImage(
          resolveUrl(headerJson.data.productMainImageUrl) ||
            resolveUrl(subs[0]) ||
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
  }, [id, isLogin, currentUser?.id]);

  const toggleLike = async () => {
    if (!isLogin || !currentUser?.id) {
      openModal({
        title: "로그인이 필요합니다",
        message: "찜하기는 로그인 후 이용할 수 있어요.",
        confirmText: "로그인하러 가기",
        cancelText: "취소",
        onConfirm: () => navigate("/login"),
      });
      return;
    }

    try {
      const base = process.env.REACT_APP_BACKEND_URL;
      const res = await fetch(
        `${base}/shop/read/like/${id}/${currentUser.id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!res.ok) {
        throw new Error("찜하기 처리 실패");
      }

      const json = await res.json();
      const data = json.data || {};

      setLikeCount(Number(data.productLikeCount) || 0);

      const likedFlag = data.productIsLiked ?? data.isLiked ?? 0;
      setIsLiked(likedFlag === 1 || likedFlag === true);
    } catch (e) {
      console.error("찜하기 처리 중 오류:", e);
    }
  };

  const changeCount = (type) => {
    if (type === "minus") setCount((v) => Math.max(1, v - 1));
    if (type === "plus") setCount((v) => v + 1);
  };

  const handleAddToCart = async () => {
    const itemData = {
      memberId: currentUser.id,
      productId: id,
      cartQuantity: count,
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
    productMainImageUrl,
  } = headerData;

  const { avgScore, totalCount: reviewCount } = reviewStats;

  const subImagesOnly = parseSubs(productSubImageUrl);

  const allThumbnails = [
    resolveUrl(productMainImageUrl),
    ...subImagesOnly.map(resolveUrl),
  ].filter(Boolean);

  const isNew = String(productType || "").includes("NEW");
  const isBest = String(productType || "").includes("BEST");

  const handlePurchase = async () => {
    if (!headerData || !id) return;

    const itemData = {
      memberId: currentUser.id,
      productId: Number(id),
      orderQuantity: count,
      orderTotalPrice: Number(productPrice) * count,
    };

    const url = `${process.env.REACT_APP_BACKEND_URL}/order/single`;
    setError(null);

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(itemData),
      });

      if (!res.ok) {
        throw new Error("단일 주문 생성에 실패했습니다.");
      }

      const result = await res.json();
      const orderId = result?.data;

      if (!orderId) {
        throw new Error("서버에서 유효한 주문 ID를 받지 못했습니다.");
      }
      navigate(`/main/shop/order?orderId=${orderId}`, {
        state: {
          snapshot: {
            items: [
              {
                productId: Number(id),
                name: productName,
                unitPrice: Number(productPrice),
                quantity: count,
                imageUrl: resolveUrl(productMainImageUrl),
                purchaseType: productPurchaseType,
              },
            ],
            totalPrice: Number(productPrice) * count,
          },
        },
      });
    } catch (error) {
      openModal({
        title: "주문 오류",
        message: error.message || "주문 진행 중 오류가 발생했습니다.",
        confirmText: "확인",
      });
      console.error("단일 구매 중 오류 발생:", error);
    }
  };

  return (
    <S.Page>
      <S.DetailContainer>
        <S.Left>
          <S.MainImage>
            <img src={resolveUrl(selectedImage)} alt="상품 메인 이미지" />
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

            <S.PurchaseButton onClick={handlePurchase}>
              구매하기
            </S.PurchaseButton>
          </S.ButtonRow>
        </S.Right>
      </S.DetailContainer>
    </S.Page>
  );
};

export default Shop;
