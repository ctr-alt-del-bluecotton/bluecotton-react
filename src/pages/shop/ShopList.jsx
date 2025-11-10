import React, { useState } from "react";
import { Link } from "react-router-dom";
import S from "./style";

const ShopList = ({ items }) => {

  // [수정 불필요] 
  // 찜 상태 초기화 (props의 isLiked 값을 기반으로 Set 생성)
  const [liked, setLiked] = useState(() => {
    const initialLikedIds = new Set();
    
    if (items && Array.isArray(items)) {
      items.forEach(item => {
        
        if (item.isLiked) { 
          initialLikedIds.add(item.id);
        }
      });
    }
    return initialLikedIds; 
  });

  
  // --- [수정] ---
  // API를 호출하는 toggleLike 함수 구현
  const toggleLike = async (productId) => {

    const memberId = 1; 

    const isCurrentlyLiked = liked.has(productId);

    // 백엔드 API로 보낼 데이터 (JSON)
    const likeData = {
      memberId: memberId,
      productId: productId,
    };
    
    // 백엔드 컨트롤러(ShopApi)에 만든 주소
    const API_URL = `${process.env.REACT_APP_BACKEND_URL}/shop/like`;

    try {
      let response;

      // 1. 이미 찜한 상태(true) -> "찜 취소" API (DELETE) 호출
      if (isCurrentlyLiked) {
        response = await fetch(API_URL, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(likeData), 
        });
      } 
      // 2. 찜 안한 상태(false) -> "찜 추가" API (POST) 호출
      else {
        response = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(likeData), 
        });
      }

      // 3. 서버 응답이 실패하면 에러 발생
      if (!response.ok) {
        const errorData = await response.json(); // 서버가 보낸 에러 메시지
        throw new Error(errorData.message || "서버에서 찜하기 처리에 실패했습니다.");
      }
      
      // 4. 서버 통신이 성공했을 때만! React 화면(상태)을 업데이트
      setLiked((prevLiked) => {
        const nextLiked = new Set(prevLiked); 
        
        if (isCurrentlyLiked) {
          nextLiked.delete(productId); // 찜 취소
        } else {
          nextLiked.add(productId);   // 찜 추가
        }
        return nextLiked; // 변경된 Set으로 state 업데이트
      });

    } catch (error) {
      console.error("찜하기 처리 중 오류 발생:", error);
      alert(error.message || "요청을 처리하는 중 오류가 발생했습니다.");
    }
  };


  // [추가] items가 null이나 undefined일 경우를 대비
  const data = items || []; 

  return (
    <S.CardGrid>
      {/* [수정] data 변수 사용 */}
      {data.map((item, i) => { 
        const id = item.id ?? i + 1; // (user가 제공한 코드 유지)
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
                toggleLike(id); // [중요] API와 연동된 toggleLike 함수 호출
              }}
            />

            {/* --- (이하 코드는 수정 불필요) --- */}
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