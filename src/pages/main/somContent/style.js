import styled from "styled-components";

import { smallText3Bold, smallText0Regular, smallText1Regular, white, secondary} from '../../../styles/common';

const S = {};

S.Card = styled.div`
  flex: 0 0 calc((100% - (clamp(16px, 5vw, 85px) * 2)) / 3); /* ✅ 정확한 3열 유지 */
  display: flex;
  flex-direction: column;
`;

S.SomImage = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "bgsrc"
})`
  width: 100%;
  height: 230px;
  background-image: ${({ bgsrc }) => `url("${bgsrc}")`};
  background-position: center;
  border-radius: 8px;
  background-size: cover;
  object-fit: cover;
  cursor: pointer;
`;

S.SomInfo = styled.div`
  padding: 12px 0;
`;

S.SomLocationIcon = styled.img`
  width: 8px;
`;

S.SomDateIcon = styled.img`
  width: 8px;
  height: 9px;
`;

S.somLikeIcon = styled.img`
  width: 13px;
  height: 12px;
`;

S.SomTitleArea = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  
  img {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    object-fit: cover;
  }

  h3 {
    font-size: 16px;
    margin: 0;
  }
`;

S.SomTitle = styled.div`
  ${smallText3Bold}
  cursor: pointer;
`;

S.SomExplanation = styled.div`
  font-size: 14px;
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  span {
    ${smallText0Regular}
  }
`;

S.SomButtonArea = styled.div`
  ${smallText0Regular}
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

S.SomButton = styled.div`
  ${smallText1Regular}
  ${white}
  border-radius: 4px;
  width: 122px;
  height: 32px;
  background-color: ${({ theme }) => theme.PALLETE.primary.main};
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  
  transition: all 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.PALLETE.primary.dark};
    ${white}
  }
`;

S.PartySomButton = styled.div`
  ${smallText1Regular}
  ${white}
  border-radius: 4px;
  width: 254px;
  height: 32px;
  background-color: ${({ theme }) => theme.PALLETE.primary.main};
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  
  transition: all 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.PALLETE.primary.dark};
    ${white}
  }
`;

S.FullSomButton = styled.div`
  ${smallText1Regular}
  ${white}
  border-radius: 4px;
  width: 122px;
  height: 32px;
  background-color: ${({ theme }) => theme.PALLETE.grey.greyScale1};
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

S.LikeButton = styled.div`
${smallText1Regular}
${secondary}
width: 64px;
height: 32px;
gap: 5px;
border-radius: 4px;
border: 1px solid ${({ theme }) => theme.PALLETE.grey.greyScale1 };
background-color: ${({ theme }) => theme.PALLETE.white};
cursor: pointer;
display: flex;
justify-content: center;
align-items: center;
`;

S.SomExplantionArea = styled.div`
  display: flex;
  justify-content: space-between;
`

S.SomExplanationInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 5px;
`

export default S;