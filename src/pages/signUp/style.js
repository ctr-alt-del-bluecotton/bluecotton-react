import styled from "styled-components";
import {
  basic,
  flexCenterColumn,
  headerLogo,
  smallText2Light,
  smallText2Regular,
  smallText3Light,
  white,
} from "../../styles/common";
import { Link } from "react-router-dom";

const S = {};

S.Logo = styled.h1`
  ${headerLogo}
  margin-bottom: 30px;
`;

S.SignUpContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  background-color: ${({ theme }) => theme.PALLETE.white};
`;

S.SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  align-items: center;
`;

S.BackgroundBox = styled.div`
  width: 70%;
  height: 100%;
  background-image: url(${process.env.PUBLIC_URL}/assets/images/somNight.gif);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover; 
`;

S.SignUpBox = styled.div`
  width: 30%;
  height: 100%;
  background-color: ${({ theme }) => theme.PALLETE.white};
  ${flexCenterColumn};
  gap: 20px;
`;

S.Input = styled.input`
  width: 296px;
  height: 40px;
  border: 1px solid
    ${({ theme, $error }) =>
      $error ? theme.PALLETE.warning : theme.PALLETE.grey.greyScale1};
  border-radius: 4px;
  padding: 0 12px;
  outline: none;
  ${smallText2Light};
  ${basic};

  &:focus {
    border-color: ${({ theme }) => theme.PALLETE.primary.main};
  }
`;

S.InputLabel = styled.div`
  width: 320px;
  ${smallText2Regular};
  color: ${({ theme }) => theme.PALLETE.basic};
`;

S.InputGroup = styled.div`
  width: 320px;
  display: flex;
  flex-direction: column;
  gap: 8px; 
  margin-bottom: ${({ $error }) => ($error ? "4px" : "16px")};
`;

S.PasswordWrapper = styled.div`
  position: relative;
  width: 320px;
`;

S.EyeIcon = styled.img`
  position: absolute;
  right: 10px;
  top: 50%;
  width: 16px;
  height: 16px;
  transform: translateY(-50%);
  cursor: pointer;
  opacity: 0.6;

  &:hover {
    opacity: 1;
  }
`;


S.AddressBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 320px;
  gap: 8px;
`;

S.AddressInput = styled.input`
  flex: 1;
  height: 40px;
  border: 1px solid
    ${({ theme, $error }) =>
      $error ? theme.PALLETE.warning : theme.PALLETE.grey.greyScale1};
  border-radius: 4px;
  padding: 0 12px;
  outline: none;
  ${smallText2Light};
  ${basic};

  &:focus {
    border-color: ${({ theme }) => theme.PALLETE.primary.main};
  }
`;

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

S.GenderSelectBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 320px;
  gap: 8px;
`;

S.GenderOption = styled.div`
  flex: 1;
  height: 35px;
  border: 1px solid
    ${({ theme, selected, $error }) =>
      $error
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

S.DateInputBox = styled.div`
  width: 320px;
`;

S.DateInput = styled.input.attrs({ type: "date" })`
  width: 296px;
  height: 40px;
  border: 1px solid
    ${({ theme, $error }) =>
      $error ? theme.PALLETE.warning : theme.PALLETE.grey.greyScale1};
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
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.PALLETE.primary.dark};
  }
`;

S.ButtonRow = styled.div`
  display: flex;
  gap: 8px;
  width: 320px;
`;

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

S.AgreeTitle = styled.h3`
  font-size: 16px;
  font-weight: bold;
  margin: 12px 0 8px;
`;

S.AgreeBox = styled.div`
  width: 296px;
  border: 1px solid ${({ theme }) => theme.PALLETE.grey.greyScale3};
  padding: 14px;
  border-radius: 8px;
  font-size: 14px;
  line-height: 1.4;

  p {
    margin: 0 0 6px 0; 
  }

  label {
    display: flex;
    align-items: center;
    gap: 5px;     
    margin-top: 40px;
    
  }
`;

S.ErrorText = styled.div`
  color: red;
  font-size: 12px;
  margin-top: 4px;
`;

export default S;
