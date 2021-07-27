import React,{useState,useEffect} from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import { PUBLIC_IP } from '../../../config';
import {Button,PageHeader,message} from 'antd';
import MaterialTable from "material-table";
import useResponsive from '../../../hooks/useResponsive'
import { useDispatch } from 'react-redux';
import useBoard from '../../../hooks/useBoard'
import PostSub from '../../post/PostSub'



import {
  careerList,
  postRemove,
} from '../../../_actions/reviewPost_action'

function CareerQuestion(props) {
  const { isMobile, Default, Mobile } = useResponsive();

    const [list, setList] = useState()
    const { board, isLoading, isError } = useBoard("취창업공간-질문");
    
const dispatch = useDispatch();
    

  useEffect(() => {
    setList(board);

  }, [board])

  var columns = [

    {
      title: "번호", field: "id", headerStyle: {
        color: '#030a66', fontWeight: 'bold'
      }
    },
    {

      title: "제목", field: "title", render: rowData => <Link to={`/취창업공간/question/view/${rowData.id}`}>{rowData.title}</Link>,

      headerStyle: {
        color: '#030a66', fontWeight: 'bold'
      }
    },
    {
      title: "작성자", field: "User.nickname", headerStyle: {
        color: '#030a66', fontWeight: 'bold'
      }
    },
    {
      title: "작성일", field: "createdAt", render: rowData => <div>{rowData.createdAt
        ? rowData.createdAt.slice(0, 10)
        : 'none'}</div>,
      headerStyle: {
        color: '#030a66', fontWeight: 'bold'
      }
    }
  ];

  if (isMobile) {
    columns = [


      {

        title: "제목", field: "title", render: rowData => <Link to={`/취창업공간/question/view/${rowData.id}`}>{rowData.title}</Link>,

        headerStyle: {
          color: '#030a66', fontWeight: 'bold'
        }
      },

    ];

  } else {
    columns = [


      {
        title: "번호", field: "id", headerStyle: {
          color: '#030a66', fontWeight: 'bold'
        }
      },
      {


        title: "제목", field: "title", render: rowData => <Link to={`/취창업공간/question/view/${rowData.id}`}>{rowData.title}</Link>,
        headerStyle: {
          color: '#030a66', fontWeight: 'bold'
        }

      },
      {
        title: "작성자", field: "nickname", headerStyle: {

          color: '#030a66', fontWeight: 'bold'
        }
      },
      {
        title: "작성일", field: "createdAt", render: rowData => <div>{rowData.createdAt
          ? rowData.createdAt.slice(0, 10)
          : 'none'}</div>,
        headerStyle: {
          color: '#030a66', fontWeight: 'bold'
        }
      }


    ];

  }



  return (
    <>
      <Mobile>
        <div style={{ float: 'left' }}>

          <PostSub match={props.match} />
        </div>

        <div>

          <MaterialTable

            columns={columns}
            data={list}
            options={{
              showTitle: false,
              minBodyHeight: '300px'
            }}
            style={{
              marginTop: '110px',
              height: '500px',
              width: '450px',
              right: '200px',
              marginLeft: '220px'

            }}
          >

          </MaterialTable>
          <div> <Button
            style={{ marginTop: 20, marginLeft: 180 }}
          /* onClick = {()=>{
            history.push({
              pathname: `/질문/write`,
              state: { detail: match.params.id },
            });
          }} */
          >

            <Link to="/취창업공간/question/write">

              글 작성
            </Link>
          </Button></div>
        </div>
      </Mobile>
      <Default>
        <div>

          <PostSub match={props.match} />
        </div>

        <MaterialTable


          columns={columns}
          data={list}
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
        <div> <Button
          style={{ marginLeft: '70%', marginTop: 20 }}
        /* onClick = {()=>{
          history.push({
            pathname: `${match.params.id}/질문/write`,
            state: { detail: match.params.id },
          });
        }} */
        >


          <Link to="/취창업공간/question/write">

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