import React from "react";
import S from "./style";
import { useMain } from "../../../context/MainContext";

const SomNumberSelect = () => {
  const { pageNumber, setPageNumber, maxPage } = useMain();
  const totalPages = maxPage;
  const groupSize = 10;

  // 현재 그룹 계산
  const currentGroup = Math.floor((pageNumber - 1) / groupSize);
  const startPage = currentGroup * groupSize + 1;
  const endPage = Math.min(startPage + groupSize - 1, totalPages);

  // 그룹 이동 기능
  const movePrevGroup = () => {
    const newStart = startPage - groupSize;
    if (newStart >= 1) setPageNumber(newStart);
  };

  const moveNextGroup = () => {
    const newStart = startPage + groupSize;
    if (newStart <= totalPages) setPageNumber(newStart);
  };

  return (
    <S.Wrapper>
      {/* 이전 그룹 */}
      <S.GroupPrevButton
        disabled={startPage === 1}
        onClick={movePrevGroup}
      >
        «
      </S.GroupPrevButton>

      {/* 이전 페이지 */}
      <S.PrevButton
        disabled={pageNumber === 1}
        onClick={() => setPageNumber((prev) => prev - 1)}
      >
        &lt; 이전
      </S.PrevButton>

      {/* 페이지 리스트 */}
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

      {/* 다음 페이지 */}
      <S.AfterButton
        disabled={pageNumber === totalPages}
        onClick={() => setPageNumber((prev) => prev + 1)}
      >
        다음 &gt;
      </S.AfterButton>

      {/* 다음 그룹 */}
      <S.GroupNextButton
        disabled={endPage >= totalPages}
        onClick={moveNextGroup}
      >
        »
      </S.GroupNextButton>
    </S.Wrapper>
  );
};

export default SomNumberSelect;
