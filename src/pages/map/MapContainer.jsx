import React, { useEffect, useState } from 'react';
import { MapMarker } from 'react-kakao-maps-sdk';
import S from './style';

const MapContainer = () => {
  // 여러 개의 마커 좌표를 담는 state  
  const [markers, setMarkers] = useState([]);

  // 지도 중심 좌표 (처음엔 null, 마커 세팅 후 지정)  
  const [center, setCenter] = useState(null); 

  // 로딩 상태 (모든 주소 변환이 끝나면 true)
  const [isLoaded, setIsLoaded] = useState(false);

  // 백엔드에서 가져온 주소 리스트 상태 추가
  const [addressList, setAddressList] = useState([]);

  // DB에서 모든 회원 주소 가져오기
  const fetchAddresses = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/som/address`);
      const result = await res.json();
      console.log("응답", result);
      setAddressList(result.data); // ["주소1", "주소2", ...]
    } catch (error) {
      console.error("주소 데이터를 불러오는 데 실패했습니다:", error);
    }
  };

  useEffect(() => {                                                      
    fetchAddresses();  // mount 시 주소 fetch
  }, []);

  useEffect(() => {
    if (addressList.length === 0) return; // 주소 없으면 실행X

    // geocoder객체 생성 -> 주소를 위도와 경도로 바꿔줌
    const geocoder = new window.kakao.maps.services.Geocoder();

    // 임시로 마커 좌표를 저장할 배열
    const tempMarkers = [];

    // 백에서 받은 전체 주소 리스트 활용
    addressList.forEach((addr) => {
      geocoder.addressSearch(addr, (result, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const latitude = parseFloat(result[0].y);
          const longitude = parseFloat(result[0].x);

          // 변환된 위도, 경도를 배열에 추가
          tempMarkers.push({ latitude, longitude });

          // 모든 주소가 변환된 시점에만 실행
          if (tempMarkers.length === addressList.length) {
            setMarkers(tempMarkers); 
            setIsLoaded(true);      

            // 중심은 딱 한 번만 설정
            if (!center && tempMarkers.length > 0) {
              setCenter({
                lat: tempMarkers[0].latitude,
                lng: tempMarkers[0].longitude,
              });
            }
          }
        } else {
          console.error("주소를 찾을 수 없습니다:", addr);
        }
      });
    });

  }, [addressList]); // addressList 바뀔때만 실행

  if (!isLoaded || !center) return <div>지도 불러오는 중...</div>;

  return (
    <S.MapContainer>
      <S.Content>
        <S.Title>솜이 진행 중인 장소</S.Title>
        <S.MapAndListWrapper>

          {/* 왼쪽 지도 영역 */}
          <S.MapBox>
            {/* 여러 마커 렌더링 */}
            <S.Map center={center} level={5}>
              {markers.map((marker, i) => (
                <MapMarker
                  key={i}
                  position={{ lat: marker.latitude, lng: marker.longitude }}
                />
              ))}
            </S.Map>
          </S.MapBox>

          {/* 오른쪽 리스트 영역 */}
          <S.ListBox>
            리스트가 들어올 자리
          </S.ListBox>

        </S.MapAndListWrapper>
      </S.Content>
    </S.MapContainer>
  );
};

export default MapContainer;
