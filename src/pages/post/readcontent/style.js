import styled from "styled-components";

/* ===== 페이지 프레임 ===== */
export const Container = styled.div`
  width: 1160px;
  margin: 80px auto 120px;
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.PALLETE.basic};
`;

export const Title = styled.h1`
  font-size: ${({ theme }) => theme.FONT_SIZE["title"]};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT["bold"]};
  margin-bottom: 12px;
  border-bottom: 1px solid ${({ theme }) => theme.PALLETE.grey.greyScale1};
  padding-bottom: 12px;
`;


export const MetaBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 0 12px 0;
  border-bottom: 1px solid ${({ theme }) => theme.PALLETE.grey.greyScale1};
  font-size: ${({ theme }) => theme.FONT_SIZE["smallText3"]};
  .writer {
    font-weight: ${({ theme }) => theme.FONT_WEIGHT["bold"]};
  }
  .date,
  .view {
    color: ${({ theme }) => theme.PALLETE.grey.greyScale3};
  }

  /* ✅ 구분선 스타일 */
  .divider {
   color: ${({ theme }) => theme.PALLETE.grey.greyScale1};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT["regular"]};
  }

`;


export const Content = styled.div`
  position: relative;
  padding: 32px 0 50px;
  font-size: ${({ theme }) => theme.FONT_SIZE["smallText3"]};
  line-height: 1.7;
  border-bottom: 1px solid ${({ theme }) => theme.PALLETE.grey.greyScale1};
`;

export const EditBox = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  font-size: ${({ theme }) => theme.FONT_SIZE["smallText1"]};
  color: ${({ theme }) => theme.PALLETE.grey.greyScale3};
  cursor: pointer;
`;

/* ✅ 간격 균등 + 닉네임 ellipsis + 높이 일치 */
export const LikeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  justify-items: start;
  align-items: center;
  gap: 10px 14px;
  border: 1px solid ${({ theme }) => theme.PALLETE.grey.greyScale1};
  border-radius: 6px;
  padding: 14px 18px;
  box-sizing: border-box;

  .like-user {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 8px;
    width: 100%;
    min-width: 0; /* ellipsis 작동용 */
    height: 28px; /* ✅ 높이 고정 (정렬 균등) */
    overflow: hidden;

    img {
      width: 22px;
      height: 22px;
      border-radius: 50%;
      background: ${({ theme }) => theme.PALLETE.grey.greyScale1};
      flex-shrink: 0;
    }

    .nickname {
      flex: 1;
      min-width: 0;
      font-size: ${({ theme }) => theme.FONT_SIZE["smallText2"]};
      color: ${({ theme }) => theme.PALLETE.basic};
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`;


/* ===== 댓글 섹션 ===== */
export const CommentSection = styled.div`
  margin: 60px 0 40px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    font-weight: ${({ theme }) => theme.FONT_WEIGHT["bold"]};
  }
  button {
    background: none;
    border: none;
    color: ${({ theme }) => theme.PALLETE.grey.greyScale3};
    font-size: ${({ theme }) => theme.FONT_SIZE["smallText3"]};
    cursor: pointer;
    font-family: inherit;
  }
`;

export const CommentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

/* ===== 댓글 아이템 ===== */
export const CommentItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  border-bottom: 1px solid ${({ theme }) => theme.PALLETE.grey.greyScale1};
  padding: 20px 0;
  margin-left: ${({ indent }) => (indent ? "46px" : "0")};
  position: relative;

  .left {
    display: flex;
    gap: 12px;
    flex: 1;
  }

  .profile {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.PALLETE.grey.greyScale1};
  }

  .text-box {
    display: flex;
    flex-direction: column;
    gap: 6px;
    flex: 1;

    .writer {
      font-weight: ${({ theme }) => theme.FONT_WEIGHT["bold"]};
      font-size: ${({ theme }) => theme.FONT_SIZE["smallText3"]};
    }

    .content {
      font-size: ${({ theme }) => theme.FONT_SIZE["smallText3"]};
      color: ${({ theme }) => theme.PALLETE.basic};
      line-height: 1.5;
    }

    .meta-row {
    display: flex;
    align-items: center;
    gap: 3px;
    margin-top: 3px;
    font-size: ${({ theme }) => theme.FONT_SIZE["smallText1"]};
    color: ${({ theme }) => theme.PALLETE.grey.greyScale3};

    /* ✅ 모든 span 공통 설정 (드래그 방지) */
    span {
      user-select: none;
    }

    /* ✅ 신고 / 삭제 공통 스타일 */
    .report,
    .delete {
      display: inline-block; /* 인라인 텍스트 커서 방지 */
      cursor: pointer !important; /* 손가락 포인터 강제 */
      color: ${({ theme }) => theme.PALLETE.grey.greyScale3};
      transition: color 0.2s;
    }
  }

    .reply-row {
      margin-top: 6px;
      display: flex;
      align-items: center;

      .reply {
        border: 1px solid ${({ theme }) => theme.PALLETE.grey.greyScale2};
        background: white;
        border-radius: 4px;
        padding: 2px 10px;
        cursor: pointer;
        color: ${({ theme }) => theme.PALLETE.grey.greyScale3};
        font-size: ${({ theme }) => theme.FONT_SIZE["smallText3"]};
        transition: 0.15s;
        font-family: inherit;

        &:hover {
          border-color: ${({ theme }) => theme.PALLETE.primary.main};
          color: ${({ theme }) => theme.PALLETE.primary.main};
        }
      }
    }
  }

  /* ✅ 좋아요 버튼을 상단(신고와 수평)에 맞춤 */
  .right {
    position: relative;
    top: 2px; /* 세밀한 높이 조정 */
    align-self: flex-start; /* ✅ 위쪽 정렬 */
    .like {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 4px;
      min-width: 52px;
      height: 28px;
      border: 1px solid ${({ theme }) => theme.PALLETE.grey.greyScale2};
      border-radius: 4px;
      background: white;
      padding: 3px 8px;
      cursor: pointer;
      font-size: ${({ theme }) => theme.FONT_SIZE["smallText3"]};
      color: ${({ theme }) => theme.PALLETE.grey.greyScale3};
      transition: 0.15s ease;

      &:hover {
        color: ${({ theme }) => theme.PALLETE.primary.main};
        border-color: ${({ theme }) => theme.PALLETE.primary.main};
      }
    }
  }
`;


/* ===== 댓글 입력 (댓글 + 대댓글 공통) ===== */
export const CommentForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  margin-top: 6px;

  /* ✅ depth별 폭 자동 조절 */
  ${({ $indent, $nested }) => {
    if ($nested) return `width: calc(100% - 138px); margin-left: 92px;`; // 대댓글의 답글
    if ($indent) return `width: calc(100% - 46px); margin-left: 46px;`; // 댓글의 답글
    return `width: 100%; margin-left: 0;`; // 일반 댓글 입력
  }}

  align-self: flex-start;
  box-sizing: border-box;

  .avatar {
    display: flex;
    align-items: center;
    gap: 8px;

    img {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      object-fit: cover;
      background: ${({ theme }) => theme.PALLETE.grey.greyScale1};
    }

    .nickname {
      font-weight: ${({ theme }) => theme.FONT_WEIGHT["bold"]};
    }
  }

  .input-wrap {
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: column;

    textarea {
      width: 100%;
      height: 120px;
      border: 1px solid ${({ theme }) => theme.PALLETE.grey.greyScale2};
      border-radius: 6px;
      padding: 10px 12px;
      resize: none;
      font-size: ${({ theme }) => theme.FONT_SIZE["smallText2"]};
      box-sizing: border-box;
      font-family: inherit;

      &:focus {
        border-color: ${({ theme }) => theme.PALLETE.primary.main};
        outline: none;
      }
    }

    .count {
      position: absolute;
      bottom: 8px;
      right: 12px;
      color: ${({ theme }) => theme.PALLETE.grey.greyScale3};
      font-size: ${({ theme }) => theme.FONT_SIZE["smallText3"]};
    }
  }

  .submit-btn {
    align-self: flex-end;
    background: ${({ theme }) => theme.PALLETE.primary.main};
    color: white;
    border: none;
    padding: 6px 16px;
    border-radius: 4px;
    cursor: pointer;
    font-size: ${({ theme }) => theme.FONT_SIZE["smallText3"]};
    margin-top: 8px;
    margin-right: 2px;
    transition: 0.15s;
    font-family: inherit;

    &:hover {
      background: ${({ theme }) => theme.PALLETE.primary.dark};
    }
  }
`;


/* ===== 구분선 & 네비게이션 ===== */
export const Divider = styled.div`
  height: 1px;
  background-color: ${({ theme }) => theme.PALLETE.grey.greyScale1};
  margin: 40px 0 20px;
`;

export const NavSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const NavButton = styled.button`
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

/* ===== 접기/펼치기 토글 버튼 ===== */
export const ToggleButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 4px;

  img {
    width: 18px;
    height: 18px;
    display: block;
    /* 열림 상태에서 회전 주고 싶으면 아래 한 줄 활성화 (JSX에서 $open 전달) */
    transform: ${({ $open }) => ($open ? "rotate(180deg)" : "rotate(0deg)")};
    transition: transform 0.2s ease;
  }
`;

/* ===== 댓글 좋아요 버튼 (하트 + 숫자 박스형) ===== */
export const LikeButton = styled.button`
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

  /* 기본 텍스트 색상 */
  color: ${({ theme }) => theme.PALLETE.grey.greyScale3};
  font-size: ${({ theme }) => theme.FONT_SIZE["smallText2"]};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT["regulat"]};

  img {
    width: 16px;
    height: 16px;
    transition: transform 0.15s ease;
  }

  /* 좋아요 상태일 때 */
  ${({ $liked, theme }) =>
    $liked &&
    `
      color: ${theme.PALLETE.basic};
      background: #fff;
    `}
`;

/* ===== 이전/다음 글 네비게이션 ===== */
export const NavList = styled.ul`
  margin-top: 12px;
  border-top: 1px solid ${({ theme }) => theme.PALLETE.grey.greyScale1};
  border-bottom: 1px solid ${({ theme }) => theme.PALLETE.grey.greyScale1};
`;

export const NavItem = styled.li`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 0;
  border-top: 1px solid ${({ theme }) => theme.PALLETE.grey.greyScale1};
  &:first-child { border-top: none; }

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

export const NavArrow = styled.img`
  width: 14px;
  height: 14px;
  transform: ${({ $up }) => ($up ? "rotate(180deg)" : "none")};
  display: block;
`;

/* === @닉네임 mention 스타일 === */
export const Mention = styled.span`
  color: ${({ theme }) => theme.PALLETE.primary.main};
  font-style: italic;
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.medium};
  margin-right: 4px;
`;

/* ===== 삭제 확인 모달 ===== */
export const ModalBackdrop = styled.div`
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

export const ModalBox = styled.div`
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

// ✅ 좋아요 + 공유 버튼 세트 (댓글 위 영역)
export const PostSocialBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end; /* 오른쪽 정렬 */
  gap: 12px;
  margin: 30px 0 24px; /* 위쪽 간격 확보 */
`;

// ✅ 버튼 공통 스타일 (좋아요/공유 동일)
const SocialButtonBase = styled.button`
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

  /* ✅ 폰트 통일 */
  color: ${({ theme }) => theme.PALLETE.grey.greyScale3};
  font-size: ${({ theme }) => theme.FONT_SIZE["smallText2"]};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT["regular"]};
  font-family: inherit;
  line-height: 1;

  img {
    width: 14px;
    height: 14px;
    display: block;
  }

  span {
    color: inherit;
    font-size: inherit;
    font-weight: inherit;
    font-family: inherit;
  }
`;

// ✅ 공유 버튼 (hover 효과 동일, active 없음)
export const ShareButton = styled(SocialButtonBase)``;





