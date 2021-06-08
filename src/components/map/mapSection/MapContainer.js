import React, { useState, useEffect } from 'react';
import KaKaoMap from './KakaoMap';
import Card from './Card.js';
import SearchBar from './SearchBar.js';
import MapNavi from '../MapNavi';
import Rank from './Rank'
import sdata from './mapData/sdata.json';

import { Button } from 'antd';

const MapContainer = ({ match }) => {
  const [data, setData] = useState();
  const [lat, setLat] = useState(37.59732049638715); // default 서울캠
  const [lng, setLng] = useState(127.0588283395548);
  const [keyword, setKeyword] = useState('');

  const _ = require("lodash");
  const [ranker, setRanker] = useState(sdata.data);


  var check = true;

  const handleValueChange = (e) => {
    setKeyword(e.target.value);
  }

  /* function handleSort() {
    const newArray2 = [...data];
    setSortData( newArray2.sort() );
} */

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


  function sortScoreByAsc() {
    const orderBy = _.orderBy(ranker, ['score'], ['desc']);
    setRanker(orderBy);
    console.log(ranker)
  }

  function sortReviewByAsc() {
    const orderBy = _.orderBy(ranker, ['count'], ['desc']);
    setRanker(orderBy);
    console.log(ranker)
  }



  return (
    <div className="Map">

      <MapNavi setData={setData} setLng={setLng} setLat={setLat} setKeyword={setKeyword} />

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
      <div className="Map-bottom">

        <div className="Rank-list">
          <h2>음식점 랭킹</h2>
          <Button size='small' onClick={() => sortScoreByAsc()}>별점 높은 순</Button> &nbsp;&nbsp;&nbsp;
      <Button size='small' onClick={() => sortReviewByAsc()}>리뷰 많은 순</Button>
          {ranker?.map((d, index) => (
            <Rank id="bb" {...d} key={index} index={index} match={match} />
          ))}
        </div>
        <div className="Last-review">

        </div>




      </div>

    </div>

  );

};

export default MapContainer;
