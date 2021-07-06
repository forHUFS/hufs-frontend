import { Card, Tooltip } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
function MajorCard({ major, match }) {
  return (
    <>
      <Card
        size="small"
        title={
          <Tooltip title={major.name}>
            <span>{major.name}</span>
          </Tooltip>
        }
        extra={<Link to={`${match.path}/${major.name}`}>이동</Link>}
        style={{ width: '170px', marginBottom: '16px' }}
      >
        {/* <p>{major.id}</p>
        <p>{major.campusId}</p> */}
      </Card>
    </>
  );
}

export default MajorCard;
