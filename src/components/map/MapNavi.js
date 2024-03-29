import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PUBLIC_IP } from '../../config';
import mapboo from '../../image/boo/mapboo.png';
import { Button } from 'antd';
import { withRouter } from 'react-router';
// import housemock from './mapSection/mapData/housemock.json'

function MapNavi({
  setData,
  setLng,
  setLat,
  setKeyword,
  history,
  setReviewData,
}) {
  const [storeSeoul, setStoreSeoul] = useState();
  const [storeGlobal, setStoreGlobal] = useState();
  const [houseSeoul, setHouseSeoul] = useState();
  const [houseGlobal, setHouseGlobal] = useState();
  const [storeSeoulReview, setStoreSeoulReview] = useState();
  const [storeGlobalReview, setStoreGlobalReview] = useState();

  useEffect(async () => {
    axios
      .get(`${PUBLIC_IP}/store/1`) //seoul
      .then((res) => {
        setData(res.data);
        setStoreSeoul(res.data);
      });
    axios
      .get(`${PUBLIC_IP}/store/2`) //global
      .then((res) => {
        setStoreGlobal(res.data);
      });
    axios
      .get(`${PUBLIC_IP}/store/reviews/1`) //seoul
      .then((res) => {
        setReviewData(res.data);
        setStoreSeoulReview(res.data);
      });
    axios
      .get(`${PUBLIC_IP}/store/reviews/2`) //global
      .then((res) => {
        setStoreGlobalReview(res.data);
      });
    // axios.get(`${PUBLIC_IP}/house/global`)
    //     .then((res) => {
    //         setHouseSeoul(res.data)
    //     })
    // axios.get(`${PUBLIC_IP}/house/global`)
    //     .then((res) => {
    //         setHouseGlobal(res.data)
    //     })
  }, []);

  return (
    <>
      <div className="Map-left">
        <div className="content">
          <div id="seoul">
            <div type="text" id="button-head" key="1">
              Seoul
            </div>
            <Button
              type="text"
              onClick={(e) => {
                setData(storeSeoul);
                setReviewData(storeSeoulReview);
                setKeyword('');
                setLat(37.59732049638715);
                setLng(127.0588283395548);
              }}
            >
              맛집 공간
            </Button>
            {/* <Button type="text" onClick={() => {
                            setData(housemock)

                            setKeyword('')
                            setLat(37.59732049638715)
                            setLng(127.0588283395548)
                            // history.push('/3/house')
                        }}>주거 공간</Button> */}
          </div>
          <hr className="line" />
          <div id="global">
            <div type="text" id="button-head" key="2">
              Global
            </div>
            <Button
              type="text"
              onClick={(e) => {
                setData(storeGlobal);
                setReviewData(storeGlobalReview);
                setKeyword('');
                setLat(37.336538181222245);
                setLng(127.25253858610613);
              }}
            >
              맛집 공간
            </Button>
            {/* <Button type="text" onClick={() => {
                            setData(housemock)
                            setKeyword('')
                            setLat(37.336538181222245);
                            setLng(127.25253858610613);
                            //  history.push('/3/house')
                        }}>주거 공간</Button> */}
          </div>
        </div>
        <div className="map-boo">
          <img src={mapboo} alt="숨어 있는 부" />
        </div>
      </div>
    </>
  );
}
export default withRouter(MapNavi);
