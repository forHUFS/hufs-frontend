import React, { useState } from 'react';
import useMainMajor from '../../hooks/useMainMajor';

import MajorCard from '../../components/MajorCard';
import useResponsive from '../../hooks/useResponsive';
import { Input, Spin } from 'antd';
import PostSub from '../../components/post/PostSub';

function MajorList(props) {
  const { mainMajor, isLoading } = useMainMajor();
  const { Mobile, Default } = useResponsive();
  const [campus, setCampus] = useState(1); // 1: seoul, 2: global

  if (isLoading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Spin
          style={{ paddingTop: 300 }}
          tip="전공목록을 불러오는 중입니다"
        ></Spin>
      </div>
    );
  }
  const selectedCampus = mainMajor.filter((major) => major.campusId === campus);
  return (
    <>
      <Mobile>
        <div style={{ height: 100 }}></div>
        <div
          style={{
            textAlign: 'center',
            margin: '12px',
          }}
        >
          <a onClick={(e) => setCampus(1)}> 서울 </a>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <a onClick={(e) => setCampus(2)}> 글로벌 </a>
          {/* <Input
            type="text"
            style={{
              height: 30,
              width: 120,
              float: 'right',
            }}
            placeholder="전공 검색"
            onChange={(e) => console.log(e.target.value)}
          /> */}
        </div>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
          }}
        >
          {selectedCampus.map((major) => {
            return <MajorCard major={major} match={props.match} />;
          })}
        </div>
      </Mobile>
      <Default>
        <div className="community-main" style={{
          height: '1000px'
        }}>
          <PostSub match={props.match} />
          <div
            style={{
              textAlign: 'center',
              margin: '12px',
            }}
          >
            <a onClick={(e) => setCampus(1)}> 서울 </a>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <a onClick={(e) => setCampus(2)}> 글로벌 </a>
          </div>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-around',
            }}
          >
            {selectedCampus.map((major) => {
              return <MajorCard major={major} match={props.match} />;
            })}
          </div>
        </div>
      </Default>
    </>
  );
}

export default MajorList;
