import React from 'react';
import {  Button } from 'antd';
import { useHistory } from 'react-router-dom';
import star from './mapData/star.png'


const Rank = ({name,id,index,count,score,match}) => {
    const history = useHistory();
    
     return (
        <>
        <hr className = 'Rank-hr'/>
    
          <div className = 'Rank-list'>
                <p  onClick={(e) => {
                  // map/info -> map/info/:name 24시해장국
                  history.push({
                    // map/info/:name/24시해장국/reviewpage
                    pathname: `${match.path}/info/${id}/ReviewPage`,
                    state: {
                      id: id,
                      name: name,
                    },
                  });
                }}>{index+1}등  <Button size = 'small' type="link">{name}</Button> <img src={star} ></img>{score} ({count}) </p>
                
          </div>
        </>
    );

}

export default Rank;