import React from 'react';
import { Rate } from 'antd';
import { useHistory } from 'react-router-dom';

const MoreRank = ({
  title,
  content,
  score,
  createdAt,
  storeId,
  User,
  index,
  Store,
  match,
}) => {
  const history = useHistory();

  return (
    <>
      <hr className="Rank-hr" />

      <div
        className="Recent-morelist"
        style={{ width: '180px', margin: '0px  auto' }}
      >
        <p className="Rank-nickname">{User.nickname}</p>
        <p
          className="Rank-storename"
          style={{ lineHeight: '1.5' }}
          onClick={(e) => {
            // map/info -> map/info/:name 24시해장국
            history.push({
              // map/info/:name/24시해장국/reviewpage
              pathname: `${match.path}/store/review/${storeId}/ReviewPage`,
              state: {
                id: storeId,
              },
            });
          }}
        >
          {Store.name}{' '}
        </p>
        <div dangerouslySetInnerHTML={{ __html: content }}></div>
        <br></br>
        <Rate disabled defaultValue={score} />
        <h6> {createdAt.slice(0, 10)}</h6>
      </div>
    </>
  );
};

export default MoreRank;
