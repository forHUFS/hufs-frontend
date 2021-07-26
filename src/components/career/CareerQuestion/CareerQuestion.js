import React,{useState,useEffect} from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import { PUBLIC_IP } from '../../../config';
import user from '../data/mock-data.json'
import {Button,PageHeader} from 'antd';
import MaterialTable from "material-table";
import useResponsive from '../../../hooks/useResponsive'

function CareerQuestion({history,match}) {
  const { isMobile, Default, Mobile } = useResponsive();
  const user1 = user.data;
    const [list, setList] = useState(user1);
    var columns = [
    
      {
        title: "번호", field: "id", headerStyle: {
          color : '#030a66',fontWeight: 'bold'
        }
    },
      {
          title: "제목", field: "title", render: rowData => <Link to={`/board/취창업공간/질문/view/${rowData.id}`}>{rowData.title}</Link>,
          headerStyle: {
            color : '#030a66',fontWeight: 'bold'
          }
      },
      {
          title: "작성자", field: "User.nickname", headerStyle: {
            color : '#030a66',fontWeight: 'bold'
          }
      },
      {
          title: "작성일", field: "createdAt", render: rowData => <div>{rowData.createdAt
            ? rowData.createdAt.slice(0, 10)
            : 'none'}</div>,
            headerStyle: {
              color : '#030a66',fontWeight: 'bold'
            }
      }
  ];

    if (isMobile) {
      columns = [
    
        
        {
            title: "제목", field: "title", render: rowData => <Link to={`/board/취창업공간/질문/view/${rowData.id}`}>{rowData.title}</Link>,
            headerStyle: {
              color : '#030a66',fontWeight: 'bold'
            }
        },
       
    ];

    } else {
      columns = [
    
        {
          title: "번호", field: "id", headerStyle: {
            color : '#030a66',fontWeight: 'bold'
          }
      },
        {
            title: "제목", field: "title", render: rowData => <Link to={`/board/취창업공간/질문/view/${rowData.id}`}>{rowData.title}</Link>,
            headerStyle: {
              color : '#030a66',fontWeight: 'bold'
            }
        },
        {
            title: "작성자", field: "User.nickname", headerStyle: {
              color : '#030a66',fontWeight: 'bold'
            }
        },
        {
            title: "작성일", field: "createdAt", render: rowData => <div>{rowData.createdAt
              ? rowData.createdAt.slice(0, 10)
              : 'none'}</div>,
              headerStyle: {
                color : '#030a66',fontWeight: 'bold'
              }
        }
    ];

    }
   

    
    

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
            <Mobile>
            <div  style={{float:'left'}}>
            <PageHeader
        title={'질문'}
      /></div> 
   <div>
      
      <MaterialTable

          columns={columns}
          data={list}
          options={{
            showTitle: false,
            minBodyHeight:'300px'
       }}
       style={{
        marginTop:'110px',
        height:'500px',
        width:'450px',
        right:'200px',
        marginLeft:'220px'
      
       }}
     >
       
     </MaterialTable>
     <div> <Button
      style={{  marginTop: 20, marginLeft: 180 }}
      /* onClick = {()=>{
        history.push({
          pathname: `/질문/write`,
          state: { detail: match.params.id },
        });
      }} */
    >
<Link to="/board/취창업공간/질문/write">
        글 작성
        </Link>
    </Button></div> 
     </div>
            </Mobile>
            <Default>
            <div>
            <PageHeader
        title={'질문'}
      /></div> 
      
      <MaterialTable

          columns={columns}
          data={list}
          options={{
            showTitle: false,
            minBodyHeight:'500px'
       }}
       style={{
        marginTop:'30px',
        marginLeft: '180px',
        marginRight: '20px',
        height:'500px',
        width:'800px'
       }}
     >
       
     </MaterialTable>
     <div> <Button
     style={{  marginLeft: '70%', marginTop: 20 }}
      /* onClick = {()=>{
        history.push({
          pathname: `${match.params.id}/질문/write`,
          state: { detail: match.params.id },
        });
      }} */
    >
      
           <Link to="/board/취창업공간/질문/write">
        글 작성
        </Link>
    </Button></div>
            
            
        
            {/* <div className='List'>
      
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
                      <div> <Link to ={`/board/취창업공간/질문/view/${el.id}`}>{el.title} </Link></div>
                      <div> {el.User.nickname}</div>
                      <div className='acenter'> {el.createdAt
                                ? el.createdAt.slice(0, 10)
                                : 'none'} </div>
                    </div>
                  )
                })
                  : null }
            </div> */}
            </Default>
            </>
      
      
      
      )
    

}

export default CareerQuestion;