// src/pages/map/SomMapOnly.jsx
import React, { useEffect, useState, useRef } from "react";
import { Map, MapMarker, CustomOverlayMap } from "react-kakao-maps-sdk";

const SomMapOnly = () => {
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
        const { latitude, longitude } = position.coords;
        const current = { lat: latitude, lng: longitude };
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
      setSomList(result.data);
    } catch (error) {
      console.error("솜 데이터를 불러오는 데 실패했습니다:", error);
    }
  };

  useEffect(() => {
    fetchMyLocation();
    fetchSomList();
  }, []);

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
            imageUrl: som.somImageList?.[0]?.somImagePath || null,
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

  if (!isLoaded || !center) return null;

  return (
    <div
      style={{
        width: "430px",
        height: "932px",
        borderRadius: "50px",
        overflow: "hidden",
        backgroundColor: "#FFFFFF",
        boxShadow: "0 15px 22px rgba(0, 0, 0, 0.1)",
        position: "relative",
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
            position={myLocation}
            image={{
              src:
                process.env.PUBLIC_URL +
                "/assets/icons/mapUserMarker.png",
              size: { width: 60, height: 100 },
            }}
          />
        )}

        {markers.map((marker) => (
          <React.Fragment key={marker.id}>
            <MapMarker
              position={{ lat: marker.latitude, lng: marker.longitude }}
              image={{
                src:
                  process.env.PUBLIC_URL +
                  "/assets/icons/mapSomMarker.png",
                size: { width: 60, height: 100 },
              }}
              onClick={() =>
                handleMarkerClick(
                  marker.id,
                  marker.latitude,
                  marker.longitude
                )
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

      <img
        src={process.env.PUBLIC_URL + "/assets/icons/somfavicon.png"}
        alt="내 위치로 이동"
        onClick={() =>
          myLocation && moveToLocation(myLocation.lat, myLocation.lng)
        }
        style={{
          position: "absolute",
          bottom: "24px",
          right: "24px",
          width: "40px",
          height: "40px",
          cursor: "pointer",
        }}
      />
    </div>
  );
};

export default SomMapOnly;
