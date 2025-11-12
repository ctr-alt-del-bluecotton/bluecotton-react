import React from "react";
import S from "./style";
import { useNavigate } from "react-router-dom";
import { useMain } from "../../../context/MainContext";

const reverseMap = (obj) => Object.fromEntries(
  Object.entries(obj).map(([k, v]) => [v, k])
);

const sortOptions = [
  { value: "all", label: "전체" },
  { value: "solo", label: "솔로솜" },
  { value: "party", label: "파티솜" },
];

const MainCategory = () => {
  const { category, sortBy, setSortBy, categoryMap } = useMain();
  const navigate = useNavigate();
  
  const categories = Object.values(categoryMap);
  const reversedCategoryMap = reverseMap(categoryMap);

  return (
    <S.TopBar>
      {/* 카테고리 버튼 */}
      <S.CategoryList>
        {categories.map((cat) => (
          <S.CategoryButton
            key={cat}
            $active={categoryMap[category] === cat}
            onClick={() => navigate(`/main/som/${reversedCategoryMap[cat]}`)}
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
