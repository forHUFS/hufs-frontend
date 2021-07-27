import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { PUBLIC_IP } from '../../../config';
import {PageHeader,Button,message} from 'antd';
import useResponsive from '../../../hooks/useResponsive'
import {
  postDelete,
} from '../../../functions/postFunctions';
import usePostDetail from '../../../hooks/usePostDetail';

function CareerReviewView(props) {
  const {id} = props.match.params;
  const { isMobile, Default, Mobile } = useResponsive();
  const { postDetail, isLoading, isError } = usePostDetail(id);

  const [data,setData] = useState(postDetail);
  const onDelete = () => {
    const answer = window.confirm('게시글을 삭제하시겠습니까?');

    if (answer) {
      postDelete(postDetail.id)
      .then(() => {
        message.success('게시글 삭제가 완료되었습니다.');
        props.history.goBack();
      })
      .catch((error) => {
        switch (error.response.status) {
          case 401:
            message.error('로그인하지 않은 사용자');
            props.history.push('/');
            break;
          case 403:
            message.error('접근 권한 오류');
            break;
          case 404:
            message.error('존재하지 않는 게시글입니다');
            props.history.push('/');
            break;
          default:
            break;
      }
          
    })
  };
 
  }





    /* const _getData = async function(){
        const board_id = props.match.params.data;

        const getData = await axios(`${PUBLIC_IP}/post/${board_id}`,{
            method:'GET',
            headers:new Headers(),
            data:{id:board_id}
        });
    } */
    return (
        <>
        <Mobile>
         <PageHeader
        title={'후기'}
      />
        <div className='Career-View' style = {{marginTop:"-900px", width:"500px"}}>
          {data 
          ? <div>

              <div className='top_title'>
                <input type='text' id='title_txt' name='title' defaultValue={data.title} readOnly/>

                <div className='date_div'>
                  {data.createdAt}
                </div>
              </div>
              
              <div>
                <div id='content_txt' name='contents' dangerouslySetInnerHTML = {{ __html: data.content }} readOnly></div>
              </div>
            </div>
          : null}
          <Button
          style={{

            left: '40px',
            borderColor: 'none',
            border: 'none',
            fontSize: '12px',
            boxShadow: 'none',
            fontWeight: 'bold',
            color: 'navy'
          }}

          onClick={(e) => {
            props.history.push({
              pathname: `${props.match.url}/edit`,
              state: {
                name: data.name,

                id: data.id
              },
            })
          }}>
          수정</Button> &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
          <Button
                      style={{
                        left: '10px',
                        borderColor: 'none',
                        border: 'none',
                        fontSize: '12px',
                        boxShadow: 'none',
                        fontWeight: 'bold',
                        color: 'navy'
                      }}
                      onClick={onDelete}>삭제 </Button>
        </div>
        </Mobile>
        <Default>
        <PageHeader
        title={'후기'}
      />
        <div className='Career-View'>
          {data 
          ? <div>

              <div className='top_title'>
                <input type='text' id='title_txt' name='title' defaultValue={data.title} readOnly/>

                <div className='date_div'>
                  {data.createdAt}
                </div>
              </div>
              
              <div>
                <div id='content_txt' name='contents' dangerouslySetInnerHTML = {{ __html: data.content }} readOnly></div>
              </div>
            </div>
          : null}
           <Button
          style={{

            left: '40px',
            borderColor: 'none',
            border: 'none',
            fontSize: '12px',
            boxShadow: 'none',
            fontWeight: 'bold',
            color: 'navy'
          }}

          onClick={(e) => {
            props.history.push({
              pathname: `${props.match.url}/edit`,
              state: {
                name: data.name,

                id: data.id
              },
            })
          }}>
          수정</Button> &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
          <Button
                      style={{
                        left: '10px',
                        borderColor: 'none',
                        border: 'none',
                        fontSize: '12px',
                        boxShadow: 'none',
                        fontWeight: 'bold',
                        color: 'navy'
                      }}
                      onClick={onDelete}>삭제 </Button>
        </div>
        </Default>
        </>
    )
}

export default CareerReviewView;