import React from 'react';
import {  Rate } from 'antd';
import { useHistory } from 'react-router-dom';
import star from './mapData/star.png'


const Rank = ({title,content,score,createdAt,storeId,User,index,storeName,match}) => {
    const history = useHistory();
    
     return (
        <>
        <hr className = 'Rank-hr'/>
    
          <div className = 'Recent-list'>
              <p className = 'Rank-nickname'>{User.nickname}</p>
                <p className = 'Rank-storename' onClick={(e) => {
                  // map/info -> map/info/:name 24시해장국
                  history.push({
                    // map/info/:name/24시해장국/reviewpage
                    pathname: `${match.path}/info/${storeId}/ReviewPage`,
                    state: {
                      id: storeId
                    },
                  });
                }}>{storeName}  </p> {content}
                <br></br>
                 <Rate disabled allowHalf value={score} />
                <h6> {createdAt.slice(0, 10)}</h6>
                
          </div>
        </>
    );

}

export default Rank;