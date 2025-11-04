import styled from 'styled-components';

export const ContentTitle = styled.h1`
  font-size: 32px;
  font-weight: bold;
  color: ${({ theme }) => theme.PALLETE.basic};
  margin-bottom: 12px;
`;

export const ContentSubtitle = styled.p`
  font-size: 18px;
  color: ${({ theme }) => theme.PALLETE.basic};
  margin-bottom: 32px;
`;

export const TabContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
  margin-bottom: 32px;
`;

export const Tab = styled.button`
  aspect-ratio: 1;
  width: 100%;
  border-radius: 8px;
  border: none;
  font-size: 16px;
  font-weight: 700;
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

export const FilterContainer = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
`;

export const FilterButton = styled.button`
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  font-size: 14px;
  font-weight: ${props => props.active ? '700' : '500'};
  font-family: 'Daeojamjil', sans-serif;
  cursor: pointer;
  transition: all 0.2s;
  background-color: ${props => props.active ? props.theme.PALLETE.primary.main : props.theme.PALLETE.grey.greyScale0};
  color: ${props => props.active ? props.theme.PALLETE.white : props.theme.PALLETE.basic};
  
  &:hover {
    background-color: ${props => props.active ? props.theme.PALLETE.primary.main : props.theme.PALLETE.grey.greyScale1};
  }
`;

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const ListItem = styled.div`
  padding: 20px;
  border-bottom: 1px solid ${({ theme }) => theme.PALLETE.grey.greyScale1};
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: ${({ theme }) => theme.PALLETE.grey.greyScale0};
  }
`;

export const ItemType = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.PALLETE.primary.main};
  font-weight: 600;
  margin-right: 8px;
`;

export const ItemTitle = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: ${({ theme }) => theme.PALLETE.basic};
  margin: 8px 0;
`;

export const ItemDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: ${({ theme }) => theme.PALLETE.grey.greyScale4};
  flex-wrap: wrap;
  gap: 8px;
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-top: 40px;
  font-size: 16px;
`;

export const PageButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.disabled ? '#BDBDBD' : '#111111'};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  font-size: 16px;
  font-family: 'Daeojamjil', sans-serif;
  
  &:hover {
    color: ${props => props.disabled ? '#BDBDBD' : '${({ theme }) => theme.PALLETE.primary.main}'};
  }
`;

export const PageNumber = styled.span`
  font-weight: 700;
  color: ${({ theme }) => theme.PALLETE.primary.main};
`;

export const ActionButton = styled.button`
  padding: 8px 16px;
  background-color: #0051FF;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  font-family: 'Daeojamjil', sans-serif;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #003DB8;
  }
`;

export const CancelButton = styled.button`
  padding: 8px 16px;
  background-color: #FF6B6B;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  font-family: 'Daeojamjil', sans-serif;
  transition: background-color 0.2s;
  margin-left: 8px;
  
  &:hover {
    background-color: #FF5252;
  }
`;

export const SummaryContainer = styled.div`
  display: flex;
  gap: 24px;
  margin-bottom: 32px;
`;

export const SummaryCard = styled.div`
  flex: 1;
  padding: 24px;
  background-color: #F9F9F9;
  border-radius: 8px;
  text-align: center;
`;

export const SummaryLabel = styled.div`
  font-size: 16px;
  color: #757575;
  margin-bottom: 8px;
`;

export const SummaryValue = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #111111;
`;

export const CandyTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 24px;
`;

export const CandyTableHeader = styled.th`
  padding: 12px;
  background-color: #F9F9F9;
  border-bottom: 2px solid #E0E0E0;
  text-align: left;
  font-size: 14px;
  font-weight: 600;
  color: #111111;
`;

export const TableCell = styled.td`
  padding: 12px;
  border-bottom: 1px solid #E0E0E0;
  font-size: 14px;
  color: #111111;
`;

export const TableRow = styled.tr`
  &:hover {
    background-color: #F9F9F9;
  }
`;

export const StatusBox = styled.div`
  display: flex;
  align-items: center;
  padding: 24px;
  background-color: #F9F9F9;
  border-radius: 8px;
  margin-bottom: 40px;
  gap: 32px;
`;

export const StatusText = styled.div`
  flex: 1;
`;

export const StatusTitle = styled.div`
  font-size: 16px;
  color: #757575;
  margin-bottom: 8px;
`;

export const StatusValue = styled.div`
  font-size: 32px;
  font-weight: 700;
  color: #111111;
`;

export const StatusLabel = styled.div`
  font-size: 14px;
  color: #757575;
  margin-top: 4px;
`;

export const RequirementBox = styled.div`
  padding: 20px;
  background-color: #0051FF;
  color: white;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
`;

export const RankTableHeader = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #111111;
  margin-bottom: 16px;
`;

export const InfoSection = styled.div`
  margin-top: 40px;
`;

export const InfoTitle = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #111111;
  margin-bottom: 16px;
`;

export const InfoList = styled.ol`
  padding-left: 24px;
  font-size: 14px;
  color: #111111;
  line-height: 1.8;
  
  li {
    margin-bottom: 8px;
  }
`;

export const BulletList = styled.ul`
  padding-left: 24px;
  font-size: 14px;
  color: #111111;
  line-height: 1.8;
  
  li {
    margin-bottom: 8px;
  }
`;

export const PopupModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(33, 33, 33, 0.45);
  z-index: 1010;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const PopupModal = styled.div`
  background: #fff;
  max-width: 800px;
  width: 98vw;
  border-radius: 16px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.12);
  padding: 36px 38px 28px 38px;
  position: relative;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 16px; right: 20px;
  border: none;
  background: none;
  font-size: 32px;
  font-family: 'Daeojamjil', sans-serif;
  color: #888;
  cursor: pointer;
`;

export const PopupTitle = styled.h3`
  font-size: 20px;
  margin: 0 0 12px 0;
  font-weight: bold;
`;

export const OptionGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 12px 0 22px 0;
`;

export const OptionBtn = styled.button`
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

export const PopupFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

export const RankIcon = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${({ $bgColor }) => $bgColor || '#E0E0E0'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 500;
  color: white;
  text-transform: lowercase;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.1);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  letter-spacing: 0;
`;

