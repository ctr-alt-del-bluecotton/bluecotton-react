import React, { useEffect, useState, useRef } from 'react';
import { MapMarker, Map } from 'react-kakao-maps-sdk';
import S from './style';

const MapContainer = () => {
  const [somList, setSomList] = useState([]);      
  const [markers, setMarkers] = useState([]);      
  const [center, setCenter] = useState(null);      
  const [isLoaded, setIsLoaded] = useState(false); 
  const [myLocation, setMyLocation] = useState(null); 

  // Kakao Map 객체 접근용 ref
  const mapRef = useRef(null);

  // 내 위치 가져오기
  const fetchMyLocation = () => {
    if (!navigator.geolocation) {
      alert("현재 브라우저에서는 위치 정보를 사용할 수 없습니다.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        const current = { lat: latitude, lng: longitude };
        setMyLocation(current);
        setCenter(current);
      },
      (error) => {
        console.error("위치 정보를 가져오는 데 실패했습니다:", error);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  // 솜 전체 조회
  const fetchSomList = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/som/all`);
      const result = await res.json();
      setSomList(result.data);
    } catch (error) {
      console.error("솜 데이터를 불러오는 데 실패했습니다:", error);
    }
  };

  // mount 시 내 위치 먼저 → 솜 불러오기
  useEffect(() => {
    fetchMyLocation();
    const timer = setTimeout(() => fetchSomList(), 1000);
    return () => clearTimeout(timer);
  }, []);

  // 주소 → 좌표 변환
  useEffect(() => {
    if (somList.length === 0) return;
    const geocoder = new window.kakao.maps.services.Geocoder();
    const tempMarkers = [];

    somList.forEach((som) => {
      geocoder.addressSearch(som.somAddress, (result, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const latitude = parseFloat(result[0].y);
          const longitude = parseFloat(result[0].x);

          tempMarkers.push({
            id: som.id,
            title: som.somTitle,
            address: som.somAddress,
            content: som.somContent,
            latitude,
            longitude,
          });

          if (tempMarkers.length === somList.length) {
            setMarkers(tempMarkers);
            setIsLoaded(true);

            if (!myLocation && tempMarkers.length > 0) {
              setCenter({
                lat: tempMarkers[0].latitude,
                lng: tempMarkers[0].longitude,
              });
            }
          }
        }
      });
    });
  }, [somList]);

  // 지도 이동 함수
  const moveToLocation = (lat, lng) => {
    const map = mapRef.current;
    if (map) {
      const moveLatLon = new window.kakao.maps.LatLng(lat, lng);
      map.panTo(moveLatLon);
    }
  };
 
  if (!isLoaded || !center) return <div>지도 불러오는 중...</div>;

  // 렌더링
  return (
    <S.MapContainer>
      <S.Content>
        <S.Title>솜이 진행 중인 장소 / 솜 찾기</S.Title>
        <S.MapAndListWrapper>

          {/* 왼쪽 지도 */}
          <S.MapBox>
            <S.Map
              center={center}
              level={5}
              ref={mapRef}
            >
              {/* 내 위치 마커 */}
              {myLocation && (
                <MapMarker
                  position={myLocation}
                  image={{
                    src: process.env.PUBLIC_URL + "/assets/icons/mapUserMarker.png",
                    size: { width: 60, height: 100 },
                  }}
                />
              )}

              {/* 솜 마커 */}
              {markers.map((marker) => (
                <MapMarker
                  key={marker.id}
                  position={{ lat: marker.latitude, lng: marker.longitude }}
                  image={{
                    src: process.env.PUBLIC_URL + "/assets/icons/mapSomMarker.png",
                    size: { width: 60, height: 100 },
                  }}
                />
              ))}
            </S.Map>

            {/* 내 위치로 돌아가기 버튼 */}
            <S.MyLocationButton
              src={process.env.PUBLIC_URL + "/assets/icons/somfavicon.png"}
              alt="내 위치로 이동"
              onClick={() => {
                if (myLocation) moveToLocation(myLocation.lat, myLocation.lng);
              }}
            />
          </S.MapBox>

          {/* 오른쪽 리스트 */}
          <S.ListBox>
            {somList.map((som) => (
              <S.SomItem
                key={som.id}
                onClick={() => moveToLocation(
                  markers.find((m) => m.id === som.id)?.latitude,
                  markers.find((m) => m.id === som.id)?.longitude
                )}
              >
                <S.SomTitle>{som.somTitle}</S.SomTitle>
                <S.SomContent>{som.somContent}</S.SomContent>
                <S.SomAddress>{som.somAddress}</S.SomAddress>
              </S.SomItem>
            ))}
          </S.ListBox>

        </S.MapAndListWrapper>
      </S.Content>
    </S.MapContainer>
  );
};

export default MapContainer;
