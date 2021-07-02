import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Card, Button, Typography } from 'antd';
import { useHistory, withRouter, useLocation } from 'react-router-dom';
import icon_rstrn from './mapData/icon_rstrn.png';
import star from './mapData/star.png';
import { reviewDetail } from '../../../_actions/reviewPost_action';
const { kakao } = window;
const { Text, Title } = Typography;


const Rstrn = ({
  id,
  name,
  numAddress,
  StoreSubCategory,
  HouseCategory,
  roadAddress,
  lat,
  long,
  match,
}) => {
  // 백엔드 에서 데이터 받을떄 StoreSubCategory 말고 HouseCategory ? 로 받자

  const dispatch = useDispatch();
  const [state, setstate] = useState();
  const history = useHistory();



  const getMarker = async () => {
    dispatch(reviewDetail(id))
      .then((response) => {

        if (response.payload.average === null) {
          displayMarker(parseFloat(0).toFixed(1), response.payload.count);
        }
        else {
          displayMarker(response.payload.average, response.payload.count);

        }
      })
      .catch(((error) => {
        switch (error.response?.status) {
          case 401:
            alert('로그인을 하시면 서비스 이용이 가능합니다.')
            break;
          case 403:
            alert('접근 권한 오류')
            break;
          default:
            break;
        }
      }));
  };


  var map = state;
  var markers = [];

  function displayMarker(average, count) {
    //hideMarkers(markers);

    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(37.59732049638715, 127.05882833955489), // 한국외대 설캠
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);
    setstate(map);

    if (map.getLevel() >= 3) {
      map.setLevel(3);
      map.panTo(new kakao.maps.LatLng(lat + 0.001, long));
    } else if (map.getLevel() === 2) {
      map.panTo(new kakao.maps.LatLng(lat + 0.0005, long));
    } else {
      map.panTo(new kakao.maps.LatLng(lat + 0.0003, long));
    }

    var customOverlay1 = new kakao.maps.CustomOverlay({
      map: map,
      position: new kakao.maps.LatLng(lat, long),
      content: content,
      yAnchor: 1,
    });



    var content = document.createElement('div');
    content.className = 'wrap'; //

    var content1 = document.createElement('div');
    content1.className = 'info';

    var content2 = document.createElement('div');
    content2.className = 'title';

    content2.appendChild(document.createTextNode(name));

    var content3 = document.createElement('div');
    content3.className = 'close';
    content3.title = '닫기';
    content3.onclick = function () {
      customOverlay1.setMap(null);
    };
    content2.appendChild(content3);
    content1.appendChild(content2);

    var content4 = document.createElement('div');
    content4.className = 'body';

    var content5 = document.createElement('div');
    content5.className = 'img';

    var content11 = document.createElement('img');
    content11.src = icon_rstrn;
    content11.width = '73';
    content11.height = '70';

    content5.appendChild(content11);
    content4.appendChild(content5);

    var content6 = document.createElement('div');
    content6.className = 'desc';

    var content7 = document.createElement('div');
    content7.className = 'ellipsis';
    content7.appendChild(document.createTextNode(name));

    content6.appendChild(content7);

    var content8 = document.createElement('div');
    content8.className = 'jibun ellipsis';
    //content8.appendChild(document.createTextNode(roadAddress));

    var content9 = document.createElement('div');
    var content10 = document.createElement('button');
    content10.className = 'link';
    content10.appendChild(document.createTextNode('리뷰 보기'));
    content10.onclick = function () {
      goReview();
    };
    var content12 = document.createElement('img');
    content12.src = star;
    content12.width = '15';
    content12.height = '15';


    var content13 = document.createTextNode(
      ' ' + average + ' (' + count + ') ',
    );


    content9.appendChild(content12);
    content9.appendChild(content13);

    content9.appendChild(content10);

    content6.appendChild(content8);

    content6.appendChild(content9);

    content6.appendChild(content8);

    content6.appendChild(content9);

    content4.appendChild(content6);

    content1.appendChild(content4);
    content.appendChild(content1);

    customOverlay1.setContent(content);



    // 마커 이미지의 이미지 크기 입니다
    //var imageSize = new kakao.maps.Size(30, 35);
    // 마커 이미지를 생성합니다
    //var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
    // 마커를 생성합니다
    var marker = new kakao.maps.Marker({
      //map: map, // 마커를 표시할 지도
      position: new kakao.maps.LatLng(lat, long), // 마커를 표시할 위치
      title: name, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
      //image: markerImage // 마커 이미지
    });

    // 마커에 클릭이벤트를 등록합니다
    kakao.maps.event.addListener(marker, 'click', function () {
      // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
      if (map.getLevel() >= 3) {
        map.setLevel(3);
        map.panTo(new kakao.maps.LatLng(lat + 0.001, long));
      } else if (map.getLevel() === 2) {
        map.panTo(new kakao.maps.LatLng(lat + 0.0005, long));
      } else {
        map.panTo(new kakao.maps.LatLng(lat + 0.0003, long));
      }
      customOverlay1.setMap(map);
    });

    markers.push(marker);
    marker.setMap(map);
  }


  const goReview = (e) => {
    // map/info -> map/info/:name 24시해장국
    history.push({
      // map/info/:name/24시해장국/reviewpage   
      pathname: `${match.path}/store/review/${id}/ReviewPage`,
      state: {
        id: id,
        name: name,
      },
    });
  }
  const houseReview = () => {
    history.push({
      pathname: `${match.path}/house/review/${id}/ReviewPage`,
      state: {
        id: id
      }
    })
  }

  const houseTrade = () => {
    history.push({
      pathname: `${match.path}/house/tradee/${id}/TradePage`,
      state: {
        id: id
      }
    })
  }

/*   const goReview = (e) => {
    // map/info -> map/info/:name 24시해장국
    history.push({
      // map/info/:name/24시해장국/reviewpage
      pathname: `${match.path}/info/${id}/ReviewPage`,
      state: {
        id: id,
        name: name,
      },
    });
  } */

  return (

    <div>
      <div>
        {StoreSubCategory !== undefined ?
          (
            <Card size="small" style={{ width: 300 }}>
              <Title level={5}>{name}</Title>
              <h6>{StoreSubCategory?.name}</h6>
              <h5 className="Card-h5">{roadAddress}</h5>
              <Button size="small" onClick={getMarker}>
                위치 확인
            </Button>
            </Card>
          )
          :
          (
            <Card size="small" style={{ width: 300 }}>
              <Title level={5}>{name}</Title>
              <h5 className="Card-h5">{roadAddress}</h5>
              <Button size="small" onClick={houseReview}>
                리뷰 공간
            </Button>
              <Button size="small" onClick={houseTrade}>
                거래 공간
            </Button>
            </Card>
          )
        }
      </div>
    </div>

    /* jshint ignore:end */
  );
};
export default withRouter(Rstrn);
