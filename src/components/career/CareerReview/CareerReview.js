import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { PUBLIC_IP } from '../../../config';
import mdata from '../data/mock-data.json'
import CheckBox from './CheckBox';
import { Button, PageHeader, message } from 'antd';
import MaterialTable from "material-table";
import useResponsive from '../../../hooks/useResponsive'

import useBoard from '../../../hooks/useBoard'
import {
  careerList,
  postRemove,
} from '../../../_actions/reviewPost_action'
import { useDispatch } from 'react-redux';
import PostSub from '../../post/PostSub'


function CareerReview(props) {
  const dispatch = useDispatch();
  const { isMobile, Default, Mobile } = useResponsive();
  const [filtering, setFiltering] = useState({
    header: [],
  })
  const { board, isLoading, isError } = useBoard("취창업공간-후기");

  const mData = board;

  const [dataList, setDataList] = useState(mData);
  useEffect(() => {
    setDataList(board);
    /*  dispatch(careerList(props.location.pathname.substring(7,15)))
       .then((response) => {
         if (response.status === 200) {
           let result = response.payload.reverse();
           setList(result.data)
         }
       })
       .catch((error) => {
         switch (error.response?.status) {
           case 401:
             message.error('로그인하지 않은 사용자');
             props.history.push('/');
             break;
           case 403:
 
             message.error('접근 권한 오류');
             props.history.push('/');
             break;
           default:
             break;
         } */

  }, [board])
  //const [user1, setUser1] = useState([]); // result

  /*  useEffect(() => {
     dispatch(careerList("careerReview"))
       .then((response) => {
         if (response.status === 200) {
           let result = response.payload.reverse();
         setUser1(result.data);
 
         }
       })
       .catch((error) => {
         switch (error.response?.status) {
           case 401:
             message.error('로그인하지 않은 사용자');
             history.push('/');
             break;
           case 403:
 
             message.error('접근 권한 오류');
             history.push('/');
             break;
           default:
             break;
         }
       });
 
   }, []) */

  const columns = [

    {
      title: "번호", field: "id", headerStyle: {
        color: '#030a66', fontWeight: 'bold', paddingLeft: '5%'
      }
    },
    {
      title: "분야", field: "header", headerStyle: {
        color: '#030a66', fontWeight: 'bold'
      }
    },
    {
      title: "제목", field: "title", render: rowData => <Link to={`/취창업공간/취창업공간-후기/view/${rowData.id}`}>{rowData.title}</Link>,
      headerStyle: {
        color: '#030a66', fontWeight: 'bold', paddingLeft: '5%'
      }
    },
    {
      title: "작성자", field: "User.nickname", headerStyle: {
        color: '#030a66', fontWeight: 'bold', paddingLeft: '10%'
      }
    },
    {
      title: "작성일", field: "createdAt", render: rowData => <div>{rowData.createdAt
        ? rowData.createdAt.slice(0, 10)
        : 'none'}</div>,
      headerStyle: {
        color: '#030a66', fontWeight: 'bold', paddingLeft: '7%'
      }
    }
  ];

  const handleFilters = (filters, category) => {
    const newFilters = { ...filtering }
    newFilters[category] = filters
    if (category === "age") {

    }
    if (category === "header") {
      showFilterResults(newFilters)
      setFiltering(newFilters)
    }
  }

  const showFilterResults = (filters) => {
    if (filters.header.length === 0) {
      setDataList(mData)
    } else {
      const filteredResult = Array.from(mData).filter((mData) => {
        return filters.header.indexOf(mData.header) !== -1
      })
      setDataList(filteredResult);
    }
  }


  if (isMobile) {
    const columnsMobile = [

      {
        title: "분야", field: "header", headerStyle: {
          color: '#030a66', fontWeight: 'bold', paddingLeft: '10%'
        }
      },


      {
        title: "제목", field: "title", render: rowData => <Link to={`/취창업공간/취창업공간-후기/view/${rowData.id}`}>{rowData.title}</Link>,
        headerStyle: {
          color: '#030a66', fontWeight: 'bold', paddingLeft: '10%'
        },
        cellStyle: {
          wordBreak: 'break-word'
        }
      },
    ];

    return (
      <>
        <div  >
          <PostSub match={props.match} />
        </div>
        <CheckBox
          handleFilters={filters => handleFilters(filters, "header")}
        /><div>

          <MaterialTable

            columns={columnsMobile}
            data={dataList}
            options={{
              showTitle: false,
              minBodyHeight: '300px'
            }}
            style={{
              marginTop: '50px',
              height: '500px',
              width: '550px',
              right: '220px',
              marginLeft: '220px'

            }}
          >

          </MaterialTable>
        </div>
        <div> <Button
          style={{ marginTop: 20, marginLeft: 180 }}
          onClick={() => {
            props.history.push({
              pathname: `취창업공간/취창업공간-후기/write`,
              state: { detail: "취창업공간-후기" },
            });
          }}
        >
          글 작성
        </Button></div>
      </>
    )

  }



  return (
    <>
      <div>

        <PostSub match={props.match} />
        <Button
          style={{ marginLeft: '70%', marginTop: 20 }}
          onClick={() => {
            props.history.push({
              pathname: `취창업공간/취창업공간-후기/write`,
              state: { detail: "취창업공간-후기" },
            });
          }}
        >
          글 작성
        </Button>

      </div>
      <CheckBox
        handleFilters={filters => handleFilters(filters, "header")}
      />
      <div>

        <MaterialTable

          columns={columns}
          data={dataList}
          options={{
            showTitle: false,
            minBodyHeight: '500px'
          }}
          style={{
            marginTop: '30px',
            marginLeft: '180px',
            marginRight: '20px',
            height: '500px',
            width: '800px'
          }}
        >

        </MaterialTable>
      </div>
      {/*  <PageHeader
        title={'후기'}
      />
      
      <CheckBox
                
                handleFilters = {filters => handleFilters(filters, "header")}
            />
       <MaterialTable
                columns={columns}
                data={userList}
            />
            <Button
          style={{  marginLeft: '70%', marginTop: 20 }}
        >
           <Link to="/career/write">
        글 작성
        </Link>
        </Button> */}
      {/* <div className='List'>
      
              <div className='list_grid list_tit'>
                <div> 번호 </div>
                <div> 제목 </div>
                <div> 작성자 </div>
                <div className='acenter'> 작성일 </div>
              </div>
      
                {userList ? userList.map( (el, key) => {
                  return(
                    <div className='list_grid list_data' key={key}>
                      <div> {el.id}</div>
                      <div> <Link to ={`/career/view/${el.id}`}>{el.title} </Link></div>
                      <div> {el.User.nickname}</div>
                      <div className='acenter'> {el.createdAt
                                ? el.createdAt.slice(0, 10)
                                : 'none'} </div>
                    </div>
                  )
                })
                  : null }
            </div> */}
    </>



  )


}

export default CareerReview;