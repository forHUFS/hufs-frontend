import React from 'react';
import { Button } from 'antd';
import { useHistory } from 'react-router-dom';
import star from './mapData/star.png';
import useResponsive from '../../../hooks/useResponsive';

const Rank = ({ name, id, index, reviewCount, reviewAverage, match }) => {
  const { isMobile, Mobile, Default } = useResponsive();
  const history = useHistory();

  return (
    <>
      <Mobile>
        <hr className="Rank-hr" style={{ width: '70%' }} />

        <div className="Rank-list">
          <p
            onClick={(e) => {
              // map/info -> map/info/:name 24시해장국
              history.push({
                // map/info/:name/24시해장국/reviewpage
                pathname: `${match.path}/store/review/${id}/ReviewPage`,
                state: {
                  id: id,
                  name: name,
                },
              });
            }}
          >
            {index + 1}등{' '}
            <Button size="small" type="link">
              {name}
            </Button>{' '}
            <img src={star}></img>
            {reviewAverage} ({reviewCount}){' '}
          </p>
        </div>
      </Mobile>
      <Default>
        <hr className="Rank-hr" />

        <div className="Rank-list">
          <p
            onClick={(e) => {
              // map/info -> map/info/:name 24시해장국
              history.push({
                // map/info/:name/24시해장국/reviewpage
                pathname: `${match.path}/store/review/${id}/ReviewPage`,
                state: {
                  id: id,
                  name: name,
                },
              });
            }}
          >
            {index + 1}등{' '}
            <Button size="small" type="link">
              {name}
            </Button>{' '}
            <img src={star}></img>
            {reviewAverage} ({reviewCount}){' '}
          </p>
        </div>
      </Default>
    </>
  );
};

export default Rank;
