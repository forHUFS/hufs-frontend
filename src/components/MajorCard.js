import { Card, Tooltip } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
function MajorCard({ major, match }) {
  return (
    <>
      <Card
        size="small"
        title={
          <Tooltip
            title={major.전공.map((m) => (
              <div>{m}</div>
            ))}
          >
            <span>{major.단과대학}</span>
          </Tooltip>
        }
        extra={<Link to={`${match.path}/${major.단과대학}`}>이동</Link>}
        style={{ width: '170px', marginBottom: '16px' }}
      ></Card>
    </>
  );
}

export default MajorCard;
