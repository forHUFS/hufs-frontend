import React, { useState } from 'react';
import useMainMajor from '../../hooks/useMainMajor';

import MajorCard from '../../components/MajorCard';

function MajorList(props) {
  const { mainMajor, isLoading } = useMainMajor();
  const [campus, setCampus] = useState(1); // 1: seoul, 2: global
  if (isLoading) {
    return <>Loading</>;
  }
  const selectedCampus = mainMajor.filter((major) => major.campusId === campus);
  return (
    <>
      <div className="community-main">
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
    </>
  );
}

export default MajorList;
