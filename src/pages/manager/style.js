import styled from "styled-components";
import * as C from '../../styles/common';

const S = {};

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

S.DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
  margin-bottom: 24px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

S.StatCard = styled.div`
  background: #ffffff;
  border-radius: 12px;
  padding: 16px 20px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.04);
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

S.StatTitle = styled.div`
  font-size: 14px;
  color: #666;
`;

S.StatValue = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: #333;
`;

S.StatDescription = styled.div`
  font-size: 12px;
  color: #999;
`;

S.SectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 12px;
  margin-top: 8px;
  color: #333;
`;


S.DashboardHeaderRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 16px;
`;

S.DashboardSubTitle = styled.p`
  font-size: 13px;
  color: #777;
`;

S.DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
  margin-bottom: 24px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
`;

S.DashboardCard = styled.div`
  background: #ffffff;
  border-radius: 12px;
  padding: 16px 20px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.04);
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

S.MetricLabel = styled.div`
  font-size: 13px;
  color: #888;
`;

S.MetricValue = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: #222;
`;

S.ChartSection = styled.section`
  margin-top: 24px;
`;

S.SectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 12px;
`;

S.ChartWrapper = styled.div`
  width: 100%;
  height: 320px;
  background: #fff;
  border-radius: 12px;
  padding: 12px 16px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.04);
`;

S.ChartGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 16px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

S.CategoryList = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 12px 16px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.04);
  max-height: 320px;
  overflow-y: auto;
`;

S.CategoryItem = styled.div`
  padding: 8px 0;
  border-bottom: 1px solid #f1f1f1;
  &:last-child {
    border-bottom: none;
  }
`;

S.CategoryName = styled.div`
  font-size: 14px;
  font-weight: 600;
`;

S.CategoryMeta = styled.div`
  font-size: 12px;
  color: #777;
`;

S.InfoText = styled.div`
  margin-top: 8px;
  font-size: 12px;
  color: #777;
`;

S.ErrorText = styled.div`
  margin-top: 8px;
  font-size: 12px;
  color: #d9534f;
`;

export default S;

