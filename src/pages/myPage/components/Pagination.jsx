import React from "react";
import styled from "styled-components";
import * as C from "../../../styles/common";

const S = {};

S.Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-top: 24px;
`;

S.PageList = styled.div`
  display: flex;
  gap: 8px;
  padding: 0 20px;

  button {
    ${C.smallText1Regular};
    padding: 6px 8px;
    border: none;
    background: none;
    cursor: pointer;
    color: ${({ theme }) => theme.PALLETE.basic};

    &:hover:not(:disabled) {
      color: ${({ theme }) => theme.PALLETE.primary.main};
    }

    &.active {
      color: ${({ theme }) => theme.PALLETE.primary.main};
      font-weight: 600;
    }
  }
`;

S.PrevButton = styled.button`
  ${C.smallText1Regular};
  padding: 6px 10px;
  border: none;
  background: none;
  cursor: pointer;
  position: relative;
  color: ${({ theme }) => theme.PALLETE.basic};

  &:hover:not(:disabled) {
    color: ${({ theme }) => theme.PALLETE.primary.main};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.4;
  }

  &::after {
    content: "";
    position: absolute;
    right: -20px;
    top: 50%;
    transform: translateY(-50%);
    width: 1px;
    height: 9px;
    background-color: ${({ theme }) => theme.PALLETE.grey.greyScale1};
  }
`;

S.GroupPrevButton = styled.button`
  ${C.smallText1Regular};
  padding: 6px 10px;
  border: none;
  background: none;
  cursor: pointer;
  color: ${({ theme }) => theme.PALLETE.basic};

  &:hover:not(:disabled) {
    color: ${({ theme }) => theme.PALLETE.primary.main};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.4;
  }
`;

S.GroupNextButton = styled.button`
  ${C.smallText1Regular};
  padding: 6px 10px;
  border: none;
  background: none;
  cursor: pointer;
  color: ${({ theme }) => theme.PALLETE.basic};

  &:hover:not(:disabled) {
    color: ${({ theme }) => theme.PALLETE.primary.main};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.4;
  }
`;

S.AfterButton = styled.button`
  ${C.smallText1Regular};
  padding: 6px 10px;
  border: none;
  background: none;
  cursor: pointer;
  position: relative;
  color: ${({ theme }) => theme.PALLETE.basic};

  &:hover:not(:disabled) {
    color: ${({ theme }) => theme.PALLETE.primary.main};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.4;
  }

  &::before {
    content: "";
    position: absolute;
    left: -20px;
    top: 50%;
    transform: translateY(-50%);
    width: 1px;
    height: 9px;
    background-color: ${({ theme }) => theme.PALLETE.grey.greyScale1};
  }
`;

const Pagination = ({ totalPages = 1, pageNumber = 1, setPageNumber }) => {
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

  if (totalPages <= 1) return null;

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
        onClick={() => setPageNumber(pageNumber - 1)}
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
        disabled={pageNumber >= totalPages}
        onClick={() => setPageNumber(pageNumber + 1)}
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

export default Pagination;

