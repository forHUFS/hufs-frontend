import React, { useState } from 'react';
import useMainMajor from '../../hooks/useMainMajor';
import majorCategory from './majorCategory.json';
import MajorCard from '../../components/MajorCard';
import useResponsive from '../../hooks/useResponsive';
import { Input, Spin } from 'antd';
import PostSub from '../../components/post/PostSub';

function MajorList(props) {
  const { firstMajor, isLoading } = useMainMajor();
  const { Mobile, Default } = useResponsive();

  const [campus, setCampus] = useState('서울캠퍼스'); // 1: seoul, 2: global, 3: 융합

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
  const selectedCampus = majorCategory.filter(
    (category) => category.캠퍼스 === campus,
  );
  const seoulCampus = majorCategory.filter(
    (category) => category.캠퍼스 === '서울캠퍼스',
  );
  const globalCampus = majorCategory.filter(
    (category) => category.캠퍼스 === '글로벌캠퍼스',
  );
  const yunghapMajor = majorCategory.filter(
    (category) => category.캠퍼스 === '융합전공',
  );
  // const selectedCampus = firstMajor.filter((major) => major.campusId === campus);
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
          <a onClick={(e) => setCampus('서울캠퍼스')}> 서울 </a>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <a onClick={(e) => setCampus('글로벌캠퍼스')}> 글로벌 </a>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <a onClick={(e) => setCampus('융합전공')}> 융합전공 </a>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {selectedCampus.map((major) => {
              return <MajorCard major={major} match={props.match} />;
            })}
          </div>
        </div>
      </Mobile>
      <Default>
        <div
          className="community-main"
          style={{
            height: '1000px',
          }}
        >
          <PostSub match={props.match} />
          <div
            style={{
              textAlign: 'center',
              margin: '12px',
            }}
          >
            <a onClick={(e) => setCampus('서울캠퍼스')}> 서울 </a>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <a onClick={(e) => setCampus('글로벌캠퍼스')}> 글로벌 </a>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <a onClick={(e) => setCampus('융합전공')}> 융합전공 </a>
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
