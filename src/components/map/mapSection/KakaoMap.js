import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const { kakao } = window;

const KakaoMap = ({ lat, lng }) => {
  const dispatcher = useDispatch();

  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(lat, lng),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);



  }, [lat, lng]);



  return <div id="map" />;
}

export default KakaoMap;

