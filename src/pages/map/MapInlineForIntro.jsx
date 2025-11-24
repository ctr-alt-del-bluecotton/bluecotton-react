// src/pages/map/MapInlineForIntro.jsx
import React, { useEffect, useState, useRef } from "react";
import { Map, MapMarker, CustomOverlayMap } from "react-kakao-maps-sdk";

const MapInlineForIntro = ({ className }) => {
  const [somList, setSomList] = useState([]);
  const [markers, setMarkers] = useState([]);
  const [center, setCenter] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [myLocation, setMyLocation] = useState(null);
  const [selectedMarkerId, setSelectedMarkerId] = useState(null);

  const mapRef = useRef(null);

  const fetchMyLocation = () => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const current = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setMyLocation(current);
        setCenter(current);
      },
      (error) => console.error("위치 정보를 가져오는 데 실패했습니다:", error),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const fetchSomList = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/som/all`);
      const result = await res.json();

      // ❗ null 방어
      const list = Array.isArray(result.data) ? result.data : [];
      setSomList(list);
      if (!list.length) setIsLoaded(true);
    } catch (err) {
      console.error(err);
      setIsLoaded(true);
    }
  };

  const formatAddress = (address) => {
    if (!address) return "";
    const split = address.split(" ");
    return split.length >= 2 ? `${split[0]} ${split[1]}` : address;
  };

  useEffect(() => {
    fetchMyLocation();
    const timer = setTimeout(fetchSomList, 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!somList || somList.length === 0) return;
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
    setSelectedMarkerId((prev) => (prev === id ? null : id));
    moveToLocation(lat, lng);
  };

  if (!center || !isLoaded) return null;

  return (
    // 👉 Intro에서 .map-img 스타일을 줄 수 있도록 className 그대로 전달
    <div className={className}>
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          borderRadius: "24px",
          overflow: "hidden",
        }}
      >
        <Map
          center={center}
          level={5}
          ref={mapRef}
          style={{ width: "100%", height: "100%" }}
        >
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

          {markers.map((marker) => (
            <React.Fragment key={marker.id}>
              <MapMarker
                position={{ lat: marker.latitude, lng: marker.longitude }}
                image={{
                  src: "/assets/icons/mapSomMarker.png",
                  size: { width: 60, height: 100 },
                }}
                onClick={() =>
                  onMarkerClick(marker.id, marker.latitude, marker.longitude)
                }
              />

              {selectedMarkerId === marker.id && (
                <CustomOverlayMap
                  position={{ lat: marker.latitude, lng: marker.longitude }}
                  xAnchor={0.5}
                  yAnchor={1.4}
                >
                  <div
                    style={{
                      backgroundColor: "#fff",
                      borderRadius: "12px",
                      padding: "8px 10px",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                      maxWidth: "200px",
                    }}
                  >
                    {marker.imageUrl && (
                      <img
                        src={marker.imageUrl}
                        alt={marker.title}
                        style={{
                          width: "100%",
                          height: "100px",
                          objectFit: "cover",
                          borderRadius: "8px",
                          marginBottom: "6px",
                        }}
                      />
                    )}
                    <div
                      style={{
                        fontSize: "14px",
                        fontWeight: 600,
                        marginBottom: "4px",
                      }}
                    >
                      {marker.title}
                    </div>
                    <div style={{ fontSize: "12px", color: "#555" }}>
                      {marker.address}
                    </div>
                  </div>
                </CustomOverlayMap>
              )}
            </React.Fragment>
          ))}
        </Map>

        {/* 내 위치 버튼 */}
        <img
          src="/assets/icons/somfavicon.png"
          alt="내 위치로 이동"
          onClick={() =>
            myLocation && moveToLocation(myLocation.lat, myLocation.lng)
          }
          style={{
            position: "absolute",
            bottom: "16px",
            right: "16px",
            width: "36px",
            height: "36px",
            cursor: "pointer",
            zIndex: 10,
          }}
        />
      </div>
    </div>
  );
};

export default MapInlineForIntro;
