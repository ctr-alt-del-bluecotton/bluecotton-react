import styled from "styled-components";

const S = {};

/* ===== 페이지 프레임 ===== */
S.Container = styled.div`
  width: 1160px;
  margin: 80px auto 120px;
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.PALLETE.basic};
`;

S.Title = styled.h1`
  font-size: ${({ theme }) => theme.FONT_SIZE["title"]};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT["bold"]};
  border-bottom: 1px solid ${({ theme }) => theme.PALLETE.grey.greyScale1};
  padding-bottom: 12px;
`;

S.MetaBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 0;
  border-bottom: 1px solid ${({ theme }) => theme.PALLETE.grey.greyScale1};
  font-size: ${({ theme }) => theme.FONT_SIZE["smallText3"]};

  .writer {
    font-weight: ${({ theme }) => theme.FONT_WEIGHT["bold"]};
  }
  .date,
  .view {
    color: ${({ theme }) => theme.PALLETE.grey.greyScale3};
  }

  .divider {
    color: ${({ theme }) => theme.PALLETE.grey.greyScale1};
    font-weight: ${({ theme }) => theme.FONT_WEIGHT["regular"]};
  }
`;

S.Content = styled.div`
  position: relative;
  padding: 32px 0 50px;
  font-size: ${({ theme }) => theme.FONT_SIZE["smallText3"]};
  line-height: 1.6;
  font-weight: ${({ theme }) => theme.FONT_WEIGHT["regular"]};
  border-bottom: 1px solid ${({ theme }) => theme.PALLETE.grey.greyScale1};

  img {
    max-width: 100% !important;
    height: auto !important;
    display: block;
    border-radius: 10px;
  }
`;

S.EditBox = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  font-size: ${({ theme }) => theme.FONT_SIZE["smallText2"]};
  color: ${({ theme }) => theme.PALLETE.grey.greyScale3};
  cursor: pointer;
`;



S.NavSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 40px;
`;

S.NavButton = styled.button`
  align-self: center;
  width: 120px;
  height: 36px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.PALLETE.grey.greyScale2};
  background: #fff;
  color: ${({ theme }) => theme.PALLETE.basic};
  cursor: pointer;
  font-family: inherit;
`;

/* ===== 이전/다음 글 네비게이션 ===== */
S.NavList = styled.ul`
  margin-top: 12px;
  border-top: 1px solid ${({ theme }) => theme.PALLETE.grey.greyScale1};
  border-bottom: 1px solid ${({ theme }) => theme.PALLETE.grey.greyScale1};
`;

S.NavItem = styled.li`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 0;
  border-top: 1px solid ${({ theme }) => theme.PALLETE.grey.greyScale1};

  &:first-child {
    border-top: none;
  }

  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
  cursor: ${({ $disabled }) => ($disabled ? "default" : "pointer")};

  .label {
    width: 72px;
    color: ${({ theme }) => theme.PALLETE.basic};
    font-weight: ${({ theme }) => theme.FONT_WEIGHT["bold"]};
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .title {
    color: ${({ theme }) => theme.PALLETE.grey.greyScale3};
  }

  &:hover .title {
    text-decoration: ${({ $disabled }) => ($disabled ? "none" : "underline")};
  }
`;

S.NavArrow = styled.img`
  width: 10px;
  height: 10px;
  transform: ${({ $up }) => ($up ? "rotate(180deg)" : "none")};
`;

/* ===== 삭제 확인 모달 ===== */
S.ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

S.ModalBox = styled.div`
  background: white;
  border-radius: 8px;
  padding: 28px 36px;
  width: 360px;
  text-align: center;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);

  h3 {
    font-size: ${({ theme }) => theme.FONT_SIZE["paragraph"]};
    font-weight: ${({ theme }) => theme.FONT_WEIGHT["bold"]};
    margin-bottom: 8px;
  }

  p {
    color: ${({ theme }) => theme.PALLETE.grey.greyScale3};
    font-size: ${({ theme }) => theme.FONT_SIZE["smallText2"]};
    margin-bottom: 20px;
  }

  .button-row {
    display: flex;
    justify-content: center;
    gap: 12px;

    button {
      border: none;
      border-radius: 6px;
      padding: 8px 18px;
      font-size: ${({ theme }) => theme.FONT_SIZE["smallText2"]};
      cursor: pointer;
      transition: 0.15s;
      font-family: inherit;
    }

    .cancel {
      background: ${({ theme }) => theme.PALLETE.grey.greyScale1};
      color: ${({ theme }) => theme.PALLETE.basic};

      &:hover {
        background: ${({ theme }) => theme.PALLETE.grey.greyScale2};
      }
    }

    .confirm {
      background: ${({ theme }) => theme.PALLETE.primary.main};
      color: white;

      &:hover {
        background: ${({ theme }) => theme.PALLETE.primary.dark};
      }
    }
  }
`;

/* ===== 신고 + 공유 버튼===== */
S.PostSocialBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 6px;
  margin: 30px 0 24px;
`;

S.SocialButtonBase = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  min-width: 60px;
  height: 28px;
  border: 1px solid ${({ theme }) => theme.PALLETE.grey.greyScale2};
  border-radius: 6px;
  background: #fff;
  cursor: pointer;
  transition: all 0.15s ease;
  padding: 0 10px;
  font-family: inherit;

  color: ${({ theme }) => theme.PALLETE.grey.greyScale3};
  font-size: ${({ theme }) => theme.FONT_SIZE["smallText2"]};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT["regular"]};
  line-height: 1;

  img {
    width: 12px;
    height: 12px;
  }

  span {
    color: inherit;
    font-size: inherit;
    font-weight: inherit;
  }
`;

S.ShareButton = styled(S.SocialButtonBase)``;
S.ReportButton = styled(S.SocialButtonBase)``;

S.LikeButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  min-width: 60px;
  height: 28px;
  border: 1px solid ${({ theme }) => theme.PALLETE.grey.greyScale2};
  border-radius: 6px;
  background: #fff;
  cursor: pointer;
  transition: all 0.15s ease;
  padding: 0 10px;
  font-family: inherit;

  color: ${({ theme }) => theme.PALLETE.grey.greyScale3};
  font-size: ${({ theme }) => theme.FONT_SIZE["smallText2"]};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT["regular"]};

  img {
    width: 16px;
    height: 16px;
    transition: transform 0.15s ease;
  }

  ${({ $liked, theme }) =>
    $liked &&
    `
      color: ${theme.PALLETE.basic};
      background: #fff;
    `}
`;

/* === @닉네임 mention 스타일 === */
S.Mention = styled.span`
  color: ${({ theme }) => theme.PALLETE.primary.main};
  font-style: italic;
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.medium};
  margin-right: 4px;
`;

export default S;