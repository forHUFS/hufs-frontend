import React from 'react';
import { useHistory } from 'react-router-dom';


const MoreRank = ({name,id,index,reviewCount,reviewAverage,match}) => {
    const history = useHistory();
    
     return (
        <>
        <hr className = 'Rank-hr'/>
    
          <div className = 'Rank-morelist'>
              <div>
              {index+1}등
                <p onClick={(e) => {
                  // map/info -> map/info/:name 24시해장국
                  history.push({
                    // map/info/:name/24시해장국/reviewpage
                    pathname: `${match.path}/info/${id}/ReviewPage`,
                    state: {
                      id: id,
                      name: name,
                    },
                  });
                }}>  {name}  </p>
                {reviewAverage} ({reviewCount})
                </div>
                
          </div>
        </>
    );

}

export default MoreRank;