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

export default S;

