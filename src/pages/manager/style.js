// src/pages/manager/order/style.jsx
import styled from "styled-components";
import * as C from '../../styles/common'; // common.js가 있다고 가정

const S = {};

// =======================================================
// [공통 레이아웃 & 테이블] - 기존 코드에서 가져옴
// =======================================================
S.ManagerWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.PALLETE.grey.greyScale0};
  padding: 40px 20px;
  box-sizing: border-box;
`;

S.ManagerContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

S.Header = styled.div`
  margin-bottom: 40px;
`;

S.Title = styled.h1`
  ${C.heading1}
  ${C.basic}
  margin-bottom: 8px;
`;

S.Subtitle = styled.p`
  ${C.paragraphRegular}
  color: ${({ theme }) => theme.PALLETE.grey.greyScale3};
`;

S.ContentSection = styled.section`
  background-color: ${({ theme }) => theme.PALLETE.white};
  border-radius: 8px;
  padding: 32px;
  margin-bottom: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

S.SectionTitle = styled.h2`
  ${C.heading3}
  ${C.basic}
  margin-bottom: 24px;
`;

S.GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

S.Card = styled.div`
  background-color: ${({ theme }) => theme.PALLETE.grey.greyScale0};
  border-radius: 8px;
  padding: 20px;
  border: 1px solid ${({ theme }) => theme.PALLETE.grey.greyScale1};
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`;

S.CardTitle = styled.h3`
  ${C.smallText3Bold}
  ${C.basic}
  margin-bottom: 8px;
`;

S.CardContent = styled.p`
  ${C.smallText1Regular}
  color: ${({ theme }) => theme.PALLETE.grey.greyScale3};
  margin-bottom: 12px;
`;

S.ButtonGroup = styled.div`
  ${C.flexBetweenRow}
  gap: 12px;
  margin-top: 20px;
`;

S.QuickActionSection = styled.section`
  background: linear-gradient(135deg, ${({ theme }) => theme.PALLETE.primary.main} 0%, ${({ theme }) => theme.PALLETE.primary.dark} 100%);
  border-radius: 16px;
  padding: 40px 32px;
  margin-bottom: 32px;
  box-shadow: 0 8px 24px rgba(0, 81, 255, 0.2);
`;

S.QuickActionTitle = styled.h2`
  ${C.heading2}
  ${C.white}
  margin-bottom: 32px;
  text-align: center;
`;

S.QuickActionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
`;

S.QuickActionCard = styled.div`
  background-color: ${({ theme }) => theme.PALLETE.white};
  border-radius: 12px;
  padding: 32px 24px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
  }
`;

S.QuickActionIcon = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
  line-height: 1;
`;

S.QuickActionLabel = styled.h3`
  ${C.heading5}
  ${C.basic}
  margin-bottom: 8px;
  font-weight: 700;
`;

S.QuickActionDesc = styled.p`
  ${C.smallText2Regular}
  color: ${({ theme }) => theme.PALLETE.grey.greyScale3};
  margin: 0;
`;

S.Button = styled.button`
  ${C.smallText2Regular}
  ${C.white}
  background-color: ${({ theme }) => theme.PALLETE.primary.main};
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.PALLETE.primary.dark};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.PALLETE.grey.greyScale1};
    cursor: not-allowed;
  }
`;

S.SecondaryButton = styled.button`
  ${C.smallText2Regular}
  ${C.secondary}
  background-color: ${({ theme }) => theme.PALLETE.white};
  border: 1px solid ${({ theme }) => theme.PALLETE.grey.greyScale1};
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.PALLETE.grey.greyScale0};
  }
`;

S.Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

S.TableHeader = styled.thead`
  background-color: ${({ theme }) => theme.PALLETE.grey.greyScale0};
`;

S.TableRow = styled.tr`
  border-bottom: 1px solid ${({ theme }) => theme.PALLETE.grey.greyScale1};

  &:hover {
    background-color: ${({ theme }) => theme.PALLETE.grey.greyScale0};
  }
`;

S.TableHeaderCell = styled.th`
  ${C.smallText2Regular}
  ${C.basic}
  padding: 16px;
  text-align: left;
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
`;

S.TableCell = styled.td`
  ${C.smallText1Regular}
  ${C.basic}
  padding: 16px;
`;

S.StatusBadge = styled.span`
  ${C.smallText1Regular}
  ${C.white}
  background-color: ${({ $status, theme }) => 
    $status === 'active' ? theme.PALLETE.primary.main :
    $status === 'pending' ? theme.PALLETE.secondary.main :
    $status === 'shipped' ? '#2196F3' :
    $status === 'delivered' ? '#4CAF50' :
    $status === 'cancelled' ? '#F44336' :
    $status === 'suspended' ? '#FF9800' :
    $status === 'inactive' ? theme.PALLETE.grey.greyScale2 :
    $status === 'reported' ? '#E91E63' :
    $status === 'resolved' ? '#4CAF50' :
    $status === 'preparing' ? '#FF9800' :
    theme.PALLETE.grey.greyScale2};
  padding: 4px 12px;
  border-radius: 12px;
  display: inline-block;
`;

S.EmptyState = styled.div`
  ${C.flexCenterColumn}
  padding: 60px 20px;
  color: ${({ theme }) => theme.PALLETE.grey.greyScale3};
`;

S.EmptyStateText = styled.p`
  ${C.paragraphRegular}
  color: ${({ theme }) => theme.PALLETE.grey.greyScale3};
  margin-top: 16px;
`;

S.BackButton = styled.button`
  ${C.smallText2Regular}
  color: ${({ theme }) => theme.PALLETE.primary.main};
  background: none;
  border: none;
  cursor: pointer;
  margin-bottom: 16px;
  padding: 8px 0;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.7;
  }
`;

S.FilterBar = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  align-items: center;
`;

S.SearchInput = styled.input`
  flex: 1;
  padding: 10px 16px;
  border: 1px solid ${({ theme }) => theme.PALLETE.grey.greyScale1};
  border-radius: 4px;
  ${C.smallText2Regular}
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.PALLETE.primary.main};
  }
`;

S.FilterSelect = styled.select`
  padding: 10px 16px;
  border: 1px solid ${({ theme }) => theme.PALLETE.grey.greyScale1};
  border-radius: 4px;
  ${C.smallText2Regular}
  background-color: ${({ theme }) => theme.PALLETE.white};
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.PALLETE.primary.main};
  }
`;

S.TabContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
  border-bottom: 2px solid ${({ theme }) => theme.PALLETE.grey.greyScale1};
`;

S.TabButton = styled.button`
  ${C.smallText2Regular}
  padding: 12px 24px;
  border: none;
  background: none;
  cursor: pointer;
  border-bottom: 2px solid ${({ $active, theme }) => $active ? theme.PALLETE.primary.main : 'transparent'};
  color: ${({ $active, theme }) => $active ? theme.PALLETE.primary.main : theme.PALLETE.grey.greyScale3};
  font-weight: ${({ $active }) => $active ? 'bold' : 'normal'};
  transition: all 0.2s;
  margin-bottom: -2px;

  &:hover {
    color: ${({ theme }) => theme.PALLETE.primary.main};
  }
`;

// =======================================================
// [Dashboard 전용 스타일] - 필수 추가
// =======================================================

S.DashboardWrapper = S.ContentSection; // ContentSection 재사용

S.SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`;

S.SummaryCard = styled.div`
  background: ${({ theme }) => theme.PALLETE.white};
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
  border: 1px solid ${({ theme }) => theme.PALLETE.grey.greyScale1};
`;

S.SummaryLabel = styled.p`
  ${C.smallText2Regular}
  color: ${({ theme }) => theme.PALLETE.grey.greyScale3};
  margin-bottom: 8px;
`;

S.SummaryValue = styled.h2`
  ${C.heading2}
  ${C.primary}
`;

S.ChartGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;

  @media (min-width: 900px) {
    grid-template-columns: 1fr 1fr;
  }
`;

S.ChartCard = styled.div`
  background: ${({ theme }) => theme.PALLETE.white};
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
  border: 1px solid ${({ theme }) => theme.PALLETE.grey.greyScale1};
  /* ChartGrid가 1fr 1fr일 때 두 칸을 모두 차지하도록 설정 */
  &:first-child, &:last-child {
    grid-column: span 1;
    @media (max-width: 900px) {
        grid-column: span 1;
    }
  }
`;

S.ChartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

S.ChartTitle = styled.h3`
  ${C.heading4}
  ${C.basic}
`;

S.ChartBody = styled.div`
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

S.HorizonButtons = styled.div`
  display: flex;
  gap: 4px;
`;

S.HorizonButton = styled.button`
  ${C.smallText3Regular}
  padding: 6px 10px;
  border: 1px solid ${({ theme }) => theme.PALLETE.grey.greyScale1};
  border-radius: 4px;
  background-color: ${({ $active, theme }) => 
    $active ? theme.PALLETE.primary.main : theme.PALLETE.white};
  color: ${({ $active, theme }) => 
    $active ? theme.PALLETE.white : theme.PALLETE.grey.greyScale4};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${({ $active, theme }) => 
      $active ? theme.PALLETE.primary.dark : theme.PALLETE.grey.greyScale0};
  }
`;

S.SimpleList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 250px;
  overflow-y: auto;

  & > li {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    border-bottom: 1px dashed ${({ theme }) => theme.PALLETE.grey.greyScale1};
    ${C.smallText2Regular}
    
    &:last-child {
      border-bottom: none;
    }
    
    & > span:first-child {
      color: ${({ theme }) => theme.PALLETE.grey.greyScale4};
    }
    
    & > span:last-child {
      font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
      color: ${({ theme }) => theme.PALLETE.basic};
    }
  }
`;

S.ErrorBox = styled.div`
  ${C.smallText2Regular}
  background-color: #ffebee;
  color: #d32f2f;
  border: 1px solid #d32f2f;
  border-radius: 4px;
  padding: 16px;
  margin-bottom: 24px;
  text-align: center;
`;


export default S;