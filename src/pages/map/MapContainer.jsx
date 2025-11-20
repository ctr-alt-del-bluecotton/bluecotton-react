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
        const current = { lat: position.coords.latitude, lng: position.coords.longitude };
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
      if (!result.data || result.data.length === 0) setIsLoaded(true);
    } catch (err) {
      console.error(err);
      setIsLoaded(true);
    }
  };

  useEffect(() => {
    fetchMyLocation();
    const timer = setTimeout(fetchSomList, 800);
    return () => clearTimeout(timer);
  }, []);

  const formatAddress = (address) => {
    if (!address) return "";
    const split = address.split(" ");
    return split.length >= 2 ? `${split[0]} ${split[1]}` : address;
  };

  useEffect(() => {
    if (!somList.length) return;
    if (!window.kakao || !window.kakao.maps?.services) return;

    const geocoder = new window.kakao.maps.services.Geocoder();
    let done = 0;
    const tmp = [];

    somList.forEach((som) => {
      geocoder.addressSearch(som.somAddress, (result, status) => {
        done++;

        if (status === window.kakao.maps.services.Status.OK) {
          tmp.push({
            id: som.id,
            title: som.somTitle,
            address: formatAddress(som.somAddress),
            imageUrl: som.somImageList?.[0]?.somImagePath || null,
            latitude: parseFloat(result[0].y),
            longitude: parseFloat(result[0].x),
          });
        }

        if (done === somList.length) {
          setMarkers(tmp);
          setIsLoaded(true);
          if (!myLocation && tmp.length > 0) {
            setCenter({ lat: tmp[0].latitude, lng: tmp[0].longitude });
          }
        }
      });
    });
  }, [somList, myLocation]);

  const moveToLocation = (lat, lng) => {
    const map = mapRef.current;
    if (!map) return;
    const offsetY = 0.002;
    map.panTo(new window.kakao.maps.LatLng(lat + offsetY, lng));
  };

  const onMarkerClick = (id, lat, lng) => {
    setSelectedMarkerId(prev => (prev === id ? null : id));
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
                  zIndex={9999}
                  position={myLocation}
                  image={{
                    src: "/assets/icons/mapUserMarker.png",
                    size: { width: 60, height: 100 },
                  }}
                />
              )}

              {markers.map(marker => (
                <React.Fragment key={marker.id}>
                  <MapMarker
                    position={{ lat: marker.latitude, lng: marker.longitude }}
                    image={{
                      src: "/assets/icons/mapSomMarker.png",
                      size: { width: 60, height: 100 },
                    }}
                    onClick={() => onMarkerClick(marker.id, marker.latitude, marker.longitude)}
                  />

                  {selectedMarkerId === marker.id && (
                    <CustomOverlayMap
                      position={{ lat: marker.latitude, lng: marker.longitude }}
                      xAnchor={0.5}
                      yAnchor={1.4}
                    >
                      <S.InfoBox>
                        <S.CloseButton
                          src="/assets/icons/close.svg"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedMarkerId(null);
                          }}
                        />

                        {marker.imageUrl && <S.InfoImage src={marker.imageUrl} 
                        
                          onClick={(e) => {
                            e.stopPropagation();
                            handleInfoClick(marker.id);
                          }}
                        />}

                        <S.InfoContent onClick={() => handleInfoClick(marker.id)}>
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
              src="/assets/icons/somfavicon.png"
              onClick={() => myLocation && moveToLocation(myLocation.lat, myLocation.lng)}
            />
          </S.MapBox>

          <S.ListBox>
            {somList.map((som) => {
              const img = som.somImageList?.[0]?.somImagePath || "/assets/icons/defaultSom.png";
              const likeCount = som.somLikeCount ?? 0;

              return (
                <S.SomItem key={som.id} onClick={() => {
                  const marker = markers.find((m) => m.id === som.id);
                  if (!marker) return;
                  moveToLocation(marker.latitude, marker.longitude);
                  setSelectedMarkerId(marker.id);
                }}>
                  <S.SomThumb>
                    <img src={img} alt="thumbnail" />
                  </S.SomThumb>

                  <S.SomInfoRight>
                    <S.SomTitle>{som.somTitle}</S.SomTitle>
                    <S.SomAddress>{formatAddress(som.somAddress)}</S.SomAddress>

                    <S.Row>
                      <S.LikeArea>
                        <S.LikeIcon src="/assets/icons/favorite_acv.svg" alt="like" />
                        <span>{likeCount}</span>
                      </S.LikeArea>

                      <S.ViewButton
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/main/som/read/${som.id}`);
                        }}
                      >
                        보러가기
                      </S.ViewButton>
                    </S.Row>
                  </S.SomInfoRight>
                </S.SomItem>
              );
            })}
          </S.ListBox>

        </S.MapAndListWrapper>
      </S.Content>
    </S.MapContainer>
  );
};

export default MapContainer;
