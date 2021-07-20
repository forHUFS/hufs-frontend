import React, { useState, useEffect } from 'react';
import KaKaoMap from './KakaoMap';
import Card from './Card.js';
import SearchBar from './SearchBar.js';
import MapNavi from '../MapNavi';
import Rank from './Rank'
import sdata from './mapData/review-mock.json'
import MoreRank from './MoreRank';
import RecentReview from './RecentReview';
import useResponsive from '../../../hooks/useResponsive'

import { Button, Modal } from 'antd';

const MapContainer = ({ match }) => {
  const [reviewData,setReviewData] = useState();
  const [data, setData] = useState();
  const [lat, setLat] = useState(37.59732049638715); // default 서울캠
  const [lng, setLng] = useState(127.0588283395548);
  const [keyword, setKeyword] = useState('');
  const [ishidden, setIshidden] = useState(false);

  const [mdata, setMdata] = useState(sdata);
  const [sortt, setSortt] = useState();
  const { isMobile,Mobile, Default } = useResponsive();
  
  const _ = require("lodash"); 
  const [ranker, setRanker] = useState();
  
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
    for (var i = 0; i < data.data.length; i++) {
      if (data.data[i].reviewAverage == null) {
        data.data[i].reviewAverage = (0).toFixed(1);
      }
    }
    
    setIshidden(true)
    const orderBy = _.orderBy(data.data, ['reviewAverage'], ['desc']);
    setRanker(orderBy);
  }
  
   function sortReviewByAsc() {
     setIshidden(true)
    const orderBy = _.orderBy(data.data, ['reviewCount'], ['desc']);
    setRanker(orderBy);
  }

  useEffect(() => {
    const orderBy = _.orderBy(mdata.data, ['createdAt'], ['desc']);
   setSortt(orderBy);

  }, [])

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  if (isMobile) {
    return(
      <>
      <div className="Map">
      

      <MapNavi setData={setData} setLng={setLng} setLat={setLat} setKeyword={setKeyword} setReviewData={setReviewData} />
      <div className="Map-main" style = {{left:'3%', padding:'10px'}}>
        <div id="KaKaoMap">
          <KaKaoMap  lat={lat} lng={lng} />
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
      <div className="Map-bottom" style = {{padding:'10px'}}>

        <div className="Rank-list">
          <h2>음식점 랭킹</h2>
          <Button size='small' onClick={() => sortScoreByAsc()}>별점 높은 순</Button> &nbsp;&nbsp;&nbsp;
      <Button size='small' onClick={() => sortReviewByAsc()}>리뷰 많은 순</Button> <h6>버튼을 클릭해주세요!</h6>
          {ranker?.map((d, index) => {
            if (index < 5) {
              return <Rank id="bb" {...d} key={index} index={index} match={match} />
                          }

                        }
                        

           
          )}
            {ishidden && (
        <Button type="primary" onClick={showModal}>
        더보기
        </Button>
      )}
          {/* <Button type="primary" onClick={showModal}>
      더보기
      </Button> */}
      <Modal visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
      {ranker?.map((d, index) => ( <MoreRank id="bb" {...d} key={index} index={index} match={match} /> ))
                          

                        }
                        </Modal>
        </div>
        <div className="Last-review" style = {{left:'40%'}}>
          <h2>최신순 리뷰</h2>
          {sortt?.map((d, index) => {
            if (index < 3) {
              return <RecentReview id="cc" {...d} key={index} index={index} match={match} />
                          }

                        }
                        

           
          )}

        </div>




      </div>
      
    </div>
      </>
    )
  }

  return (
    <div className="Map">
      

      <MapNavi setData={setData} setLng={setLng} setLat={setLat} setKeyword={setKeyword} setReviewData={setReviewData}/>
      
      <Default>


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
<Button size='small' onClick={() => sortReviewByAsc()}>리뷰 많은 순</Button> <h6>버튼을 클릭해주세요!</h6>
    {ranker?.map((d, index) => {
      if (index < 5) {
        return <Rank id="bb" {...d} key={index} index={index} match={match} />
                    }

                  }
                  

     
    )}
      {ishidden && (
  <Button type="primary" onClick={showModal}>
  더보기
  </Button>
)}
    {/* <Button type="primary" onClick={showModal}>
더보기
</Button> */}
<Modal visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
{ranker?.map((d, index) => ( <MoreRank id="bb" {...d} key={index} index={index} match={match} /> ))
                    

                  }
                  </Modal>
  </div>
  <div className="Last-review">
    <h2>최신순 리뷰</h2>
    {sortt?.map((d, index) => {
      if (index < 3) {
        return <RecentReview id="cc" {...d} key={index} index={index} match={match} />
                    }

                  }
                  

     
    )}

  </div>




</div>
</Default>

    </div>

  );

};

export default MapContainer;
