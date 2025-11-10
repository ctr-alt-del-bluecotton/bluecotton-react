// 📄 style.js
import styled from "styled-components";
const S = {};

/* === 카드 컨테이너 === */
S.Card = styled.article`
  position: relative;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.PALLETE.grey.greyScale1};
  border-radius: 10px;
  background: #fff;
  overflow: hidden;
  cursor: pointer;
`;

/* === 썸네일 === */
S.ThumbWrap = styled.div`
  width: 100%;
  height: 210px;
  background: ${({ theme }) => theme.PALLETE.grey.greyScale0};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

/* === 본문 === */
S.Body = styled.div`
  padding: 18px 20px 22px 20px;
  display: flex;
  flex-direction: column;
`;

/* === 상단 메타 === */
S.MetaTop = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 6px;

  .category {
    color: ${({ theme }) => theme.PALLETE.secondary.main};
    font-size: ${({ theme }) => theme.FONT_SIZE["smallText2"]};
    font-weight: ${({ theme }) => theme.FONT_WEIGHT["bold"]};
  }

  .somtitle {
    color: ${({ theme }) => theme.PALLETE.basic};
    font-size: ${({ theme }) => theme.FONT_SIZE["smallText2"]};
    font-weight: ${({ theme }) => theme.FONT_WEIGHT["bold"]};
  }

  .bar {
    color: ${({ theme }) => theme.PALLETE.grey.greyScale2};
    font-size: ${({ theme }) => theme.FONT_SIZE["smallText2"]};
    font-weight: 300;
  }

  .challenge {
    color: ${({ theme }) => theme.PALLETE.primary.main};
    font-size: ${({ theme }) => theme.FONT_SIZE["smallText2"]};
    font-weight: ${({ theme }) => theme.FONT_WEIGHT["medium"]};
  }
`;

/* === 제목 === */
S.Title = styled.h3`
  color: ${({ theme }) => theme.PALLETE.basic};
  font-size: 17.5px;
  font-weight: ${({ theme }) => theme.FONT_WEIGHT["bold"]};
  line-height: 1.5;
  margin-bottom: 6px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

/* === 요약문 === */
S.Excerpt = styled.p`
  color: ${({ theme }) => theme.PALLETE.grey.greyScale3};
  font-size: ${({ theme }) => theme.FONT_SIZE["smallText2"]};
  line-height: 1.6;
  margin-bottom: 18px;
  height: 42px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  white-space: normal;
`;

/* === 하단 정보 === */
S.MetaBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  margin: 0 -20px;
  padding: 0 20px;

  .left {
    display: flex;
    align-items: center;
    gap: 6px;

    .avatar {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      object-fit: cover;
    }

    .bar {
      color: ${({ theme }) => theme.PALLETE.grey.greyScale3};
      font-size: ${({ theme }) => theme.FONT_SIZE["smallText2"]};
      font-weight: 300;
    }

    .date,
    .nick {
      color: ${({ theme }) => theme.PALLETE.grey.greyScale3};
      font-size: ${({ theme }) => theme.FONT_SIZE["smallText2"]};
    }
  }

  .right {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: ${({ theme }) => theme.FONT_SIZE["smallText2"]};
    color: ${({ theme }) => theme.PALLETE.grey.greyScale3};

    .stat {
      display: flex;
      align-items: center;
      gap: 4px;
    }
  }
`;

/* === 찜 하기 버튼 === */
S.LikeButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 28px;
  height: 28px;
  border: none;
  padding: 0;
  cursor: pointer;
  z-index: 2;

  background: url("/assets/icons/circle.svg") center/contain no-repeat;

  &::after {
    content: "";
    display: block;
    width: 14px;
    height: 13px;
    margin: 0 auto;
    background: url("/assets/icons/favorite.svg") center/contain no-repeat;
    transition: background-image 0.2s ease;
  }

  ${({ $liked }) =>
    $liked &&
    `
      &::after {
        background-image: url("/assets/icons/favorite_acv.svg");
      }
    `}
`;


/* === 아이콘 === */
const IconBase = styled.i`
  display: inline-block;
  width: 13px;
  height: 13px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

S.IconComment = styled(IconBase)`
  background-image: url("/assets/icons/chat_gray.svg");
`;

S.IconHeart = styled(IconBase)`
  background-image: url("/assets/icons/favorite_gray.svg");
`;

S.IconEye = styled(IconBase)`
  background-image: url("/assets/icons/eye_gray.svg");
`;



export default S;
