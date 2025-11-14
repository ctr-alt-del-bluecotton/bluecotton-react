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
  background-color: ${({ theme }) => theme.PALLETE.white};
  ${flexCenterColumn};
  gap: 20px;
`;

S.FormBox = styled.div`
  ${flexCenterColumn};
  gap: 20px;
  width: 100%;
`;

S.Logo = styled.h1`
  ${headerLogo}
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
  border-radius: 4px;
  border: none;
  color: ${({ theme }) => theme.PALLETE.white};
  cursor: pointer;
  ${smallText2Regular};

  &:hover {
    background-color: ${({ theme }) => theme.PALLETE.primary.dark};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.PALLETE.primary.light};
    cursor: default;
  }
`;

S.Divider = styled.div`
  width: 320px;
  height: 1px;
  background-color: ${({ theme }) => theme.PALLETE.grey.greyScale3};
  position: relative;
  margin: 20px 0;

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

S.BottomText = styled.p`
  ${smallText3Light};
  color: ${({ theme }) => theme.PALLETE.basic};

  a {
    ${smallText2Light};
    color: ${({ theme }) => theme.PALLETE.primary.main};
    text-decoration: none;

    &:hover {
      color: ${({ theme }) => theme.PALLETE.primary.dark};
    }
  }
`;

S.ResultBox = styled.div`
  width: 296px;
  padding: 16px;
  border: 1px solid ${({ theme }) => theme.PALLETE.primary.main};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.PALLETE.grey.greyScale5};
  text-align: center;
  ${flexCenterColumn};
  gap: 8px;

  p {
    ${smallText2Light};
    color: ${({ theme }) => theme.PALLETE.basic};
  }

  strong {
    ${smallText2Regular};
    color: ${({ theme }) => theme.PALLETE.primary.main};
    font-size: 16px;
  }
`;

export default S;
