import styled from "styled-components";
import { NavLink, Link } from "react-router-dom";
import {
  headerLogo,
  subtitle,
  headerSubLogo,
  secondary,
  fontGreyScale1,
  smallText3Regular,
  basic,
  subtitleRegular,
} from "../../../styles/common";

const S = {};

S.HeaderWrap = styled.header`
  width: 100%;
  display: flex;
  justify-content: center;
`;

S.HeaderContainer = styled.div`
  width: 100%;
  max-width: 1160px;
  height: 72px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
`;

S.HeaderRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

S.LeftGroup = styled.div`
  flex: 1 0 0;
  display: flex;
  align-items: center;
  gap: 8px;
  justify-self: start;
  min-width: 0;
`;

S.CenterGroup = styled.nav`
  position: absolute;
  left: 53%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 120px;
  justify-self: center;
  white-space: nowrap;
`;

S.RightGroup = styled.div`
  display: flex;
  align-items: center;
  justify-self: flex-end;
  margin-left: auto;
  gap: 10px;
`;

S.Logo = styled(Link)`
  ${headerLogo}
  text-decoration: none;
`;

S.Bar = styled.span`
  ${fontGreyScale1}
  ${smallText3Regular}
  margin-left: 8px;
  margin-right: 8px;
`;

S.SectionName = styled.span`
  ${headerSubLogo}
  ${secondary}
`;

S.NavLink = styled(NavLink)`
  ${subtitle}
  ${basic}
  text-decoration: none;
  position: relative;
  color: ${secondary};

  &:hover {
    color: #f83baa;
  }

  &.active {
    color: #f83baa;
  }
`;


S.LoginButton = styled.div`
  width: 96px;
  height: 36px;
  border: 1px solid #e0e0e0;
  ${smallText3Regular};
  padding: 0 10px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  cursor: pointer;
  gap: 8px;
  white-space: nowrap;
  line-height: 1;
  
  img {
    width: 18px;
    height: 18px;
  }
`;


S.LogoutButton = styled(S.LoginButton)`
  color: ${({ theme }) => theme.PALLETE.primary.main};
  ${subtitleRegular}
  transition: 0.2s ease;
  &:hover {
    background: ${({ theme }) => theme.PALLETE.primary.main};
    color: white;
  }
`;


S.ProfileBox = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  white-space: nowrap;
  line-height: 1;
  
  img {
    width: 18px;
    height: 18px;
    vertical-align: middle;
  }
`;

S.ProfileName = styled.span`
  ${subtitleRegular}
  color: ${({ theme }) => theme.PALLETE.primary.main};
  max-width: 90px;          
  white-space: nowrap;      
  overflow: hidden;         
  text-overflow: ellipsis;
  line-height: 1;
`;

export default S;
