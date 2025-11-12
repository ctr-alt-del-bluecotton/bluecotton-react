import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as C from '../../styles/common';

const S = {};

S.MyPageWrapper = styled.div`
  width: 1160px;
  margin: 0 auto;
  display: flex;
  gap: 24px;
  padding: 40px 0;
  background-color: white;
  min-height: calc(100vh - 200px);
`;

S.SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 280px;
  padding: 16px 20px;
  background-color: ${({ theme }) => theme.PALLETE.white};
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
`;

S.ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 30px 0 50px 0;
  gap: 8px;
`;

S.ProfileImageWrapper = styled.div`
  position: relative;
  width: 75px;
  height: 75px;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 8px;
`;

S.ProfileImage = styled.div`
  width: 100%;
  height: 100%;
  background-color: black;
`;

S.SomBadge = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.PALLETE.primary.main};
  color: ${({ theme }) => theme.PALLETE.white};
  display: flex;
  align-items: center;
  justify-content: center;
  ${C.smallText2Bold}
  border: 3px solid ${({ theme }) => theme.PALLETE.white};
`;

S.UserNameContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

S.GradeBadge = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${props => props.$bgColor || '#C0C0C0'};
  display: flex;
  align-items: center;
  justify-content: center;
  ${C.smallText0Bold}
  color: white;
`;

S.UserName = styled.div`
  ${C.subtitleRegular}
  color: ${({ theme }) => theme.PALLETE.basic};
`;

S.NavigationList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 8px;
`;

S.NavLink = styled(Link)`
  padding: 10px 16px;
  border-radius: 8px;
  cursor: pointer;
  background-color: ${props => props.$active ? props.theme.PALLETE.primary.main : 'transparent'};
  color: ${props => props.$active ? props.theme.PALLETE.white : props.theme.PALLETE.basic};
  ${props => props.$active ? C.smallText3Bold : C.smallText3Regular}
  font-family: 'Daeojamjil', sans-serif;
  transition: all 0.2s;
  text-decoration: none;
  display: block;

  &:hover {
    background-color: ${props => props.$active ? props.theme.PALLETE.primary.main : props.theme.PALLETE.grey.greyScale0};
  }
`;

S.MainContentContainer = styled.div`
  flex: 1;
  background-color: ${({ theme }) => theme.PALLETE.white};
  border-radius: 12px;
  padding: 40px;
`;

export default S;
