// src/pages/manager/order/style.jsx
import styled from "styled-components";
import * as C from "../../styles/common";

const S = {};

// =======================================================
// [공통 레이아웃 & 헤더]
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

S.Header = styled.header`
  margin-bottom: 40px;
`;

S.BackButton = styled.button`
  ${C.smallText2Regular}
  color: ${({ theme }) => theme.PALLETE.primary.main};
  background: none;
  border: none;
  cursor: pointer;
  margin-bottom: 16px;
  padding: 8px 0;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.7;
  }
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

// =======================================================
// [콘텐츠 섹션 공통]
// =======================================================
S.ContentSection = styled.section`
  background-color: ${({ theme }) => theme.PALLETE.white};
  border-radius: 12px;
  padding: 32px;
  margin-bottom: 24px;
  box-shadow: 0 4px 16px rgba(15, 23, 42, 0.06);
`;

S.SectionTitle = styled.h2`
  ${C.heading3}
  ${C.basic}
  margin-bottom: 24px;
`;

// =======================================================
// [카드 그리드 / 간단 카드]
// =======================================================
S.GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

S.Card = styled.div`
  background-color: ${({ theme }) => theme.PALLETE.grey.greyScale0};
  border-radius: 10px;
  padding: 20px;
  border: 1px solid ${({ theme }) => theme.PALLETE.grey.greyScale1};
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    box-shadow: 0 6px 16px rgba(15, 23, 42, 0.18);
    transform: translateY(-3px);
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
 display: flex;
  justify-content: center; 
  align-items: center;      
  gap: 12px;                 
  margin-top: 20px;
`;

S.Button = styled.button`
  ${C.smallText2Regular}
  ${C.white}
  background-color: ${({ theme }) => theme.PALLETE.primary.main};
  border: none;
  border-radius: 6px;
  padding: 6px 15px;
  margin-bottom: 18px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.PALLETE.primary.dark};
    transform: translateY(-1px);
  }

  &:disabled {
    background-color: ${({ theme }) => theme.PALLETE.grey.greyScale1};
    cursor: not-allowed;
    transform: none;
  }
`;

S.SecondaryButton = styled.button`
  ${C.smallText2Regular}
  display: flex;
  flex-direction: row;
  align-items: center;
  ${C.secondary}
  background-color: ${({ theme }) => theme.PALLETE.white};
  border: 1px solid ${({ theme }) => theme.PALLETE.grey.greyScale1};
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: 20px;
  margin-left: 5px;

  &:hover {
    background-color: ${({ theme }) => theme.PALLETE.grey.greyScale0};
  }
`;

S.ThirdButton =styled.button `
  ${C.smallText2Regular}
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: center;
  ${C.secondary}
  background-color: ${({ theme }) => theme.PALLETE.white};
  border: 1px solid ${({ theme }) => theme.PALLETE.grey.greyScale1};
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-left: 40px;

  &:hover {
    background-color: ${({ theme }) => theme.PALLETE.grey.greyScale0};
  }
`


S.FilterBar = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  align-items: center;
  border-radius: 4px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

S.SearchInput = styled.input`
  flex: 1;
  padding: 10px 16px;
  border: 1px solid ${({ theme }) => theme.PALLETE.grey.greyScale1};
  border-radius: 6px;
  ${C.smallText2Regular}
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.PALLETE.primary.main};
    box-shadow: 0 0 0 1px ${({ theme }) => theme.PALLETE.primary.main}33;
  }
`;

S.FilterSelect = styled.select`
  padding: 10px 16px;
  border: 1px solid ${({ theme }) => theme.PALLETE.grey.greyScale1};
  border-radius: 6px;
  ${C.smallText2Regular}
  background-color: ${({ theme }) => theme.PALLETE.white};
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.PALLETE.primary.main};
    box-shadow: 0 0 0 1px ${({ theme }) => theme.PALLETE.primary.main}33;
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
  border-bottom: 2px solid
    ${({ $active, theme }) =>
      $active ? theme.PALLETE.primary.main : "transparent"};
  color: ${({ $active, theme }) =>
    $active ? theme.PALLETE.primary.main : theme.PALLETE.grey.greyScale3};
  font-weight: ${({ $active }) => ($active ? "bold" : "normal")};
  transition: all 0.2s;
  margin-bottom: -2px;

  &:hover {
    color: ${({ theme }) => theme.PALLETE.primary.main};
  }
`;

S.Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 12px;
  border-radius: 8px;
  overflow: hidden;
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
  padding: 14px 16px;
  text-align: center;
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
`;

S.TableCell = styled.td`
  ${C.smallText1Regular}
  ${C.basic}
  padding: 14px 16px;
  text-align: center;
  align-items: center;
  vertical-align: middle;
`;



S.StatusBadge = styled.span`
  ${C.smallText1Regular}
  ${C.white}
  background-color: ${({ $status, theme }) =>
    $status === "active"
      ? theme.PALLETE.primary.main
      : $status === "pending"
      ? theme.PALLETE.secondary.main
      : $status === "shipped"
      ? "#2196F3"
      : $status === "delivered"
      ? "#4CAF50"
      : $status === "cancelled"
      ? "#F44336"
      : $status === "suspended"
      ? "#FF9800"
      : $status === "inactive"
      ? theme.PALLETE.grey.greyScale2
      : $status === "reported"
      ? "#E91E63"
      : $status === "resolved"
      ? "#4CAF50"
      : $status === "preparing"
      ? "#FF9800"
      : theme.PALLETE.grey.greyScale2};
  padding: 4px 12px;
  border-radius: 999px;
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

S.QuickActionSection = styled.section`
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.PALLETE.primary.main} 0%,
    ${({ theme }) => theme.PALLETE.primary.dark} 100%
  );
  border-radius: 18px;
  padding: 40px 32px;
  margin-bottom: 32px;
  box-shadow: 0 10px 28px rgba(0, 81, 255, 0.25);
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
  border-radius: 14px;
  padding: 32px 24px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  box-shadow: 0 6px 18px rgba(15, 23, 42, 0.16);

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 14px 28px rgba(15, 23, 42, 0.22);
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


S.DetailSection = styled.section`
  margin-top: 24px;
  padding: 20px 24px;
  border-radius: 16px;
  background-color: #ffffff;
  box-shadow: 0 8px 18px rgba(15, 23, 42, 0.08);
  border: 1px solid ${({ theme }) => theme.PALLETE.grey.greyScale1};
`;

S.DetailHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

S.DetailTitle = styled.h3`
  ${C.heading4}
  ${C.basic}
`;

S.DetailGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 32px;
  row-gap: 12px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

S.DetailRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 4px;
`;

S.DetailLabel = styled.span`
  width: 110px;
  font-size: 13px;
  font-weight: 500;
  color: ${({ theme }) => theme.PALLETE.grey.greyScale3};
`;

S.DetailValue = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.PALLETE.basic};
`;


S.ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.45);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

S.ModalContent = styled.div`
  width: 480px;
  max-width: calc(100% - 40px);
  background: ${({ theme }) => theme.PALLETE.white};
  border-radius: 18px;
  padding: 22px 24px 20px;
  box-shadow: 0 24px 60px rgba(15, 23, 42, 0.5);
  animation: fadeInUp 0.2s ease-out;

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(12px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

S.ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

S.ModalBody = styled.div`
  margin-top: 4px;
`;

S.ModalFooter = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

S.ModalClose = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  line-height: 1;
  cursor: pointer;
  color: ${({ theme }) => theme.PALLETE.grey.greyScale3};
  padding: 4px 8px;

  &:hover {
    color: ${({ theme }) => theme.PALLETE.basic};
  }
`;


S.DashboardWrapper = S.ContentSection;

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
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
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
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  border: 1px solid ${({ theme }) => theme.PALLETE.grey.greyScale1};
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

S.ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;


S.ModalContent = styled.div`
  background: ${({ theme }) => theme.PALLETE.white};
  width: 620px;
  max-height: 80vh;
  border-radius: 12px;
  padding: 20px 24px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  overflow-y: auto;
`;

S.ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;
S.ModalTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.PALLETE.black};
`;

S.ModalCloseButton = styled.button`
  border: none;
  background: transparent;
  font-size: 20px;
  cursor: pointer;
  color: ${({ theme }) => theme.PALLETE.grey.greyScale6};

  &:hover {
    color: ${({ theme }) => theme.PALLETE.primary.main};
  }
`;

S.DetailBox = styled.div`
  border: 1px solid ${({ theme }) => theme.PALLETE.grey.greyScale1};
  border-radius: 8px;
  padding: 12px 16px;
  margin-bottom: 16px;
  background: ${({ theme }) => theme.PALLETE.white};

  p {
    ${C.smallText2Regular}
    color: ${({ theme }) => theme.PALLETE.grey.greyScale6};
  }

  p + p {
    margin-top: 6px;
  }

  strong {
    color: ${({ theme }) => theme.PALLETE.black};
  }
`;


S.ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
  margin-top: 12px;
`;


S.ImageItem = styled.div`
  overflow: hidden;
  border-radius: 8px;
  background: ${({ theme }) => theme.PALLETE.grey.greyScale1};

  img {
    width: 100%;
    height: auto;
    display: block;
  }
`;

export default S;
