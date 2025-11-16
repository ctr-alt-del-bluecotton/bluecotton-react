import React, { useEffect, useState, useRef } from 'react';
import { Map, MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk';
import S from './style';
import { useNavigate } from 'react-router-dom';

const MapContainer = () => {
  const [somList, setSomList] = useState([]);
  const [markers, setMarkers] = useState([]);
  const [center, setCenter] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [myLocation, setMyLocation] = useState(null);
  const [selectedMarkerId, setSelectedMarkerId] = useState(null);

  const navigate = useNavigate();
  const mapRef = useRef(null);

  const handleInfoClick = (id) => {
    navigate(`/main/som/read/${id}`);
  };

  const fetchMyLocation = () => {
    if (!navigator.geolocation) {
      alert('현재 브라우저에서는 위치 정보를 사용할 수 없습니다.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const current = { lat: latitude, lng: longitude };
        setMyLocation(current);
        setCenter(current);
      },
      (error) => console.error('위치 정보를 가져오는 데 실패했습니다:', error),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const fetchSomList = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/som/all`);
      const result = await res.json();
      setSomList(result.data || []);

      if (!result.data || result.data.length === 0) {
        setIsLoaded(true);
      }
    } catch (error) {
      console.error('솜 데이터를 불러오는 데 실패했습니다:', error);
      setIsLoaded(true);
    }
  };



  useEffect(() => {
    fetchMyLocation();
    const timer = setTimeout(() => fetchSomList(), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!somList.length) return;
    if (!window.kakao || !window.kakao.maps || !window.kakao.maps.services) return;

    const geocoder = new window.kakao.maps.services.Geocoder();

    let completed = 0; 
    const nextMarkers = [];

    somList.forEach((som) => {
      geocoder.addressSearch(som.somAddress, (result, status) => {
        completed += 1;

        if (status === window.kakao.maps.services.Status.OK) {
          const latitude = parseFloat(result[0].y);
          const longitude = parseFloat(result[0].x);

          nextMarkers.push({
            id: som.id,
            title: som.somTitle,
            address: som.somAddress,
            imageUrl: som.somImageList?.[0]?.somImagePath || null,
            latitude,
            longitude,
          });
        } else {
          console.warn('지오코딩 실패:', som.somAddress);
        }

        if (completed === somList.length) {
          setMarkers(nextMarkers);
          setIsLoaded(true);

          if (!myLocation && nextMarkers.length > 0) {
            setCenter({
              lat: nextMarkers[0].latitude,
              lng: nextMarkers[0].longitude,
            });
          }
        }
      });
    });
  }, [somList, myLocation]);

  const moveToLocation = (lat, lng) => {
    const map = mapRef.current;
    if (map) {
      const offsetY = 0.002;
      const moveLatLon = new window.kakao.maps.LatLng(lat + offsetY, lng);
      map.panTo(moveLatLon);
    }
  };

  const handleMarkerClick = (id, lat, lng) => {
    setSelectedMarkerId((prev) => (prev === id ? null : id));
    moveToLocation(lat, lng);
  };

  if (!center) return <div>지도 불러오는 중...</div>;

  return (
    <S.MapContainer>
      <S.Content>
        <S.Title>솜이 진행 중인 장소 / 솜 찾기</S.Title>
        <S.MapAndListWrapper>
          <S.MapBox>
            <S.Map center={center} level={5} ref={mapRef}>
              {myLocation && (
                <MapMarker
                  position={myLocation}
                  image={{
                    src: process.env.PUBLIC_URL + '/assets/icons/mapUserMarker.png',
                    size: { width: 60, height: 100 },
                  }}
                />
              )}

              {markers.map((marker) => (
                <React.Fragment key={marker.id}>
                  <MapMarker
                    position={{ lat: marker.latitude, lng: marker.longitude }}
                    image={{
                      src: process.env.PUBLIC_URL + '/assets/icons/mapSomMarker.png',
                      size: { width: 60, height: 100 },
                    }}
                    onClick={() =>
                      handleMarkerClick(marker.id, marker.latitude, marker.longitude)
                    }
                  />

                  {selectedMarkerId === marker.id && (
                    <CustomOverlayMap
                      position={{ lat: marker.latitude, lng: marker.longitude }}
                      xAnchor={0.5}
                      yAnchor={1.4}
                    >
                      <S.InfoBox>
                        <S.CloseButton
                          src={process.env.PUBLIC_URL + '/assets/icons/close.svg'}
                          alt="닫기"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedMarkerId(null);
                          }}
                        />

                        {marker.imageUrl && (
                          <S.InfoImage src={marker.imageUrl} alt={marker.title} />
                        )}

                        <S.InfoContent
                          onClick={() => handleInfoClick(marker.id)}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              handleInfoClick(marker.id);
                            }
                          }}
                        >
                          <S.InfoTitle>{marker.title}</S.InfoTitle>
                          <S.InfoAddress>{marker.address}</S.InfoAddress>
                        </S.InfoContent>
                      </S.InfoBox>
                    </CustomOverlayMap>
                  )}
                </React.Fragment>
              ))}
            </S.Map>

            <S.MyLocationButton
              src={process.env.PUBLIC_URL + '/assets/icons/somfavicon.png'}
              alt="내 위치로 이동"
              onClick={() =>
                myLocation && moveToLocation(myLocation.lat, myLocation.lng)
              }
            />
          </S.MapBox>

          <S.ListBox>
            {somList.map((som) => (
              <S.SomItem
                key={som.id}
                onClick={() => {
                  const marker = markers.find((marker) => marker.id === som.id);
                  if (!marker) return;
                  moveToLocation(marker.latitude, marker.longitude);
                  setSelectedMarkerId(marker.id);
                }}
              >
                <S.SomTitle>{som.somTitle}</S.SomTitle>
                <S.SomAddress>{som.somAddress}</S.SomAddress>

                <S.SomDate>
                  시작일: {som.somStartDate?.slice(0, 10).replaceAll(".", "-")}
                </S.SomDate>
                <S.SomDate>
                  마감일: {som.somEndDate?.slice(0, 10).replaceAll(".", "-")}
                </S.SomDate>
              </S.SomItem>
            ))}
          </S.ListBox>
        </S.MapAndListWrapper>
      </S.Content>
    </S.MapContainer>
  );
};

export default MapContainer;
