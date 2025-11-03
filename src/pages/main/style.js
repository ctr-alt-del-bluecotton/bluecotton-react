import styled from "styled-components";
import { } from '../../styles/common';

const S = {};

S.Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  background-color: ${({theme}) => theme.PALLETE.white};
`
  
S.Wrap = styled.div`
  width: 1160px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  margin-top: 40px;
  margin-bottom: 220px;
`

S.BennerImageArea = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 40px;
`

S.BennerImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
`

export default S;