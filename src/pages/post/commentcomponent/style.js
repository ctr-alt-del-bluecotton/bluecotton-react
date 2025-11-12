import styled from "styled-components";

const S = {};

/* ===== 댓글 섹션 ===== */
S.CommentSection = styled.div`
  margin: 60px 0 40px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

S.CommentHeader = styled.div`
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

S.CommentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

/* ===== 댓글 아이템 ===== */
S.CommentItem = styled.div`
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

    /* ✅ 닉네임 + 좋아요 한 줄 정렬 */
    .header-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
    }

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
      font-size: ${({ theme }) => theme.FONT_SIZE["smallText2"]};
      color: ${({ theme }) => theme.PALLETE.grey.greyScale3};

      span {
        user-select: none;
      }

      .report,
      .delete {
        display: inline-block;
        cursor: pointer !important;
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

  .right {
    position: relative;
    top: 2px;
    align-self: flex-start;
  }
`;

/* ===== 댓글 입력 (댓글 + 대댓글 공통) ===== */
S.CommentForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  margin-top: 6px;

  ${({ $indent, $nested }) => {
    if ($nested) return `width: calc(100% - 138px); margin-left: 92px;`;
    if ($indent) return `width: calc(100% - 46px); margin-left: 46px;`;
    return `width: 100%; margin-left: 0;`;
  }}

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

/* === @닉네임 mention 스타일 === */
S.Mention = styled.span`
  color: ${({ theme }) => theme.PALLETE.primary.main};
  font-style: italic;
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.medium};
  margin-right: 4px;
`;

/* ===== 댓글 좋아요 버튼 ===== */
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

/* ===== 접기/펼치기 토글 버튼 ===== */
S.ToggleButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 4px;

  img {
    width: 14px;
    height: 14px;
    display: block;
    transform: ${({ $open }) => ($open ? "rotate(180deg)" : "rotate(0deg)")};
    transition: transform 0.2s ease;
  }
`;

export default S;