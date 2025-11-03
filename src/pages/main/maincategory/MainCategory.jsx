import React from "react";
import S from "./style";
import { useNavigate, useParams } from "react-router-dom";

const categoryMap = {
  all: "전체",
  study: "학습",
  health: "건강",
  social: "소셜",
  hobbies: "취미",
  "life-style": "생활",
  rookie: "루키",
};

const reverseMap = Object.fromEntries(
  Object.entries(categoryMap).map(([k, v]) => [v, k])
);

const categories = Object.values(categoryMap);
const sortOptions = [
  { value: "latest", label: "전체" },
  { value: "popular", label: "솔로솜" },
  { value: "closing", label: "파티솜" },
];

const MainCategory = ({ sortBy, setSortBy }) => {
  const { category } = useParams();
  const navigate = useNavigate();

  return (
    <S.TopBar>
      {/* 카테고리 버튼 */}
      <S.CategoryList>
        {categories.map((cat) => (
          <S.CategoryButton
            key={cat}
            $active={categoryMap[category] === cat}
            onClick={() => navigate(`/main/som/${reverseMap[cat]}`)}
          >
            {cat}
          </S.CategoryButton>
        ))}
      </S.CategoryList>

      {/* 정렬 선택 */}
      <S.FilterBox>
        <S.FilterSelect
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </S.FilterSelect>
      </S.FilterBox>
    </S.TopBar>
  );
};

export default MainCategory;
