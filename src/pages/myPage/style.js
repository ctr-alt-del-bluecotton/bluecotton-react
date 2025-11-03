import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const MyPageWrapper = styled.div`
  width: 1160px;
  margin: 0 auto;
  display: flex;
  gap: 24px;
  padding: 40px 0;
  background-color: white;
  min-height: calc(100vh - 200px);
`;

export const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 280px;
  padding: 16px 20px;
  background-color: ${({ theme }) => theme.PALLETE.white};
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
`;

export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 16px;
`;

export const ProfileImageWrapper = styled.div`
  position: relative;
  width: 75px;
  height: 75px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 8px;
`;

export const ProfileImage = styled.div`
  width: 100%;
  height: 100%;
  background-color: black;
`;

export const SomBadge = styled.div`
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
  font-size: 14px;
  font-weight: bold;
  border: 3px solid ${({ theme }) => theme.PALLETE.white};
`;

export const UserNameContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const GradeBadge = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #C0C0C0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: bold;
  color: white;
`;

export const UserName = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.PALLETE.basic};
`;

export const NavigationList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 4px;
`;

export const NavLink = styled(Link)`
  padding: 10px 16px;
  border-radius: 8px;
  cursor: pointer;
  background-color: ${props => props.$active ? props.theme.PALLETE.primary.main : 'transparent'};
  color: ${props => props.$active ? props.theme.PALLETE.white : props.theme.PALLETE.basic};
  font-size: 14px;
  font-weight: ${props => props.$active ? '700' : '500'};
  font-family: 'Daeojamjil', sans-serif;
  transition: all 0.2s;
  text-decoration: none;
  display: block;

  &:hover {
    background-color: ${props => props.$active ? props.theme.PALLETE.primary.main : props.theme.PALLETE.grey.greyScale0};
  }
`;

export const MainContentContainer = styled.div`
  flex: 1;
  background-color: ${({ theme }) => theme.PALLETE.white};
  border-radius: 12px;
  padding: 40px;
`;

