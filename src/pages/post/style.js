import styled from "styled-components";
import * as C from "../../styles/common";
const S = {};

/* === 전체 컨테이너 === */
S.Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  padding-bottom: 120px; 
`;

/* === 배너 === */
S.Banner = styled.div`
  width: 100%;
  display: flex;
  justify-content: center; /* ✅ 중앙 기준으로 정렬 */
  margin: 40px 0 40px;
  background: transparent; /* ✅ 혹시나 배경 겹침 방지 */

  .banner-inner {
    width: 1160px; /* ✅ 진짜 배너 폭 고정 */
    height: 250px;
    border-radius: 4px;
    background: url("/assets/images/post_banner.png") center/cover no-repeat;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  .text-box {
    color: ${({ theme }) => theme.PALLETE.basic};
    text-align: left;

    h1 {
      ${({ theme }) => theme.FONT_SIZE["h5"]};
      font-weight: 700;
      margin-bottom: 8px;
    }

    p {
      ${({ theme }) => theme.FONT_SIZE["smallText2"]};
      font-weight: 400;
    }
  }
`;

/* === 카드 그리드 === */
S.Grid = styled.div`
  width: 1160px;
  margin: 0 auto 60px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 390px;
  gap: 25px;
  justify-content: center;
`;

/* === 페이지네이션 및 작성 버튼 === */
S.Pagination = styled.div`
  width: 1160px;
  margin: 0 auto 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px; // pagenation 간격
  
  .top-bar {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }

  .write-btn {
    width: 168px;
    height: 40px;
    border-radius: 4px;
    background-color: ${({ theme }) => theme.PALLETE.primary.main};
    color: #fff;
    font-size: ${({ theme }) => theme.FONT_SIZE["smallText2"]};
    font-weight: ${({ theme }) => theme.FONT_WEIGHT["regular"]};
    border: none;
    cursor: pointer;
    transition: background 0.2s ease;

    &:hover {
      background-color: ${({ theme }) => theme.PALLETE.primary.dark};
    }
  }

  .page-buttons {
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 8px;

    button {
      width: 28px;
      height: 28px;
      border: 1px solid ${({ theme }) => theme.PALLETE.grey.greyScale2};
      border-radius: 4px;
      background: #fff;
      cursor: pointer;
      transition: all 0.2s ease;

      &.active {
        background: ${({ theme }) => theme.PALLETE.primary.main};
        color: #fff;
        border-color: ${({ theme }) => theme.PALLETE.primary.main};
      }

      &:hover {
        border-color: ${({ theme }) => theme.PALLETE.primary.main};
      }
    }
  }
`;

S.WriteButtonWrapper = styled.div`
  width: 1160px; /* ✅ 그리드 너비에 맞춤 */
  display: flex;
  justify-content: flex-end; /* ✅ 우측 끝 정렬 */
  margin-top: 0;
  margin-bottom: 24px;

  .write-btn {
    width: 168px;
    height: 40px;
    border: none;
    border-radius: 4px;
    background-color: ${({ theme }) => theme.PALLETE.primary.main};
    color: #fff;
    font-size: ${({ theme }) => theme.FONT_SIZE["smallText2"]};
    font-weight: ${({ theme }) => theme.FONT_WEIGHT["regular"]};
    cursor: pointer;
    transition: background 0.2s ease;

    &:hover {
      background-color: ${({ theme }) => theme.PALLETE.primary.dark};
    }
  }
`;

export default S;