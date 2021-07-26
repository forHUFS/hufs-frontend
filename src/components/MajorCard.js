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
        // extra={<Link to={`${match.path}/${major.단과대학}`}>이동</Link>}
        style={{ width: '170px', marginBottom: '16px' }}
      >
        {major.전공.map((e) => (
          <Tooltip title={e} placement="left">
            <div
              style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              <Link
                style={{ textDecoration: 'none' }}
                to={`${match.path}/${e}`}
              >
                {e}
              </Link>
            </div>
          </Tooltip>
        ))}
      </Card>
    </>
  );
}

export default MajorCard;
