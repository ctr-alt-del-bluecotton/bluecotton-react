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

const S = {};

S.Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  background-color: ${({ theme }) => theme.PALLETE.white};
`;

S.BackgroundBox = styled.div`
  width: 70%;
  height: 100%;
  background-image: url(${process.env.PUBLIC_URL}/assets/images/login_image.png);
  background-position: center;
  background-repeat: no-repeat;
`;

S.Box = styled.div`
  width: 30%;
  height: 100%;
  ${flexCenterColumn};
  gap: 20px;
  background-color: ${({ theme }) => theme.PALLETE.white};
`;

S.FormBox = styled.div`
  ${flexCenterColumn};
  gap: 20px;
  width: 100%;
`;

S.Logo = styled.h1`
  ${headerLogo};
`;

S.Input = styled.input`
  width: 296px;
  height: 40px;
  border: 1px solid ${({ theme }) => theme.PALLETE.grey.greyScale1};
  border-radius: 4px;
  padding: 0 12px;
  outline: none;
  ${smallText2Light};
  ${basic};

  &:focus {
    border-color: ${({ theme }) => theme.PALLETE.primary.main};
  }
`;

S.MainButton = styled.button`
  width: 320px;
  height: 40px;
  background-color: ${({ theme }) => theme.PALLETE.primary.main};
  ${smallText2Regular};
  ${white};
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.PALLETE.primary.dark};
  }
`;

S.Divider = styled.div`
  width: 320px;
  height: 1px;
  background-color: ${({ theme }) => theme.PALLETE.grey.greyScale3};
  position: relative;

  &::after {
    content: "또는";
    position: absolute;
    top: -10px;
    left: 50%;
    transform: translateX(-50%);
    background-color: ${({ theme }) => theme.PALLETE.white};
    padding: 0 8px;
    ${smallText3Light};
    color: ${({ theme }) => theme.PALLETE.grey.greyScale3};
  }
`;

S.BottomText = styled.p`
  ${smallText3Light};
  color: ${({ theme }) => theme.PALLETE.basic};

  a {
    color: ${({ theme }) => theme.PALLETE.primary.main};
    text-decoration: none;

    &:hover {
      color: ${({ theme }) => theme.PALLETE.primary.dark};
    }
  }
`;

export default S;
