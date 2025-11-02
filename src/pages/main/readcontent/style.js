import styled from "styled-components";

import {  } from '../../../styles/common';

const S = {};

S.somReadContainer = styled.div`
  width: 100%;
  display: flex;
  margin-top: 70px;
  margin-bottom: 150px;
  justify-content: center;
`

S.somReadWrap = styled.div`
  display: flex;
  width: 1160px;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  gap: 40px;
  flex-direction: row;
`

S.somInfoSticky = styled.div`
  position: sticky;
  width: calc(50% - 40px);
  top: 100px;
  align-self: flex-start;
  height: fit-content;
`

export default S;