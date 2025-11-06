// SearchBar.jsx
import React, { useEffect, useState } from "react";
import S from "./style";
import { useSearchParams } from "react-router-dom";

const SearchBar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlQ = searchParams.get("q") || "";
  const [query, setQuery] = useState(urlQ);

  useEffect(() => setQuery(urlQ), [urlQ]);

  const pushSearch = (nextQuery) => {
    const params = new URLSearchParams(searchParams);
    const trimmed = nextQuery.trim();
    params.set("page", "1"); 
    if (trimmed === "") params.delete("q");
    else params.set("q", trimmed);
    setSearchParams(params); 
  };

  const handleSearch = () => pushSearch(query);
  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
    if (e.key === "Escape") { setQuery(""); pushSearch(""); }
  };

  return (
    <S.SearchBarWrapper>
      <S.Input
        type="text"
        placeholder="검색"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <S.IconButton aria-label="검색" onClick={handleSearch}>
        <img style={{ width: 15, height: 15 }} src="/assets/icons/search.svg" alt="검색 아이콘" />
      </S.IconButton>
    </S.SearchBarWrapper>
  );
};

export default SearchBar;
