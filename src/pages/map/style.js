import { Map } from "react-kakao-maps-sdk";
import styled from "styled-components";
import { basic, title, titleBold } from "../../styles/common";

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
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.PALLETE.basic};
  margin-bottom: 8px;
`;

S.SomAddress = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.PALLETE.grey.greyScale4};
`;

S.SomItem = styled.div`
  padding: 16px 20px;
  border-bottom: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.PALLETE.grey.greyScale0};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  margin-bottom: 12px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.PALLETE.primary.main};
    color: ${({ theme }) => theme.PALLETE.white};
    transform: translateY(-2px);

    ${S.SomTitle}, ${S.SomAddress} {
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

S.InfoBox = styled.div`
  width: 200px;
  min-height: 160px;
  background: ${({ theme }) => theme.PALLETE.white};
  border-radius: 8px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.15);
  padding: 10px 12px;
`;

S.InfoImage = styled.img`
  width: 100%;
  aspect-ratio: 4 / 3;
  border-radius: 8px;
  object-fit: cover;
  object-position: center;
  margin-bottom: 6px;
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

export default S;
