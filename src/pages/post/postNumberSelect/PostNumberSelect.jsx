import React from "react";
import S from "./style";

const PostNumberSelect = ({ totalPages, pageNumber, setPageNumber }) => {
  const groupSize = 10;

  const currentGroup = Math.floor((pageNumber - 1) / groupSize);
  const startPage = currentGroup * groupSize + 1;
  const endPage = Math.min(startPage + groupSize - 1, totalPages);

  const hasPrevGroup = startPage > 1;
  const hasNextGroup = endPage < totalPages;

  return (
    <S.Wrapper>
      {/* 이전 그룹 */}
      <S.PrevButton
        disabled={!hasPrevGroup}
        onClick={() => setPageNumber(startPage - groupSize)}
      >
        &lt; 이전
      </S.PrevButton>

      {/* 페이지 번호들 */}
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

      {/* 다음 그룹 */}
      <S.AfterButton
        disabled={!hasNextGroup}
        onClick={() => setPageNumber(startPage + groupSize)}
      >
        다음 &gt;
      </S.AfterButton>
    </S.Wrapper>
  );
};

export default PostNumberSelect;
