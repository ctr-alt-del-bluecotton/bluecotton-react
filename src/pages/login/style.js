import styled from "styled-components";
import { Link } from "react-router-dom";
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

const S = {};

// 로고
S.Logo = styled.h1`
  ${headerLogo}
`;

// 로그인 폼
S.LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  align-items: center;
`

// Login Container
S.LoginContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  background-color: ${({ theme }) => theme.PALLETE.white};
`;

// Background
S.BackgroundBox = styled.div`
  width: 70%;
  height: 100%;
  background-image: url(${process.env.PUBLIC_URL}/assets/images/login_image.png);
  background-position: center;
  background-repeat: no-repeat;
`;

// Login
S.LoginBox = styled.div`
  width: 30%;
  height: 100%;
  background-color: ${({ theme }) => theme.PALLETE.white};
  ${flexCenterColumn};
  gap: 20px;
`;

// Input
S.Input = styled.input`
  /* 320 - 24 */
  width: 296px;
  height: 55px;
  border: 1px solid ${({ theme }) => theme.PALLETE.grey.greyScale1};
  border-radius: 4px;
  padding: 0 12px;
  outline: none;
  ${smallText3Light};
  ${basic}
  &:focus {
    border-color: ${({ theme }) => theme.PALLETE.primary.main};
  }
`;

S.InputErrorMessage = styled.p`
  ${secondary};
  ${smallText1Regular};
`

// Login Button
S.LoginButton = styled(Link)`
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

// social login box
S.SocialButtons = styled.div`
  ${flexCenterColumn};
  gap: 15px;
  width: 320px;
`;

// social login
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

//  find id/pwd
S.FindInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;

  a {
    ${smallText3Light};
    color: ${({ theme }) => theme.PALLETE.basic};
    text-decoration: none;

    &:hover {
      color: ${({ theme }) => theme.PALLETE.primary.dark};
    }
  }
`;

// 회원가입
S.SignUpText = styled.p`
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