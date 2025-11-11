import styled from "styled-components"
import { basic, flexCenter, flexCenterRow, flexStartColumn, smallText3Regular, subtitleRegular, white } from "../../../../../../../../styles/common"

const S = {};

S.floatingFormWrap = styled.div`
  display: ${({index, somMenuPage}) => index === somMenuPage ? "flex" : "none"};
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  overflow: hidden;
  gap: 20px;
`

S.floatingSomTitleWrap = styled.div`
  ${flexStartColumn}
`

S.floatingInputTitles = styled.div`
  ${subtitleRegular}
`

S.floatingInputs = styled.input.withConfig({
  shouldForwardProp: (prop) => !["$isError", "$isTouched", "$isAllError"].includes(prop)
})`
  ${basic}
  ${smallText3Regular}
  width: 100%;
  padding: 15px;
  height: 50px;
  border-radius: 4px;
  box-sizing: border-box;
  border: 1px solid;
  border-color: ${({ $isError, $isAllError, $isTouched, theme }) => 
    $isError && ($isTouched || $isAllError)
      ? theme.PALLETE.warning
      : theme.PALLETE.grey.greyScale1};
  outline: 0;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: ${({theme}) => theme.PALLETE.primary.main};
  } 

`

S.floatingCategoryInput = styled.select`
  ${basic}
  ${smallText3Regular}
  width: 100%;
  padding: 15px;
  height: 50px;
  border-radius: 4px;
  box-sizing: border-box;
  border: 1px solid;
  border-color: ${({ $isError, $isAllError, $isTouched, theme }) => 
    $isError && ($isTouched || $isAllError)
      ? theme.PALLETE.warning
      : theme.PALLETE.grey.greyScale1};
  outline: 0;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: ${({theme}) => theme.PALLETE.primary.main};
  } 

`

S.floatingCategorySelectOption = styled.option`
  appearance: none;
  ${basic}

  &:hover {
    ${white}
    background-color: ${({theme}) => theme.PALLETE.primary.light0};
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
  border-color: ${({ $isError, $isAllError, $isTouched, theme }) => 
    $isError && ($isTouched || $isAllError)
      ? theme.PALLETE.warning
      : theme.PALLETE.grey.greyScale1};

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
  width: 100%;
`
S.floatingSomDateTitle = styled.div`

`
S.floatingSomDateSelectWrap = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  gap: 20px;
  box-sizing: border-box; 
`

S.floatingDateInputs = styled.input.withConfig({
  shouldForwardProp: (prop) => !["$isError", "$isAllError", "$isTouched"].includes(prop)
})`
  ${basic}
  ${smallText3Regular}
  appearance: none;
  font-family: inherit; 
  padding: 15px;
  width: 100%;
  height: 50px;
  border-radius: 4px;
  box-sizing: border-box;
  border: 1px solid;
  border-color: ${({ $isError, $isAllError, $isTouched, theme }) => 
    ($isError || $isAllError) && ($isTouched || $isAllError)
      ? theme.PALLETE.warning
      : theme.PALLETE.grey.greyScale1};
  outline: 0;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: ${({theme}) => theme.PALLETE.primary.main};
  } 

`

S.floatingPeopleWrap = styled.div`
  ${flexStartColumn}
`
S.floatingPeopleTitle = styled.div`

`
S.floatingPeopleInput = styled.div`

`

S.floatingSomCategoryInputWrap = styled.div`
  position: relative;
  width: 100%;
  box-sizing: border-box;
  font-family: inherit;
`;

S.floatingSomCategoryInputValue = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== !["open", "hasValue"].includes(prop)
})`
  border: 1px solid;
  border-radius: 6px;
  box-sizing: border-box;
  background-color: white;
  padding: 10px 14px;
  color: ${({ $hasValue }) => ($hasValue ? "#000" : "#aaa")};
  cursor: pointer;
  user-select: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.2s ease;
  border-color: ${({ open, $isError, $isAllError, $isTouched, theme }) => 
      $isError && ($isTouched || $isAllError)
      ? theme.PALLETE.warning
      : open ? theme.PALLETE.primary.main : theme.PALLETE.grey.greyScale1};
`;


S.testButton = styled.input`
  
`

S.floatingSomCategoryInputArrow = styled.span.withConfig({
  shouldForwardProp: (prop) => prop !== "open"
})`
  border: solid ${({ open, theme }) => (open ? theme.PALLETE.primary.main : "#777")};
  border-width: 0 2px 2px 0;
  display: inline-block;
  padding: 4px;
  transform: ${({ open }) =>
    open ? "rotate(-135deg)" : "rotate(45deg)"};
  transition: transform 0.2s ease;
`;

S.floatingSomCategoryOptionList = styled.ul.withConfig({
  shouldForwardProp: (prop) => prop !== "open"
})`
  list-style: none;
  margin: 5px 0 0;
  box-sizing: border-box;
  padding: 0;
  position: absolute;
  width: 100%;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  max-height: ${({ open }) => (open ? "280px" : "0")};
  opacity: ${({ open }) => (open ? 1 : 0)};
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
  transition:
    max-height 0.25s ease,
    opacity 0.2s ease;
  z-index: 10;
`;

S.floatingSomCategoryOption = styled.li.withConfig({
  shouldForwardProp: (prop) => prop !== "selected"
})`
  padding: 10px 14px;
  cursor: pointer;
  background-color: ${({ selected, theme }) =>
    selected ? theme.PALLETE.primary.main : "white"};
  color: ${({ selected }) => (selected ? "white" : "#000")};
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ selected, theme }) =>
      selected ? theme.PALLETE.primary.main : theme.PALLETE.grey.greyScale1};
  }
`;

S.floatingSomTypeWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  gap: 30px;
`

S.floatingSomTypeLabelWrap = styled.div`
  ${flexCenterRow}
`

S.floatingSomTypeLabel = styled.label`
  ${smallText3Regular}
  cursor: pointer;
`

S.floatingSomTypeRadio = styled.input.attrs({ type: "radio" })`
  appearance: none;
  width: 20px;
  height: 20px;
  border: 2px solid ${({ theme }) => theme.PALLETE.grey.greyScale2};
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  transition: all 0.2s ease;

  &:checked {
    border-color: ${({ theme }) => theme.PALLETE.primary.main};
  }

  /* ✅ 안쪽 파란 원 (선택 시 생기는 내부 원) */
  &:checked::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.PALLETE.primary.main};
    transform: translate(-50%, -50%);
  }

  &:hover {
    border-color: ${({ theme }) => theme.PALLETE.primary.light1};
  }
`;

export default S;