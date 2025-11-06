import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
const S = {};

/* === 상단 컨테이너 === */
S.TopBar = styled.div`
  width: 1160px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
`;

/* === 카테고리 리스트 === */
S.CategoryList = styled.div`
  display: flex;
  gap: 11px;
  flex-wrap: wrap;
`;

/* === Link 기반 버튼 === */
S.CategoryLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 30px;
  box-sizing: border-box;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.PALLETE.grey.greyScale2};
  background-color: #fff;
  text-decoration: none;
  font-size: ${({ theme }) => theme.FONT_SIZE["smallText2"]};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT["regular"]};
  color: ${({ theme }) => theme.PALLETE.basic};
  cursor: pointer;
  transition: all 0.15s ease;

  ${({ $active, theme }) =>
    $active &&
    css`
      background-color: ${theme.PALLETE.primary.main};
      border-color: ${theme.PALLETE.primary.main};
      color: #fff;
    `}

  &:hover {
    background-color: ${({ theme }) => theme.PALLETE.primary.dark};
    color: #fff;
  }
`;

/* === 드롭다운 영역 === */
S.FilterBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

/* === 드롭다운 셀렉트 === */
S.FilterSelect = styled.select`
  min-width: 120px;
  height: 30px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.PALLETE.grey.greyScale2};
  background-color: #fff;
  padding: 0 32px 0 10px;
  font-size: ${({ theme }) => theme.FONT_SIZE["smallText2"]};
  color: ${({ theme }) => theme.PALLETE.basic};
  cursor: pointer;
  appearance: none;

  /* ▼ 기본 상태: drop_down.svg */
  background-image: url("/assets/icons/drop_down.svg");
  background-repeat: no-repeat;
  background-position: right 8px center;
  background-size: 12px;

  /* ▼ 드롭다운이 활성화될 때 (focus 상태): drop_down_acv.svg */
  &:focus {
    border-color: ${({ theme }) => theme.PALLETE.primary.main};
    outline: none;
    background-image: url("/assets/icons/drop_down_acv.svg");
    background-size: 12px;
  }

  &:focus-visible {
    outline: none;
  }

  &::-ms-expand {
    display: none;
  }
`;

export default S;