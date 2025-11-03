// src/pages/shop/read/ShopReview.jsx
import React, { useMemo, useState } from "react";
import { useTheme } from "styled-components";
import S from "./style";
import Report from "../../../../components/Report/Report"; 

const ShopReview = () => {
  const theme = useTheme();

  const ratingBuckets = [
    { rating: 5, count: 15 },
    { rating: 4, count: 4 },
    { rating: 3, count: 2 },
    { rating: 2, count: 1 },
    { rating: 1, count: 0 },
  ];
  const totalCount = useMemo(
    () => ratingBuckets.reduce((s, r) => s + r.count, 0),
    [ratingBuckets]
  );
  const avgScore = 4.6;

  const [sort, setSort] = useState("latest");
  const [type, setType] = useState("all");

  // ✅ 신고 모달 상태
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportTarget, setReportTarget] = useState(null);

  const reviewList = [
    {
      id: 1,
      userName: "이태*",
      date: "2025.09.20",
      rating: 5,
      content: "배송 빠르고 솜이 인형 너무 귀여워요 ㅎㅎ",
      image: "/assets/images/shop_review_som_doll1.png",
      profile: "/assets/images/shop_review_profile1.png",
      helpfulCount: 0,
    },
    {
      id: 2,
      userName: "jys332*",
      date: "2025.09.20",
      rating: 4,
      content: "기대 그 이상의 이상 졸귀탱",
      image: "/assets/images/shop_review_som_doll2.png",
      profile: "/assets/images/shop_review_profile2.png",
      helpfulCount: 2,
    },
  ];

  const [helpfulState, setHelpfulState] = useState(
    Object.fromEntries(
      reviewList.map((r) => [r.id, { active: false, count: r.helpfulCount }])
    )
  );

  const toggleHelpful = (id) => {
    setHelpfulState((prev) => {
      const cur = prev[id] ?? { active: false, count: 0 };
      const nextActive = !cur.active;
      return {
        ...prev,
        [id]: { active: nextActive, count: cur.count + (nextActive ? 1 : -1) },
      };
    });
  };

  return (
    <S.ReviewSection>
      <S.ReviewTitle>리뷰 평점</S.ReviewTitle>

      <S.ReviewContainer>
        <S.ReviewLeft>
          <S.ReviewAverage>{avgScore}</S.ReviewAverage>
          <S.ReviewCount>
            <img src="/assets/icons/review.svg" alt="리뷰 아이콘" />
            <span className="count-text">리뷰 {totalCount}개</span>
          </S.ReviewCount>
        </S.ReviewLeft>

        <S.ReviewRight>
          {ratingBuckets.map(({ rating, count }) => {
            const percent = totalCount ? Math.round((count / totalCount) * 100) : 0;
            return (
              <S.ReviewRow key={rating}>
                <S.ReviewLabel>{rating}</S.ReviewLabel>
                <S.ReviewBar>
                  <S.ReviewFill percent={percent} />
                </S.ReviewBar>
                <S.ReviewCountText>{percent}%</S.ReviewCountText>
              </S.ReviewRow>
            );
          })}
        </S.ReviewRight>
      </S.ReviewContainer>

      <S.ReviewProductWrap>
        <S.ReviewProduct>상품 리뷰</S.ReviewProduct>

        <S.ReviewFilters>
          <S.ReviewSelect value={type} onChange={(e) => setType(e.target.value)}>
            <option value="all">전체 리뷰</option>
            <option value="photo">사진 리뷰</option>
          </S.ReviewSelect>

          <S.ReviewSelect value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="latest">최신순</option>
            <option value="ratingHigh">별점 높은 순</option>
            <option value="ratingLow">별점 낮은 순</option>
          </S.ReviewSelect>
        </S.ReviewFilters>
      </S.ReviewProductWrap>

      {reviewList.map((rv) => (
        <S.ReviewItem key={rv.id}>
          <S.ReviewHeader>
            <S.ProfileImage src={rv.profile} alt={`${rv.userName} 프로필`} />
            <S.UserInfoWrap>
              <S.StarRow>
                {[...Array(5)].map((_, i) => (
                  <img
                    key={i}
                    src="/assets/icons/review.svg"
                    alt="별점 아이콘"
                    style={{
                      width: "19px",
                      height: "18px",
                      filter: i < rv.rating ? "none" : "grayscale(1) brightness(1.0)",
                    }}
                  />
                ))}
              </S.StarRow>
              <S.UserMeta>
                <S.UserName>{rv.userName}</S.UserName>
                <S.Dot>·</S.Dot>
                <S.ReviewDate>{rv.date}</S.ReviewDate>
                <S.Dot>·</S.Dot>

                {/* ✅ 신고하기: 공용 Report 모달 오픈 */}
                <S.ReportButton
                  onClick={() => {
                    setReportTarget({ type: "comment", id: rv.id });
                    setShowReportModal(true);
                  }}
                >
                  신고하기
                </S.ReportButton>
              </S.UserMeta>
            </S.UserInfoWrap>

            <S.HelpfulButton
              $active={helpfulState[rv.id]?.active}
              onClick={() => toggleHelpful(rv.id)}
            >
              <img src="/assets/icons/shop_smile.svg" alt="도움돼요" /> 도움돼요{" "}
              {helpfulState[rv.id]?.count ?? 0}
            </S.HelpfulButton>
          </S.ReviewHeader>

          {rv.image && (
            <S.ReviewImage>
              <img src={rv.image} alt="리뷰 이미지" />
            </S.ReviewImage>
          )}
          <S.ReviewText>{rv.content}</S.ReviewText>
          <S.ReviewDivider />
        </S.ReviewItem>
      ))}

      {/* ✅ 공용 신고 모달 렌더링 */}
      {showReportModal && (
        <Report
          target={reportTarget}
          onClose={() => setShowReportModal(false)}
        />
      )}
    </S.ReviewSection>
  );
};

export default ShopReview;
