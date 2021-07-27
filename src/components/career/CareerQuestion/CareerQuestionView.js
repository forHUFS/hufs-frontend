import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { PUBLIC_IP } from '../../../config';
import {PageHeader,message,Button} from 'antd';
import useResponsive from '../../../hooks/useResponsive'
import usePostDetail from '../../../hooks/usePostDetail';
import {
  postDelete,
} from '../../../functions/postFunctions';

function CareerQuestionView(props) {
  console.log(props.match.params.id)
    const { isMobile, Default, Mobile } = useResponsive();
    const { postDetail, isLoading, isError } = usePostDetail(props.match.params.id);

    const [data,setData] = useState(postDetail);

    const onDelete = () => {
      const answer = window.confirm('게시글을 삭제하시겠습니까?');

      if (answer) {
        postDelete(props.match.params.id)
        .then(() => {
          message.success('게시글 삭제가 완료되었습니다.');
          window.location.replace("/")
        })
        .catch((error) => {
          switch (error.response.status) {
            case 401:
              message.error('로그인하지 않은 사용자');
              window.location.replace("/")
              break;
            case 403:
              message.error('접근 권한 오류');
              break;
            case 404:
              message.error('존재하지 않는 게시글입니다');
              window.location.replace("/")
              break;
            default:
              break;
        }
            
      })
    };
   
    }
    if (isLoading) return <>loading...</>;
    if (isError) {
      console.log("isEroor")
      return 
    }

    if (isMobile) {

      return (
        <>
      <PageHeader
        title={'질문'}
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
        </>
      )

    }

    
    return (
        <>
      
        <PageHeader
        title={'질문'}
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
        </>
    )
}

export default CareerQuestionView;