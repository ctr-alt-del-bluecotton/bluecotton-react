import { Map } from "react-kakao-maps-sdk";
import styled from "styled-components";
import { basic, title, titleBold } from "../../styles/common";
const { kakao } = window;

const S = {};

S.MapContainer = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.PALLETE.white};
`;

S.Content = styled.div`
  width: 1160px;
  margin: 0 auto;
  padding: 48px 0 80px;
`;

S.Title = styled.h2`
  ${titleBold};
  ${basic};
  margin: 8px 0 24px;
`;

S.MapAndListWrapper = styled.div`
  display: flex;
  gap: 40px;
  align-items: flex-start;
`;

S.MapBox = styled.div`
  position: relative;
  width: 800px;
  flex: 0 0 800px;
`;

S.ListBox = styled.div`
  flex: 1 1 auto;
  min-width: 0;

  max-height: 600px;
  overflow-y: auto;
  padding-right: 8px;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.PALLETE.grey.greyScale1};
    border-radius: 3px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: ${({ theme }) => theme.PALLETE.grey.greyScale};
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
`;

S.Map = styled(Map)`
  width: 800px;
  height: 600px;
  border-radius: 20px;
  overflow: hidden;
`;

S.SomTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.PALLETE.basic};
  margin-bottom: 8px;
`;

S.SomContent = styled.p`
  font-size: 14px;
  line-height: 1.5;
  color: ${({ theme }) => theme.PALLETE.grey.greyScale4};
  margin-bottom: 6px;
  word-break: keep-all;
`;

S.SomAddress = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.PALLETE.grey.greyScale4};
`;

S.SomItem = styled.div`
  padding: 16px 20px;
  border-bottom: 1px solid #E0E0E0;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.PALLETE.grey.greyScale0};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  margin-bottom: 12px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.PALLETE.primary.main};
    color: ${({ theme }) => theme.PALLETE.white};
    transform: translateY(-2px);

     ${S.SomTitle} {
      color: ${({ theme }) => theme.PALLETE.white};
      }
      ${S.SomContent} {
      color: ${({ theme }) => theme.PALLETE.white};
      }
      ${S.SomAddress} {
      color: ${({ theme }) => theme.PALLETE.white};
      }
  }
`;

S.MyLocationButton = styled.img`
  position: absolute;
  bottom: 24px;
  right: 24px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.PALLETE.white};
  padding: 5px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  transition: all 0.2s ease;
  z-index: 9999;

  &:hover {
    transform: translateY(-2px);
  }
`;

export default S;
