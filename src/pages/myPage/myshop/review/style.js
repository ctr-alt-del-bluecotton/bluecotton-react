import styled from "styled-components";
import * as C from "../../../../styles/common";



export const Overlay = styled.div`
  ${C.flexCenter}
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.4);
  z-index: 1000;
`;


export const Dialog = styled.div`
  width: 400px;
  height: 640px;
  background: ${({ theme }) => theme.PALLETE.white};
  border-radius: 20px;
  padding: 18px 24px 28px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.10);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
`;


export const Inner = styled.div`
  width: 100%;             
  margin: 0;

  display: flex;
  flex-direction: column;
  gap: 8px;                 
  flex: 1;                 
  & * { box-sizing: border-box; }
`;


export const Title = styled.h3`
  ${C.heading6}
  ${C.primary}
  text-align: center;
  margin: 40px 0 18px;
`;

/* 상품 정보 박스 */
export const ProductInfoBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background: ${({ theme }) => theme.PALLETE.grey.greyScale0};
  border: 1px solid ${({ theme }) => theme.PALLETE.grey.greyScale1};
  border-radius: 4px;
  padding: 8px 10px;
`;

export const ProductThumb = styled.img`
  width: 28px;
  height: 28px;
  border-radius: 6px;
  object-fit: cover;
`;

export const ProductName = styled.span`
  ${C.smallText3Light}
  color: ${({ theme }) => theme.PALLETE.basic};
`;

/*  질문/별점 */
export const Question = styled.div`
  text-align: center;
  ${C.paragraphRegular}
  margin: 18px 0 8px;
`;

export const StarRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 6px;
  margin-bottom: 6px;
`;

export const StarImg = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
  opacity: ${({ $active }) => ($active ? 1 : 0.3)};
  transition: opacity 0.2s ease;
`;

export const StarLabel = styled.div`
  ${C.smallText2Regular}
  ${C.primary}
  text-align: center;
  margin-bottom: 12px;
`;

/*  파일 업로드 */
export const FileBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  border: 1px solid ${({ theme }) => theme.PALLETE.grey.greyScale1};
  border-radius: 4px;
  padding: 10px;
`;

/* 파일 입출력  "선택한 피알이 없습니다" */
export const FileText = styled.div`
  flex: 1;
  ${C.smallText2Light}
  color: ${({ theme }) => theme.PALLETE.grey.greyScale2};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const FileButton = styled.button`
  ${C.smallText1Light}
  height: 24px;                
  padding: 0 10px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.PALLETE.primary.main};
  background: ${({ theme }) => theme.PALLETE.primary.main};
  color: ${({ theme }) => theme.PALLETE.white};
  font-family: 'Daeojamjil', sans-serif;
  cursor: pointer;
  &:hover { background: ${({ theme }) => theme.PALLETE.primary.dark}; }
`;

export const FileHint = styled.div`
  ${C.smallText1Light}
  color: ${({ theme }) => theme.PALLETE.grey.greyScale4};
  margin: 2px 0 22px;
`;

/*  텍스트 영역 : "리뷰를 작성해주세요" */
export const TextArea = styled.textarea`
  width: 100%;
  min-height: 140px;
  border: 1px solid ${({ theme }) => theme.PALLETE.grey.greyScale1};
  border-radius: 4px;
  padding: 10px;
  resize: none;
  ${C.smallText2Light}
  color: ${({ theme }) => theme.PALLETE.basic};
  ::placeholder { color: ${({ theme }) => theme.PALLETE.grey.greyScale2}; }
`;

export const Counter = styled.div`
  ${C.smallText1Light}
  text-align: right;
  color: ${({ theme }) => theme.PALLETE.grey.greyScale4};
  margin-top: 4px;
`;



/*버튼 영역 */

export const CloseIconButton = styled.button`
  position: absolute;
  width: 16px;
  height: 16px;
  right: 26px;
  top: 20px;
  border: 0;
  outline: none;
  background: none;
  font-family: 'Daeojamjil', sans-serif;
  cursor: pointer;
`;



export const ButtonRow = styled.div`
  width: 100%;                        
  margin-top: 12px;               
  display: flex;
  justify-content: space-between;
  align-self: center;
  gap: 10px;
  padding-top: 10px;
`;

export const PrimaryButton = styled.button`
  width: 100px;  
  height: 40px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  ${C.smallText2Regular}
  font-family: 'Daeojamjil', sans-serif;
  background: ${({ theme }) => theme.PALLETE.primary.main};
  color: ${({ theme }) => theme.PALLETE.white};
  &:hover { background: ${({ theme }) => theme.PALLETE.primary.dark}; }
`;

export const CloseButton = styled.button`
  width: 100px;  
  height: 40px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  ${C.smallText2Regular}
  font-family: 'Daeojamjil', sans-serif;
  background: ${({ theme }) => theme.PALLETE.primary.main};
  color: ${({ theme }) => theme.PALLETE.white};
  &:hover { background: ${({ theme }) => theme.PALLETE.primary.dark}; }

`;