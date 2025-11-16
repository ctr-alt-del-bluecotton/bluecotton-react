import React from "react";
import S from "./style";

const PostNumberSelect = ({ totalPages, pageNumber, setPageNumber }) => {
  const groupSize = 10;

  const currentGroup = Math.floor((pageNumber - 1) / groupSize);
  const startPage = currentGroup * groupSize + 1;
  const endPage = Math.min(startPage + groupSize - 1, totalPages);

  const hasPrevPage = pageNumber > 1;
  const hasNextPage = pageNumber < totalPages;

  const hasPrevGroup = startPage > 1;
  const hasNextGroup = endPage < totalPages;

  return (
    <S.Wrapper>
      {/* 1) 이전 그룹 이동 (<<) */}
      <S.PrevButton
        disabled={!hasPrevGroup}
        onClick={() => setPageNumber(startPage - groupSize)}
      >
        &lt;&lt;
      </S.PrevButton>

      {/* 2) 이전 페이지 이동 (< 이전) */}
      <S.PrevButton
        disabled={!hasPrevPage}
        onClick={() => setPageNumber(pageNumber - 1)}
      >
        &lt; 이전
      </S.PrevButton>

      {/* 페이지 번호 */}
      <S.PageList>
        {Array.from({ length: endPage - startPage + 1 }, (_, i) => {
          const page = startPage + i;
          return (
            <button
              key={page}
              className={pageNumber === page ? "active" : ""}
              onClick={() => {
                setPageNumber(page);
                window.scrollTo(0, 0);
              }}
            >
              {page}
            </button>
          );
        })}
      </S.PageList>

      {/* 3) 다음 페이지 이동 (다음 >) */}
      <S.AfterButton
        disabled={!hasNextPage}
        onClick={() => setPageNumber(pageNumber + 1)}
      >
        다음 &gt;
      </S.AfterButton>

      {/* 4) 다음 그룹 이동 (>>) */}
      <S.AfterButton
        disabled={!hasNextGroup}
        onClick={() => setPageNumber(startPage + groupSize)}
      >
        &gt;&gt;
      </S.AfterButton>
    </S.Wrapper>
  );
};

export default PostNumberSelect;
