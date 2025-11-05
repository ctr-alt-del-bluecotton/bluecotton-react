import styled from "styled-components"
import { basic, flexCenter, flexStartColumn, smallText3Regular, subtitle, subtitleRegular, white } from "../../../../../../../../styles/common"

const S = {};

S.floatingFormWrap = styled.div`
  display: ${({index, somMenuPage}) => index == somMenuPage ? "flex" : "none"};
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 20px;
`

S.floatingSomTitleWrap = styled.div`
  ${flexStartColumn}
`

S.floatingInputTitles = styled.div`
  ${subtitleRegular}
`

S.floatingInputs = styled.input`
  ${basic}
  ${smallText3Regular}
  width: 100%;
  padding: 15px;
  height: 50px;
  border-radius: 4px;
  box-sizing: border-box;
  border: 1px solid;
  border-color: ${({theme}) => theme.PALLETE.grey.greyScale1};
  outline: 0;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: ${({theme}) => theme.PALLETE.primary.main};
  } 

`
S.floatingDateInputs = styled.input`
  ${basic}
  width: calc((500px - 60px - 20px) / 2);
  height: 50px;
  border-radius: 4px;
  box-sizing: border-box;
  border: 1px solid;
  border-color: ${({theme}) => theme.PALLETE.grey.greyScale1};
  outline: 0;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: ${({theme}) => theme.PALLETE.primary.main};
  } 

`

S.floatingInputWrap = styled.div`
  ${flexStartColumn}
  width: 100%;
  gap:5px;
  flex-wrap: wrap;
`

S.floatingSomTitle = styled.div`
`


S.floatingSomTitleInput = styled.input`

`

S.floatingSomCategoryWrap = styled.div`
  ${flexStartColumn}
`

S.floatingSomCategoryTitle = styled.div`

`

S.floatingSomCategoryCombobox = styled.input`

`

S.floatingSomAddressWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: start;
`
S.floatingSomAddressTitle = styled.div`

`
S.floatingSomAddressInputWrap = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  gap: 20px;
`
S.floatingSomAddressInput = styled.input`

`
S.floatingSomAddressButton = styled.div`
  ${flexCenter}
  ${white}
  ${smallText3Regular}
  background-color: ${({theme}) => theme.PALLETE.primary.main};
  cursor: pointer;
  width: 100%;
  max-width: 95px;
  border-radius: 4px;
  height: 50px;
  user-select: none;
  transition: background-color 0.2s ;

  &:hover {
    background-color: ${({theme}) => theme.PALLETE.primary.dark};
  }
`
S.floatingSomDateWrap = styled.div`
  ${flexStartColumn}
`
S.floatingSomDateTitle = styled.div`

`
S.floatingSomDateSelectWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: start;
  gap: 20px;
`
S.floatingSomStartDateInput = styled.div`

`
S.floatingSomEndDateInput = styled.div`

`
S.floatingPeopleWrap = styled.div`
  ${flexStartColumn}
`
S.floatingPeopleTitle = styled.div`

`
S.floatingPeopleInput = styled.div`

`

export default S;