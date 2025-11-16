import React from "react";
import S from "./style";
import { useMain } from "../../../context/MainContext";

const SomNumberSelect = () => {
  const { pageNumber, setPageNumber, maxPage } = useMain();
  const totalPages = maxPage;
  const groupSize = 10;

  const currentGroup = Math.floor((pageNumber - 1) / groupSize);
  const startPage = currentGroup * groupSize + 1;
  const endPage = Math.min(startPage + groupSize - 1, totalPages);

  return (
    <S.Wrapper>
      {/* 이전 */}
      <S.PrevButton
        disabled={pageNumber === 1}
        onClick={() => setPageNumber((prev) => prev - 1)}
      >
        &lt; 이전
      </S.PrevButton>

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

      {/* 다음 */}
      <S.AfterButton
        disabled={pageNumber === totalPages}
        onClick={() => setPageNumber((prev) => prev + 1)}
      >
        다음 &gt;
      </S.AfterButton>
    </S.Wrapper>
  );
};

export default SomNumberSelect;
