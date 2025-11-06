import styled from "styled-components";
import * as mixin from "../../styles/common";
const S = {};

/* === 최상위 오버레이: 신고 모달 보다 아래(7000), confirm 모달은 9000으로 덮어써짐 === */
S.Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 7000;

  display: flex;
  align-items: center;
  justify-content: center;
`;

/* === 신고 모달 상자 === */
S.Container = styled.div`
  width: 420px;
  background-color: ${({ theme }) => theme.PALLETE.white};
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
  animation: fadeIn 0.22s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-6px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

/* === 헤더 === */
S.Header = styled.div`
  ${mixin.flexBetweenRow};
  padding: 20px 24px;
  border-bottom: 1px solid ${({ theme }) => theme.PALLETE.grey.greyScale1};

  h2 {
    ${mixin.heading6};
    ${mixin.primary};
  }
`;

S.CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  line-height: 1;
  ${mixin.accent};
  ${mixin.fontGreyScale3};

  padding: 4px;
  transition: 0.15s;
`;

/* === 본문 전체 === */
S.Body = styled.div`
  padding: 0 24px;
`;

/* === 라디오 기본행 (기타 제외) === */
S.RadioRow = styled.label`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 16px 0;
  border-bottom: 1px solid ${({ theme }) => theme.PALLETE.grey.greyScale1};
  cursor: pointer;
  user-select: none;

  input[type="radio"] {
    margin-top: 2px;
    accent-color: ${({ theme }) => theme.PALLETE.primary.main};
    transform: scale(1.05);
  }

  span {
    ${mixin.smallText3Light};
    ${mixin.basic};
    line-height: 1.4;
  }
`;

/* === 기타 블럭 전체 (라디오 + textarea 세트) ===
   핵심: padding-left를 주고 내부에서 전부 width:100%로 맞춤
*/
S.OtherBlock = styled.div`
  padding: 16px 0 20px 0;
`;

/* "기타 o 라벨" 라인 */
S.OtherHeaderRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  cursor: pointer;
  padding-bottom: 12px;

  input[type="radio"] {
    margin-top: 2px;
    accent-color: ${({ theme }) => theme.PALLETE.primary.main};
    transform: scale(1.05);
  }

  .label-text {
    ${mixin.smallText3Light};
    ${mixin.basic};
    line-height: 1.4;
  }
`;

/* textarea를 들여쓰기해서 정렬해 주는 래퍼
   -> 왼쪽 라디오 자리(26px 정도) + gap(10px) 합쳐서 대략 36px~40px 들여쓰기 */
S.OtherContent = styled.div`
  padding-left: 36px;
`;

/* textarea + 글자수 영역 */
S.TextareaWrap = styled.div`
  position: relative;
  width: 100%;
`;

S.Textarea = styled.textarea`
  width: 100%;
  height: 120px;
  box-sizing: border-box;

  border: 1px solid ${({ theme }) => theme.PALLETE.grey.greyScale1};
  border-radius: 8px;
  padding: 12px 12px 34px 12px;
  resize: none;
  overflow-y: auto;
  line-height: 1.5;
  transition: 0.2s;
  font-family: inherit;
  

  ${mixin.smallText3Light};
  ${mixin.basic};

  &::placeholder {
    ${mixin.smallText2Light};
    ${mixin.fontGreyScale3};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.PALLETE.primary.main};
  }
`;

S.Count = styled.span`
  position: absolute;
  right: 12px;
  bottom: 10px;
  ${mixin.smallText3Light};
  ${mixin.fontGreyScale3};
  pointer-events: none;
`;

/* === 푸터 버튼 영역 === */
S.Footer = styled.div`
  display: flex;
  gap: 12px;
  padding: 16px 24px;
  border-top: 1px solid ${({ theme }) => theme.PALLETE.grey.greyScale1};
  background-color: ${({ theme }) => theme.PALLETE.white};
`;

S.Button = styled.button`
  flex: 1;
  height: 44px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  ${mixin.smallText3Regular};
  line-height: 1;
  transition: 0.15s;

  &.cancel {
    background-color: ${({ theme }) => theme.PALLETE.grey.greyScale0};
    ${mixin.basic};

    &:hover {
      background-color: ${({ theme }) => theme.PALLETE.grey.greyScale1};
    }
  }

  &.submit {
    background-color: ${({ theme }) => theme.PALLETE.primary.main};
    ${mixin.white};

    &:hover {
      background-color: ${({ theme }) => theme.PALLETE.primary.light1};
    }
  }
`;

export default S;