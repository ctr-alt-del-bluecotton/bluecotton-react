import styled, { css } from "styled-components";

import { smallText3Regular } from '../../../../styles/common';

const S = {};

S.somReadContentContainer = styled.div`
  display: flex;
  width: calc(50% - 40px);
  flex-direction: column;
  justify-content: start;
`

S.somImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
`

S.somInfoMenu = styled.div`
  ${smallText3Regular}
  margin: 50px 0;
  display: flex;
  gap: 80px;
`

S.somButton = styled.button`
  ${smallText3Regular}
  border: none;
  cursor: pointer;
  background : none;
  box-sizing: border-box;
  height: 38px;
  padding: 8px 0;
  text-align: center;
  color: ${({ theme }) => theme.PALLETE.grey.greyScale2};
  ${({ $active, theme }) =>
  $active &&
    css`
      color: ${theme.PALLETE.basic};
      border-bottom: 2px solid ${theme.PALLETE.basic};
    `
  }

`

S.somInfoMenuWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export default S;