import styled, { css } from "styled-components";
import { smallText2Regular } from "../../../styles/common";

/* === 상단 컨테이너 === */
const S = {};

S.TopBar = styled.div`
  width: 100%; /* ✅ 반응형 적용 */
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

/* === 버튼 (Link 대신 button) === */
S.CategoryButton = styled.button`
  ${smallText2Regular}
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 30px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.PALLETE.grey.greyScale2};
  background-color: #fff;
  color: ${({ theme }) => theme.PALLETE.basic};
  cursor: pointer;
  transition: all 0.15s ease;
  font-family: inherit;
  box-sizing: border-box;

  ${({ $active, theme }) =>
    $active &&
    css`
      background-color: ${theme.PALLETE.primary.main};
      border-color: ${theme.PALLETE.primary.main};
      color: #fff;
    `}

  &:hover {
    background-color: ${({ theme }) => theme.PALLETE.primary.dark};
    border-color: ${({ theme }) => theme.PALLETE.primary.dark};
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

  background-image: url("/assets/icons/drop_down.svg");
  background-repeat: no-repeat;
  background-position: right 8px center;
  background-size: 12px;

  &:focus {
    border-color: ${({ theme }) => theme.PALLETE.primary.main};
    outline: none;
    background-image: url("/assets/icons/drop_down_acv.svg");
  }

  &:focus-visible {
    outline: none;
  }

  &::-ms-expand {
    display: none;
  }
`;

export default S;
