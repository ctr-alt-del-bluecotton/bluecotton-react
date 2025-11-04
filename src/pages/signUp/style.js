import styled from "styled-components";
import {
  basic,
  flexCenterColumn,
  headerLogo,
  secondary,
  smallText1Regular,
  smallText3Light,
  smallText3Regular,
  white,
} from "../../styles/common";
import { Link } from "react-router-dom";

const S = {}

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
// 로그인 폼
S.SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  align-items: center;
`

S.InputErrorMessage = styled.p`
  ${secondary};
  ${smallText1Regular};
`


// Background
S.BackgroundBox = styled.div`
  width: 70%;
  height: 100%;
  background-image: url(${process.env.PUBLIC_URL}/assets/images/login_image.png);
  background-position: center;
  background-repeat: no-repeat;
`;

// Sign-up
S.SignUpBox = styled.div`
  width: 30%;
  height: 100%;
  background-color: ${({ theme }) => theme.PALLETE.white};
  ${flexCenterColumn};
  gap: 20px;
`;

// Input
S.Input = styled.input`
  width: 296px;
  height: 55px;
  border: 1px solid ${({ theme }) => theme.PALLETE.grey.greyScale1};
  border-radius: 4px;
  padding: 0 12px;
  outline: none;
  ${smallText3Light};
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

// Address Input
S.AddressInput = styled.input`
  flex: 1;
  height: 40px;
  border: 1px solid ${({ theme }) => theme.PALLETE.grey.greyScale1};
  border-radius: 4px;
  padding: 0 12px;
  outline: none;
  ${smallText3Light};
  ${basic};

  &:focus {
    border-color: ${({ theme }) => theme.PALLETE.primary.main};
  }
`;

// Small Button
S.SmallButton = styled.button`
  width: 85px;
  height: 40px;
  background-color: ${({ theme }) => theme.PALLETE.primary.main};
  color: ${({ theme }) => theme.PALLETE.white};
  ${smallText3Regular};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.PALLETE.primary.dark};
  }
`;

// Gender Box
S.GenderSelectBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 320px;
  gap: 8px;
`;

// Gender Input
S.GenderOption = styled.div`
  flex: 1;
  height: 40px;
  border: 1px solid
    ${({ selected, theme }) =>
      selected ? theme.PALLETE.primary.main : theme.PALLETE.grey.greyScale1};
  border-radius: 4px;
  ${flexCenterColumn};
  ${smallText3Light};
  color: ${({ selected, theme }) =>
    selected ? theme.PALLETE.primary.main : theme.PALLETE.basic};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: ${({ theme }) => theme.PALLETE.primary.main};
  }
`;

// Birth Box
S.DateInputBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 320px;
  gap: 8px;
`;

// Birth Input
S.DateInput = styled.input.attrs({ type: "date" })`
  flex: 1;
  height: 40px;
  border: 1px solid ${({ theme }) => theme.PALLETE.grey.greyScale1};
  border-radius: 4px;
  padding: 0 12px;
  outline: none;
  ${smallText3Light};
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
  ${smallText3Regular};
  ${white};
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.PALLETE.primary.dark};
  }
`;

// Divider
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

// Social Buttons
S.SocialButtons = styled.div`
  ${flexCenterColumn};
  gap: 15px;
  width: 320px;
`;

S.SocialButton = styled(Link)`
  text-decoration: none;
  cursor: pointer;
  ${smallText3Light};
  color: ${({ theme }) => theme.PALLETE.grey.greyScale3};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;

  img {
    width: 25px;
    height: 25px;
  }
`;

// 로그인 텍스트
S.LoginText = styled.p`
  color: ${({ theme }) => theme.PALLETE.basic};
  ${smallText3Light};

  a {
    ${smallText3Light};
    color: ${({ theme }) => theme.PALLETE.primary.main};
    text-decoration: none;

    &:hover {
      color: ${({ theme }) => theme.PALLETE.primary.dark};
    }
  }
`;

export default S;