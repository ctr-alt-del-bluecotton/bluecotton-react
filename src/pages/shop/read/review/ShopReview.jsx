import React, { useEffect, useState } from "react";
import S from "./style";
import Report from "../../../../components/Report/Report";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const toClient = (dto) => ({
  id: dto.id,
  userName: dto.userNickName ?? "익명",
  date: dto.productReviewDate,
  rating: dto.productReviewRating,
  content: dto.productReviewContent,
  images: dto.productReviewImageUrls
    ? dto.productReviewImageUrls.split("|")
    : [],
  profile:
    dto.memberProfileUrl || "/assets/images/shop_review_profile_default.png",
});

const ShopReview = () => {
  const { id } = useParams();
  const { currentUser, isLogin } = useSelector((state) => state.user);


  const [sort, setSort] = useState("latest");
  const [type, setType] = useState("all");
  const [page, setPage] = useState(1);

  const [stats, setStats] = useState(null); // 리뷰 '평점'
  const [reviews, setReviews] = useState([]); // '상품 리뷰' 


  const [statsLoading, setStatsLoading] = useState(true);
  const [reviewsLoading, setReviewsLoading] = useState(true);


  // 에러
  const [error, setError] = useState(null);

  const [writeOpen, setWriteOpen] = useState(false);


  // 신고 모달창
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportTarget, setReportTarget] = useState(null);

  // "리뷰 평점"
  useEffect(() => {
    const fetchStats = async () => {
      setStatsLoading(true);
      setError(null);
      try {
        const url = `${process.env.REACT_APP_BACKEND_URL}/shop/read/${id}/review/status`;
        const res = await fetch(url, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) throw new Error("데이터 실패");

        const json = await res.json();

        if (json.data) {
          setStats(json.data);
        } else {
          throw new Error("데이터가 없습니다");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setStatsLoading(false);
      }
    };

    if (id) {
      fetchStats();
    }
  }, [id]); 

  // 상품 리뷰 
  useEffect(() => {
    const fetchReviews = async () => {
      setReviewsLoading(true);

      try {
        const qs = new URLSearchParams({ type, sort, page }).toString();
        const url =
          `${process.env.REACT_APP_BACKEND_URL}/shop/read/${id}/review?` + qs;

        const res = await fetch(url, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) throw new Error("리뷰 목록 로딩 실패");

        const json = await res.json();
        const list = Array.isArray(json.data) ? json.data.map(toClient) : [];
        setReviews(list);
      } catch (err) {
        setError(err.message);
      } finally {
        setReviewsLoading(false);
      }
    };

    if (id) {
      fetchReviews();
    }
  }, [id, type, sort, page]); // 필터가 바뀔 때마다 실행

  // 도움돼요 버튼 (백엔드 X)
  const [helpfulState, setHelpfulState] = useState({});
  useEffect(() => {
    setHelpfulState(
      Object.fromEntries(reviews.map((r) => [r.id, { active: false, count: 0 }]))
    );
  }, [reviews]);
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



  //  'stats'가 null이면 (데이터가 없으면) 
  if (!stats) {
    return <S.ReviewSection>리뷰 데이터를 표시할 수 없습니다.</S.ReviewSection>;
  }


  const avgScore = stats.avgScore;
  const totalCount = stats.totalCount;
  const ratingBuckets = [
    { rating: 5, count: stats.count5 },
    { rating: 4, count: stats.count4 },
    { rating: 3, count: stats.count3 },
    { rating: 2, count: stats.count2 },
    { rating: 1, count: stats.count1 },
  ];

  return (
    <S.ReviewSection>
      <S.ReviewTitle>리뷰 평점</S.ReviewTitle>

      {/* "리뷰 평점"  */}
      <S.ReviewContainer>
        <S.ReviewLeft>
          <S.ReviewAverage>{avgScore.toFixed(1)}</S.ReviewAverage>
          <S.ReviewCount>
            <img src="/assets/icons/review.svg" alt="리뷰 아이콘" />
            <span className="count-text">리뷰 {totalCount}개</span>
          </S.ReviewCount>
        </S.ReviewLeft>
        <S.ReviewRight>
          {ratingBuckets.map(({ rating, count }) => {
            const percent = totalCount
              ? Math.round((count / totalCount) * 100)
              : 0;
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

      {/* 드롭다운 */}
      <S.ReviewProductWrap>
        <S.ReviewProduct>상품 리뷰</S.ReviewProduct>
        <S.ReviewFilters>
          <S.ReviewSelect
            value={type}
            onChange={(e) => setType(e.target.value)}
            disabled={reviewsLoading}
          >
            <option value="all">전체 리뷰</option>
            <option value="photo">사진 리뷰</option>
          </S.ReviewSelect>

          <S.ReviewSelect
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            disabled={reviewsLoading}
          >
            <option value="latest">최신순</option>
            <option value="ratingHigh">별점 높은 순</option>
            <option value="ratingLow">별점 낮은 순</option>
          </S.ReviewSelect>
        </S.ReviewFilters>
      </S.ReviewProductWrap>

      {/* "상품 리뷰"  */}
      <>
        {reviews.map((rv) => (
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

              {/* 도움돼요 버튼(백엔드 연결 X)*/}
              <S.HelpfulButton
                $active={helpfulState[rv.id]?.active}
                onClick={() => toggleHelpful(rv.id)}
              >
                <img src="/assets/icons/shop_smile.svg" alt="도움돼요" /> 도움돼요{" "}
                {helpfulState[rv.id]?.count ?? 0}
              </S.HelpfulButton>
            </S.ReviewHeader>

            {rv.images && rv.images.length > 0 && (
              <S.ReviewImage>
                <img src={rv.images[0]} alt="리뷰 이미지" />
              </S.ReviewImage>
            )}
            <S.ReviewText>{rv.content}</S.ReviewText>
            <S.ReviewDivider />
          </S.ReviewItem>
        ))}

        {/* 리뷰 0개일 때 */}
        {reviews.length === 0 && !reviewsLoading && (
          <S.ReviewItem>
            <S.ReviewText>아직 작성된 리뷰가 없어요.</S.ReviewText>
          </S.ReviewItem>
        )}
      </>

      {/* 신고 모달창 */}
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