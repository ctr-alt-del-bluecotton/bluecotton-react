import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { basic, secondary, smallText3Regular } from "../../../../styles/common";

const S = {};

S.Wrapper = styled.div`
  width: 100%;
  height: 67px;
  display: flex;
  justify-content: center;
  position: relative;           

 
  &::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;                  
    height: 1px;
    background: #E0E0E0;
    z-index: 1;
  }
`;

S.Container = styled.div`
  width: 100%;
  max-width: 1160px;
  height: 100%;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  justify-content: space-between; 
  position: relative;  
`;

S.CategoryBar = styled.div`
  display: flex;
  height: 100%;
  gap: 46px;
  align-items: center;
`;

S.CategoryLink = styled(NavLink)`
  ${smallText3Regular}
  ${basic}
  position: relative;            
  text-decoration: none;
  display: flex;
  align-items: center;
  height: 100%;
  transition: color 0.2s ease;

  &.active {
    ${secondary}
  }

  &.active::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;                  
    width: 100%;
    height: 3px;
    background-color: #F83BAA;
    z-index: 2;                  
  }

  &:hover {
    ${secondary}
  }
`;

export default S;
