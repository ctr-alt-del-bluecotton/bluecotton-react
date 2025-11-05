import React, { useState } from "react";
import S from "./style";
import ShopInfo from "./info/ShopInfo";
import ShopReview from "./review/ShopReview";
import ShopRelated from "./ShopRelated";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../../components/modal/useModal";

const Shop = () => {
  const [selectedImage, setSelectedImage] = useState("/assets/images/shop_som_doll.png");
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(255);
  const [activeTab, setActiveTab] = useState("info");
  const [count, setCount] = useState(1);

  const subImages = [
    "/assets/images/shop_detailSub_doll.png",
    "/assets/images/shop_detailSub_doll2.png",
    "/assets/images/shop_detailSub_doll3.png",
  ];

  const navigate = useNavigate();
  const { openModal } = useModal();

  const handleLikeClick = () => {
    setIsLiked((prev) => !prev);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  const handleCount = (type) => {
    if (type === "minus" && count > 1) setCount(count - 1);
    else if (type === "plus") setCount(count + 1);
  };

  return (
    <S.Page>
      <S.DetailContainer>
        {/* 왼쪽 상품 이미지 */}
        <S.Left>
          <S.MainImage>
            <img src={selectedImage} alt="상품 메인 이미지" />
          </S.MainImage>

          <S.SubImageArea>
            {subImages.map((src, i) => (
              <S.SubImage key={i} onClick={() => setSelectedImage(src)}>
                <img src={src} alt={`서브 이미지 ${i + 1}`} />
              </S.SubImage>
            ))}
          </S.SubImageArea>

          {/* 정보 / 리뷰 */}
          <S.InfoSection>
            <S.InfoTabs>
              <S.InfoTab $active={activeTab === "info"} onClick={() => setActiveTab("info")}>
                정보
              </S.InfoTab>
              <S.InfoTab $active={activeTab === "review"} onClick={() => setActiveTab("review")}>
                리뷰 22
              </S.InfoTab>
            </S.InfoTabs>

            <S.InfoDivider />

            {activeTab === "info" ? (
              <>
                <ShopInfo />
                <ShopRelated /> {/* 상품 정보 하단 */}
              </>
            ) : (
              <>
                <ShopReview />
                <ShopRelated /> {/* 리뷰 하단 */}
              </>
            )}
          </S.InfoSection>
        </S.Left>

        {/* 오른쪽 상품 정보 */}
        <S.Right>
          <S.TagRow>
            <S.DetailNewTag>NEW</S.DetailNewTag>
            <S.DetailBestTag>BEST</S.DetailBestTag>
          </S.TagRow>

          <S.Title>솜이 인형</S.Title>
          <S.DetailPrice>23,000원</S.DetailPrice>

          <S.DetailReviewWrap>
            <S.Icon src="/assets/icons/review.svg" alt="리뷰 아이콘" />
            <S.Text>4.8 (22)</S.Text>
          </S.DetailReviewWrap>

          <S.DeliveryRow>
            <S.Delivery>배송</S.Delivery>
            <S.Divider />
            <S.DeliveryCharge>3,000원</S.DeliveryCharge>
          </S.DeliveryRow>

          <S.DeliveryInfo>30,000원 이상 결제 시 무료</S.DeliveryInfo>

          <S.CountWrap>
            <S.DeliveryCount>수량</S.DeliveryCount>
            <S.CountBox>
              <S.CountBtn
                className="minus"
                onClick={() => handleCount("minus")}
                disabled={count === 1}
                $disabled={count === 1}
              >
                -
              </S.CountBtn>
              <S.CountNum>{count}</S.CountNum>
              <S.CountBtn className="plus" onClick={() => handleCount("plus")}>
                +
              </S.CountBtn>
            </S.CountBox>
          </S.CountWrap>

          <S.ProductDetailBar />

          <S.ProductRow>
            <S.ProductTotalCount>총 {count}개</S.ProductTotalCount>
            <S.ProductTotalPrice>{(23000 * count).toLocaleString()}원</S.ProductTotalPrice>
          </S.ProductRow>

          {/* 찜하기 / 장바구니 / 구매 */}
          <S.ButtonRow>
            <S.ProductLikeButton onClick={handleLikeClick}>
              <img
                src={isLiked ? "/assets/icons/filedlike.svg" : "/assets/icons/favorite.svg"}
                alt="좋아요"
              />
              <span>{likeCount}</span>
            </S.ProductLikeButton>

            {/* 공용 모달 적용: 장바구니 */}
            <S.CartButton
              onClick={() =>
                openModal({
                  title: "장바구니에 상품을 담았습니다.",
                  message: "",
                  cancelText: "닫기",
                  confirmText: "이동",
                  onConfirm: () => navigate("/main/my-page/my-shop/cart"),
                  onCancel: () => {},
                })
              }
            >
              장바구니
            </S.CartButton>

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
