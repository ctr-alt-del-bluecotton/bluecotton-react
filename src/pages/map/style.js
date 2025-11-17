import { Map } from "react-kakao-maps-sdk";
import styled from "styled-components";
import { basic, smallText3Regular, title, titleBold } from "../../styles/common";

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

S.Map = styled(Map)`
  width: 800px;
  height: 600px;
  border-radius: 8px;
  overflow: hidden;
`;


S.ListBox = styled.div`
  flex: 1 1 auto;
  min-width: 0;
  max-height: 600px;
  overflow-y: auto;
  padding-right: 8px;
  background-color: ${({ theme }) => theme.PALLETE.white};

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
`;


S.SomTitle = styled.h3`
  ${smallText3Regular}
  font-weight: 600;
  color: ${({ theme }) => theme.PALLETE.basic};
  margin-bottom: 8px;
`;

S.SomAddress = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.PALLETE.grey.greyScale4};
`;

S.SomDate = styled.div`
  font-size: 12px;
  margin-top: 4px;
  color: ${({ theme }) => theme.PALLETE.grey.greyScale4};
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

S.ViewButton = styled.button`
  padding: 4px 10px;
  font-size: 12px;
  border-radius: 4px;
  border: none;
  color: ${({ theme }) => theme.PALLETE.white};
  background-color: ${({ theme }) => theme.PALLETE.primary.main};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.PALLETE.primary.dark};
  }
`;


S.InfoBox = styled.div`
  position: relative;
  width: 200px;
  min-height: 160px;
  background: ${({ theme }) => theme.PALLETE.white};
  border-radius: 8px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.15);
  padding: 10px 12px;
  cursor: pointer;
`;

S.CloseButton = styled.img`
  position: absolute;
  top: 5px;
  right: 5px;
  width: 12px;
  height: 12px;
  cursor: pointer;
  opacity: 0.75;
  
  &:hover {
    opacity: 1;
  }
`;

S.InfoImage = styled.img`
  width: 100%;
  aspect-ratio: 4 / 3;
  border-radius: 8px;
  object-fit: cover;
  object-position: center;
  margin-top: 8px;
  margin-bottom: 6px;
`;

S.InfoContent = styled.div`
  cursor: pointer;
`;

S.InfoTitle = styled.h4`
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 4px;
  color: ${({ theme }) => theme.PALLETE.basic};
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
  white-space: normal;
  max-height: 3.2em;
`;

S.InfoAddress = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.PALLETE.grey.greyScale4};
  line-height: 1.4;
  word-break: keep-all;
`;


S.SomItem = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid ${({ theme }) => theme.PALLETE.grey.greyScale1};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.PALLETE.white};
  margin-bottom: 12px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.PALLETE.grey.greyScale0};
    transform: translateY(-2px);
  }
`;

S.SomThumb = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
  background: ${({ theme }) => theme.PALLETE.grey.greyScale0};
  border: 1px solid ${({ theme }) => theme.PALLETE.grey.greyScale1};
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

S.SomInfoRight = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 15px;
  gap: 13px;
  width: calc(100% - 70px);
  height: 100px;
`;

S.Row = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 6px;
`;

S.LikeArea = styled.div`
  display: flex;
  border: 1px solid ${({ theme }) => theme.PALLETE.grey.greyScale1};
  border-radius: 4px;
  align-items: center;
  padding: 3px 10px;
  gap: 5px;
  font-size: 13px;
  color: ${({ theme }) => theme.PALLETE.secondary.main};
`;

S.LikeIcon = styled.img`
  width: 13px;
  height: 13px;
`;

export default S;
