import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import useResponsive from '../../../hooks/useResponsive';

const { kakao } = window;

const KakaoMap = ({ lat, lng }) => {
  const dispatcher = useDispatch();
  const { isMobile, Mobile, Default } = useResponsive();

  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(lat, lng),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);
  }, [lat, lng]);

  if (isMobile) {
    return <div id="map" style={{ height: '400px' }} />;
  }

  return <div id="map" />;
};

export default KakaoMap;
