// SearchBar.jsx
import React from "react";
import S from "./style";

const SearchBar = () => {
  return (
    <S.SearchBarWrapper>
      <S.Input type="text" placeholder="검색" />
      <S.IconButton aria-label="검색">
        <img style={{width:"15px", height:"15px"}} src="/assets/icons/search.svg" alt="검색 아이콘" />
      </S.IconButton>
    </S.SearchBarWrapper>
  );
};

export default SearchBar;
