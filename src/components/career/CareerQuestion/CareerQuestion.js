import React,{useState,useEffect} from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import { PUBLIC_IP } from '../../../config';
import mdata from '../data/mock-data.json'
import {Button,PageHeader} from 'antd';
function CareerQuestion() {
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
            <PageHeader
        title={'질문'}
      />
            <Button
           style={{  marginLeft: '70%', marginTop: 20 }}
        >
          <Link to="/career/careerQuestion/write">
    글 작성
        </Link>
        </Button>
            
            <div className='List'>
      
              <div className='list_grid list_tit'>
                <div> 번호</div>
                <div> 제목 </div>
                <div> 작성자 </div>
                <div className='acenter'> 작성일 </div>
              </div>
      
                {list ? list.map( (el, key) => {
                  return(
                    <div className='list_grid list_data' key={key}>
                      <div>{el.id}</div>
                      <div> <Link to ={`/career/careerQuestion/view/${el.id}`}>{el.title} </Link></div>
                      <div> {el.User.nickname}</div>
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

export default CareerQuestion;