const BASE_URL = process.env.REACT_APP_BACKEND_URL;

// 솜 리스트를 가져오는 API
export const fetchSomList = async (category, sortBy, page) => {
  // 예시: /api/soms?category=학습&sortBy=최신순&page=1
  const res = await fetch(
    `${BASE_URL}/api/soms?category=${category}&sortBy=${sortBy}&page=${page}`
  );

  if (!res.ok) {
    // 에러 응답 처리
    const errorData = await res.json();
    throw new Error(errorData.message || "솜 리스트를 가져오는데 실패했습니다.");
  }
  
  return await res.json();
};

// 특정 솜의 상세 정보를 가져오는 API
export const fetchSomRead = async (somId) => {
  // 예시: /api/soms/1
  const res = await fetch(`${BASE_URL}/api/soms/${somId}`);

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "솜 상세 정보를 가져오는데 실패했습니다.");
  }

  return await res.json();
}


/*
// 기존 더미 데이터 로직
import somDummy from "../dummyData/sqlDummy.json";

export const fetchSomList = async (category, sortBy, page) => {
  // 실제 API처럼 delay 효과
  await new Promise((resolve) => setTimeout(resolve, 200));

  let data = [...somDummy];

  // 🔹 카테고리 필터링 (전체 제외)
  if (category !== "전체") {
    data = data.sort((a, b) => b.id - a.id).filter((som) =>
      som.somTitle.includes(category) || som.somAddress.includes(category)
    );
  }

  // 🔹 정렬 기준
  if (sortBy === "인기순") {
    data.sort((a, b) => b.somLikeCount - a.somLikeCount);
  } else if (sortBy === "전체") {
    data.sort(
      (a, b) => new Date(b.id) - new Date(a.id)
    );
  } else if (sortBy === "마감 임박순") {
    data.sort(
      (a, b) => new Date(a.somEndDate) - new Date(b.somEndDate)
    );
  }

  return data;
};
*/
