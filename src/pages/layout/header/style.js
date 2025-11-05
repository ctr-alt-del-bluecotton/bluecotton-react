import styled from "styled-components";
import { NavLink, Link } from "react-router-dom";
import {headerLogo, subtitle, headerSubLogo, secondary, fontGreyScale1, smallText3Regular, basic} from "../../../styles/common";

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
    gap: 110px;    
    justify-self: center;
    white-space: nowrap;
`;

S.RightGroup = styled.div`
    display: flex;
    align-items: center;
    justify-self: flex-end;
    margin-left: auto;
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

    &::after {
        content: "";
        position: absolute;
        background:#F83BAA;
    }

    &:hover {
        color: #F83BAA;
    }

    &.active {
        color: #F83BAA;
    }
`;

S.LoginButton = styled.div`
    width: 96px;
    height: 36px;
    border: solid 1px #E0E0E0;
    ${smallText3Regular};
    padding: 0 6px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #FFFFFF;
    cursor: pointer;
    gap: 8px;
`;

export default S;
