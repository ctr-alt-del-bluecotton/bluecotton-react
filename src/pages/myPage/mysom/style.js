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
  color: #808080;
  margin-bottom: 32px;
`;

S.TabContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
  margin-bottom: 50px;
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
  ${props => props.$active ? C.smallText2Bold : C.smallText2Regular}
  font-family: 'Daeojamjil', sans-serif;
  cursor: pointer;
  transition: all 0.2s;
  background-color: ${props => props.$active ? props.theme.PALLETE.primary.main : props.theme.PALLETE.grey.greyScale0};
  color: ${props => props.$active ? props.theme.PALLETE.white : props.theme.PALLETE.basic};
  
  &:hover {
    background-color: ${props => props.$active ? props.theme.PALLETE.primary.main : props.theme.PALLETE.grey.greyScale1};
  }
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
  color: ${props => props.disabled ? '#BDBDBD' : '#111111'};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  ${C.smallText3Regular}
  font-family: 'Daeojamjil', sans-serif;
  
  &:hover {
    color: ${props => props.disabled ? '#BDBDBD' : '${({ theme }) => theme.PALLETE.primary.main}'};
  }
`;

S.PageNumber = styled.span`
  ${C.smallText3Bold}
  color: ${({ theme }) => theme.PALLETE.primary.main};
`;

S.ActionButton = styled.button`
  padding: 8px 16px;
  background-color: ${props => props.$disabled ? '#BDBDBD' : '#0051FF'};
  color: white;
  border: none;
  border-radius: 6px;
  cursor: ${props => props.$disabled ? 'not-allowed' : 'pointer'};
  ${C.smallText2Regular}
  font-family: 'Daeojamjil', sans-serif;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: ${props => props.$disabled ? '#BDBDBD' : '#003DB8'};
  }
`;

S.CancelButton = styled.button`
  padding: 8px 16px;
  background-color: #FF6B6B;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  ${C.smallText2Regular}
  font-family: 'Daeojamjil', sans-serif;
  transition: background-color 0.2s;
  margin-left: 8px;
  
  &:hover {
    background-color: #FF5252;
  }
`;

S.SummaryContainer = styled.div`
  display: flex;
  gap: 24px;
  margin-bottom: 32px;
`;

S.SummaryCard = styled.div`
  flex: 1;
  padding: 24px;
  background-color: #F9F9F9;
  border-radius: 8px;
  text-align: center;
`;

S.SummaryLabel = styled.div`
  ${C.smallText3Regular}
  color: #757575;
  margin-bottom: 8px;
`;

S.SummaryValue = styled.div`
  ${C.heading6}
  color: #111111;
`;

S.CandyTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 24px;
`;

S.CandyTableHeader = styled.th`
  padding: 12px;
  background-color: #F9F9F9;
  border-bottom: 2px solid #E0E0E0;
  text-align: left;
  ${C.smallText2Bold}
  color: #111111;
`;

S.TableCell = styled.td`
  padding: 12px;
  border-bottom: 1px solid #E0E0E0;
  ${C.smallText2Regular}
  color: #111111;
`;

S.TableRow = styled.tr`
  &:hover {
    background-color: #F9F9F9;
  }
`;

S.StatusBox = styled.div`
  display: flex;
  align-items: center;
  padding: 24px;
  background-color: #F9F9F9;
  border-radius: 8px;
  margin-bottom: 40px;
  gap: 32px;
`;

S.StatusText = styled.div`
  flex: 1;
`;

S.StatusTitle = styled.div`
  ${C.smallText3Regular}
  color: #757575;
  margin-bottom: 8px;
`;

S.StatusValue = styled.div`
  ${C.heading5}
  color: #111111;
`;

S.StatusLabel = styled.div`
  ${C.smallText2Regular}
  color: #757575;
  margin-top: 4px;
`;

S.RequirementBox = styled.div`
  padding: 20px;
  background-color: #0051FF;
  color: white;
  border-radius: 8px;
  ${C.smallText3Bold}
`;

S.RankTableHeader = styled.div`
  ${C.subtitleRegular}
  font-weight: 700;
  color: #111111;
  margin-bottom: 16px;
`;

S.InfoSection = styled.div`
  margin-top: 40px;
`;

S.InfoTitle = styled.div`
  ${C.smallText3Bold}
  color: #111111;
  margin-bottom: 16px;
`;

S.InfoList = styled.ol`
  padding-left: 24px;
  ${C.smallText2Regular}
  color: #111111;
  line-height: 1.8;
  
  li {
    margin-bottom: 8px;
  }
`;

S.BulletList = styled.ul`
  padding-left: 24px;
  ${C.smallText2Regular}
  color: #111111;
  line-height: 1.8;
  
  li {
    margin-bottom: 8px;
  }
`;

S.PopupModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(33, 33, 33, 0.45);
  z-index: 1010;
  display: flex;
  align-items: center;
  justify-content: center;
`;

S.PopupModal = styled.div`
  background: #fff;
  max-width: 800px;
  width: 98vw;
  border-radius: 16px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.12);
  padding: 36px 38px 28px 38px;
  position: relative;
`;

S.CloseButton = styled.button`
  position: absolute;
  top: 16px; right: 20px;
  border: none;
  background: none;
  font-size: 32px;
  font-family: 'Daeojamjil', sans-serif;
  color: #888;
  cursor: pointer;
`;

S.PopupTitle = styled.h3`
  font-size: 20px;
  margin: 0 0 12px 0;
  font-weight: bold;
`;

S.OptionGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 12px 0 22px 0;
`;

S.OptionBtn = styled.button`
  flex: 1 1 30%;
  min-width: 32%;
  max-width: 33.3%;
  box-sizing: border-box;
  padding: 15px 8px;
  border-radius: 4px;
  border: 1px solid #ACB5BF;
  background: ${({selected})=>selected ?'#0051FF':'#F1F3F6'};
  color: ${({selected})=>selected?'#fff':'#515151'};
  font-size: 15px;
  font-family: 'Daeojamjil', sans-serif;
  margin-bottom: 6px;
  cursor: pointer;
  transition: background .15s, color .15s;
  justify-content: center;
  align-items: center;
  display: flex;
`;

S.PopupFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

S.RankIcon = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${({ $bgColor }) => $bgColor || '#E0E0E0'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 500;
  color: white;
  text-transform: uppercase;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.1);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  letter-spacing: 0;
`;

export default S;

