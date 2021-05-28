import React, { useState, useEffect } from 'react';
import KaKaoMap from './KakaoMap';
import Card from './Card.js';
import SearchBar from './SearchBar.js';
import mapboo from '../../../image/boo/mapboo.png';
import { Button } from 'antd';
import axios from 'axios'
import { PUBLIC_IP } from '../../../config';



const MapContainer = ({ match }) => {
  const [data, setData] = useState();
  const [lat, setLat] = useState(37.59732049638715); // default 서울캠
  const [lng, setLng] = useState(127.0588283395548);
  const [keyword, setKeyword] = useState('');
  const [seoul, setSeoul] = useState();
  const [global, setGlobal] = useState();
  var check = true;


  useEffect(async () => {
    // const seoul = 
    axios.get(`${PUBLIC_IP}/store/seoul`)
      .then((res) => {
        setData(res.data);
        setSeoul(res.data)

      })


  }, [])
  useEffect(async () => {
    // const global = 
    axios.get(`${PUBLIC_IP}/store/global`)
      .then((res) => setGlobal(res.data))
    // setGg(global)
  }, [])
  //  초기에 한번씩만 받기위해
  // console.log(data)



  const handleValueChange = (e) => {
    setKeyword(e.target.value);
  }

  const searchData = (data) => {
    data = data?.data?.filter((c) => {
      return c.name.toLowerCase().indexOf(keyword) > -1;
    });
    return data?.map((d, index) => {
      return <Card id="aa" {...d} key={index} match={match} />
    }
    );

  }

  if (keyword == '') {
    searchData(data);
  }

  const fold = (e) => {
    if (check === true) {
      check = false
      document.getElementById('itemContainer').style.display = 'none';
      document.getElementById('itemContainer').style.backgroundColor = 'none';
      document.getElementById('Food-list').style.overflowY = 'hidden';
      document.getElementById('itemState').textContent = '보기';
    }
    else {
      check = true;
      document.getElementById('itemContainer').style.display = 'block';
      document.getElementById('itemContainer').style.backgroundColor = 'white';
      document.getElementById('Food-list').style.overflowY = 'scroll'
      document.getElementById('itemState').textContent = '접기';

    }

  }



  return (
    <div className="Map">
      <div className="Map-left">
        <div className="content" >

          <div id="seoul" defaultSelectedKeys={['1']}
            onClick={(e) => {
              setData(seoul);
              setKeyword('')
              setLat(37.59732049638715);
              setLng(127.0588283395548)
            }}>
            <div type="text" id="button-head" key="1">Seoul</div>
            <Button type="text"  >맛집 공간</Button>

          </div>
          <hr className="line" />
          <div id="global" defaultSelectedKeys={['2']}>
            <div type="text" id="button-head" key="2">Global</div>
            <Button type="text" onClick={(e) => {
              setData(global);
              setKeyword('')
              setLat(37.336538181222245);
              setLng(127.25253858610613);
            }}>맛집 공간</Button>

          </div>

        </div>
        <div className="map-boo">
          <img src={mapboo} alt="숨어 있는 부" />
        </div>
      </div>
      <div className="up-down" />
      <div className="Map-main">
        <div id="KaKaoMap">
          <KaKaoMap lat={lat} lng={lng} />
        </div>
        <div id="Food-list">
          <div className="Food-head">
            <SearchBar
              placeholder="Search (영어는 소문자로)"
              value={keyword}
              onChange={handleValueChange}
              style={{ width: '100 %' }}

            />
            <span
              id="itemState"
              onClick={fold}
            >접기</span>
          </div>
          <div
            id="itemContainer"

          >
            {data?.data ? searchData(data) :
              data?.data?.map((d, index) => (
                <Card id="aa" {...d} key={index} match={match} />
              ))}
          </div>
        </div>
      </div>

    </div>

  );

};

export default MapContainer;
