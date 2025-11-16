import styled from "styled-components";

import { smallText3Bold, smallText1Regular ,white, secondary, paragraphRegular, smallText2Regular, smallText3Regular} from '../../../../styles/common';

const S = {};

S.somInfoWrap = styled.div`
  display:flex;
  flex-direction: column;
  border: 1px solid ${({theme}) => theme.PALLETE.grey.greyScale1};
  padding: 30px;
  gap: 20px;
  border-radius: 16px;
`

S.somCategoryWrap = styled.div`
  ${smallText3Bold}
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
`

S.somCategoryIcon = styled.img`
  width: 18px;
  height: 18px;
`

S.somCategoryTitle = styled.div`

`

S.somCategory = styled.div`

`

S.somTitle = styled.div`
  ${paragraphRegular}
`

S.somCountWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
`

S.somCountIcon = styled.img`
  width: 17px;
`

S.somCount = styled.div`
  ${smallText2Regular}
`

S.somDateWrap = styled.div`
  ${smallText1Regular}
  display: flex;
  gap: 5px;
  flex-direction: column;
`

S.somStartDateWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`

S.somDateIcon = styled.img`
  width: 24px;
  height: 24px;
`

S.somStartDateTitle = styled.div`

`

S.somStartDate = styled.div`

`

S.somStartTime = styled.div`

`

S.somEndDateWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`

S.somEndDateIcon = styled.img`

`

S.somEndDateTitle = styled.div`

`

S.somEndDate = styled.div`

`

S.somEndTime = styled.div`

`

S.somAddressWrap = styled.div`
  ${smallText3Regular}
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 4px;
  gap: 16px;
`

S.somAddressIcon = styled.img`
  width: 14px;
`

S.somAddress = styled.div`

`



S.somButtonWrap = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  gap: 15px;
`;

S.somButton = styled.div`
  ${smallText3Regular}
  ${white}
  border-radius: 10px;
  width: calc(40% - 15px);
  height: 58px;
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

S.soloSomButton = styled.div`
  ${smallText3Regular}
  ${white}
  border-radius: 10px;
  width: calc(80% - 15px);
  height: 58px;
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

S.fullSomButton = styled.div`
  ${smallText3Regular}
  ${white}
  border-radius: 10px;
  width: calc(40% - 15px);
  height: 58px;
  background-color: ${({ theme }) => theme.PALLETE.grey.greyScale1};
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

S.somLikeButton = styled.div`
  ${smallText3Regular}
  ${secondary}
  width: calc(20% - 15px);
  height: 58px;
  gap: 5px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.PALLETE.grey.greyScale1 };
  background-color: ${({ theme }) => theme.PALLETE.white};
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

S.somLikeIcon = styled.img`
  width: 24px;
`

S.somLikeCount = styled.div`

`

export default S;