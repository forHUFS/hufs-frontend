import React,{useState,useEffect} from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import { PUBLIC_IP } from '../../../config';
import mdata from '../data/mock-data.json'
import Category from './Category';

function CareerReview() {
    const [list, setList] = useState(mdata.data);
    const [state,setState] = useState({page:1, limit:10})
   
    
    

    /* const _getListData = async function() {
        const data_list = await axios(`${PUBLIC_IP}/board/${8}`, {
          method : 'GET',
          headers: new Headers()
        })
    
        setData(data_list)
      }
      console.log(data); */

      
useEffect(() => {
    /* _getListData() */
 }, [])

  
        return (
            <>
            <Category/>
            <Link to="/career/careerReviewWrite">
        write
        </Link>
            <div className='List'>
      
              <div className='list_grid list_tit'>
                <div> 제목 </div>
                <div> 조회수 </div>
                <div className='acenter'> 날짜 </div>
              </div>
      
                {list ? list.map( (el, key) => {
                  return(
                    <div className='list_grid list_data' key={key}>
                      <div> <Link to ={`/career/view/${el.id}`}>{el.title} </Link></div>
                      <div> </div>
                      <div className='acenter'> {el.createdAt
                                ? el.createdAt.slice(0, 10)
                                : 'none'} </div>
                    </div>
                  )
                })
                  : null }
            </div>
            </>
      
      
      
      )
    

}

export default CareerReview;