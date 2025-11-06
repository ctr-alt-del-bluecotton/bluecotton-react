import styled from 'styled-components';
import * as C from '../../../styles/common';

const S = {};

S.ContentTitle = styled.h1`
  ${C.heading5}
  color: ${({ theme }) => theme.PALLETE.basic};
  margin-bottom: 12px;
`;

S.ContentSubtitle = styled.p`
  ${C.subtitleRegular}
  color: ${({ theme }) => theme.PALLETE.basic};
  margin-bottom: 32px;
`;

S.TabContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
  margin-bottom: 32px;
`;

S.Tab = styled.button`
  aspect-ratio: 1;
  width: 100%;
  border-radius: 8px;
  border: none;
  ${C.smallText3Bold}
  font-family: 'Daeojamjil', sans-serif;
  cursor: pointer;
  transition: all 0.2s;
  background-color: ${props => props.active ? props.theme.PALLETE.primary.main : props.theme.PALLETE.white};
  color: ${props => props.active ? props.theme.PALLETE.white : props.theme.PALLETE.basic};
  box-shadow: ${props => props.active ? 'none' : '0 1px 3px rgba(0, 0, 0, 0.1)'};
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background-color: ${props => props.active ? props.theme.PALLETE.primary.main : props.theme.PALLETE.grey.greyScale0};
  }
`;

S.FilterContainer = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
`;

S.FilterButton = styled.button`
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  ${props => props.active ? C.smallText2Bold : C.smallText2Regular}
  cursor: pointer;
  transition: all 0.2s;
  background-color: ${props => props.active ? props.theme.PALLETE.primary.main : props.theme.PALLETE.grey.greyScale0};
  color: ${props => props.active ? props.theme.PALLETE.white : props.theme.PALLETE.basic};
  
  &:hover {
    background-color: ${props => props.active ? props.theme.PALLETE.primary.main : props.theme.PALLETE.grey.greyScale1};
  }
`;

S.ListHeader = styled.div`
  ${C.subtitleRegular}
  font-weight: 700;
  color: ${({ theme }) => theme.PALLETE.basic};
  margin-bottom: 16px;
`;

S.ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

S.ListItem = styled.div`
  padding: 20px;
  border-bottom: 1px solid ${({ theme }) => theme.PALLETE.grey.greyScale1};
  cursor: pointer;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  
  &:hover {
    background-color: ${({ theme }) => theme.PALLETE.grey.greyScale0};
  }
`;

S.ItemType = styled.span`
  ${C.smallText2Bold}
  color: ${({ theme }) => theme.PALLETE.primary.main};
  margin-right: 8px;
`;

S.ItemTitle = styled.div`
  ${C.subtitleRegular}
  font-weight: 700;
  color: ${({ theme }) => theme.PALLETE.basic};
  margin: 8px 0;
`;

S.ItemDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${C.smallText2Regular}
  color: ${({ theme }) => theme.PALLETE.grey.greyScale4};
  flex-wrap: wrap;
  gap: 8px;
`;

S.Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-top: 40px;
  ${C.smallText3Regular}
`;

S.PageButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.disabled ? props.theme.PALLETE.grey.greyScale2 : props.theme.PALLETE.basic};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  ${C.smallText3Regular}
  font-family: 'Daeojamjil', sans-serif;
  
  &:hover {
    color: ${props => props.disabled ? props.theme.PALLETE.grey.greyScale2 : props.theme.PALLETE.primary.main};
  }
`;

S.PageNumber = styled.span`
  ${C.smallText3Bold}
  color: ${({ theme }) => theme.PALLETE.primary.main};
`;

S.DeleteButton = styled.button`
  padding: 8px 16px;
  background-color: ${({ theme }) => theme.PALLETE.primary.main};
  color: ${({ theme }) => theme.PALLETE.white};
  border: none;
  border-radius: 8px;
  ${C.smallText2Regular}
  font-family: 'Daeojamjil', sans-serif;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: ${({ theme }) => theme.PALLETE.primary.dark};
  }
`;

export default S;

