import styled from "styled-components";
import {
  basic,
  flexCenterColumn,
  headerLogo,
  secondary,
  smallText1Regular,
  smallText2Light,
  smallText2Regular,
  smallText3Light,
  smallText3Regular,
  white,
} from "../../styles/common";
import { Link } from "react-router-dom";

const S = {};

// Logo
S.Logo = styled.h1`
  ${headerLogo}
`;

// Sign-up Container
S.SignUpContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  background-color: ${({ theme }) => theme.PALLETE.white};
`;

// SignUpForm
S.SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  align-items: center;
`;

// Background
S.BackgroundBox = styled.div`
  width: 70%;
  height: 100%;
  background-image: url(${process.env.PUBLIC_URL}/assets/images/login_image.png);
  background-position: center;
  background-repeat: no-repeat;
`;

// Sign-up Box
S.SignUpBox = styled.div`
  width: 30%;
  height: 100%;
  background-color: ${({ theme }) => theme.PALLETE.white};
  ${flexCenterColumn};
  gap: 20px;
`;

// ⭐ Input (error props 적용)
S.Input = styled.input`
  width: 296px;
  height: 40px;
  border: 1px solid
    ${({ theme, error }) =>
      error ? theme.PALLETE.warning : theme.PALLETE.grey.greyScale1};
  border-radius: 4px;
  padding: 0 12px;
  outline: none;
  ${smallText2Light};
  ${basic};

  &:focus {
    border-color: ${({ theme }) => theme.PALLETE.primary.main};
  }
`;

// Address Box
S.AddressBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 320px;
  gap: 8px;
`;

// ⭐ AddressInput (error props 적용)
S.AddressInput = styled.input`
  flex: 1;
  height: 40px;
  border: 1px solid
    ${({ theme, error }) =>
      error ? theme.PALLETE.warning : theme.PALLETE.grey.greyScale1};
  border-radius: 4px;
  padding: 0 12px;
  outline: none;
  ${smallText2Light};
  ${basic};

  &:focus {
    border-color: ${({ theme }) => theme.PALLETE.primary.main};
  }
`;

// Small Button (원래 border 없음 유지)
S.SmallButton = styled.button`
  width: 85px;
  height: 40px;
  background-color: ${({ theme }) => theme.PALLETE.primary.main};
  color: ${({ theme }) => theme.PALLETE.white};
  ${smallText2Regular};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.PALLETE.primary.dark};
  }
`;

// ⭐ Gender Box (각 옵션 개별 border 관리 → container border 없음)
S.GenderSelectBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 320px;
  gap: 8px;
`;

// ⭐ GenderOption (각각 error props 적용)
S.GenderOption = styled.div`
  flex: 1;
  height: 35px;
  border: 1px solid
    ${({ theme, selected, error }) =>
      error
        ? theme.PALLETE.warning
        : selected
        ? theme.PALLETE.primary.main
        : theme.PALLETE.grey.greyScale1};

  border-radius: 4px;
  ${flexCenterColumn};
  ${smallText2Light};

  color: ${({ theme, selected }) =>
    selected ? theme.PALLETE.primary.main : theme.PALLETE.basic};

  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: ${({ theme }) => theme.PALLETE.primary.main};
  }
`;

// Date Input Box
S.DateInputBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 320px;
  gap: 8px;
`;

// ⭐ DateInput (error props 적용)
S.DateInput = styled.input.attrs({ type: "date" })`
  flex: 1;
  height: 40px;
  border: 1px solid
    ${({ theme, error }) =>
      error ? theme.PALLETE.warning : theme.PALLETE.grey.greyScale1};
  border-radius: 4px;
  padding: 0 12px;
  outline: none;
  ${smallText2Light};
  ${basic};

  &:focus {
    border-color: ${({ theme }) => theme.PALLETE.primary.main};
  }

  &::-webkit-calendar-picker-indicator {
    cursor: pointer;
    filter: invert(50%);
  }
`;

// Sign-up Button
S.SignUpButton = styled(Link)`
  width: 320px;
  height: 40px;
  background-color: ${({ theme }) => theme.PALLETE.primary.main};
  ${smallText2Regular};
  ${white};
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none; /* 유지 */
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.PALLETE.primary.dark};
  }
`;

// Divider (⭐ "또는" 복구)
S.Divider = styled.div`
  width: 320px;
  height: 1px;
  background-color: ${({ theme }) => theme.PALLETE.grey.greyScale3};
  position: relative;
  margin: 24px 0;

  &::after {
    content: "또는";
    position: absolute;
    ${smallText3Light};
    top: -10px;
    left: 50%;
    transform: translateX(-50%);
    background-color: ${({ theme }) => theme.PALLETE.white};
    padding: 0 8px;
    color: ${({ theme }) => theme.PALLETE.grey.greyScale3};
  }
`;

// Login Text
S.LoginText = styled.p`
  color: ${({ theme }) => theme.PALLETE.basic};
  ${smallText3Light};

  a {
    ${smallText2Light};
    color: ${({ theme }) => theme.PALLETE.primary.main};
    text-decoration: none;

    &:hover {
      color: ${({ theme }) => theme.PALLETE.primary.dark};
    }
  }
`;

export default S;
