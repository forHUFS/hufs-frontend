import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { PUBLIC_IP } from '../../../config';
import { Divider,PageHeader,message, Input } from 'antd';
import { useDispatch } from 'react-redux';
import useResponsive from '../../../hooks/useResponsive'
import { postUpdate1 } from '../../../functions/postFunctions'
import usePostDetail from '../../../hooks/usePostDetail';

function CareerQuestionEdit(props) {
  const { isMobile, Default, Mobile } = useResponsive();
 const { postDetail, isLoading, isError } = usePostDetail(+props.match.params.id);
 const [updated, setUpdated] = useState(false);
 

 useEffect(() => {
    if (postDetail) {
      setUpdated({
        title: postDetail.title,
        content: postDetail.content,
      });
    }
  }, []);

 
  const onSubmit = (e) => {

    /* e.preventDefault(); */
    if (updated.title.trim().length === 0) {
      // 공백 제목 검사
      message.info('제목을 적어주세요');
      return;
    }
    let body = {
      title: updated.title,
      content: updated.content,
    };
    postUpdate1(body,+props.match.params.id)
    .then(() => {
      window.location.replace("/")
      message.success('작성 완료');
    })
    .catch((error) => {
      switch (error.response?.status) {
        case 401:
          message.error('로그인이 필요합니다.');
          window.location.replace("/")
        case 403:
          message.error('접근 권한 오류');
          window.location.replace("/")
          break;
        default:
          break;
      }
    })
  }

  if (isMobile)
 {
   return (
     <>
     <PageHeader
        title={'질문'}
      />
      <div className="Career-Write-Main" style = {{marginTop:"-900px", width:"500px"}}>
        <div className="Career-Write">
          <Input id="title_txt" name="title" value={updated.title} onChange={(e) => {
            setUpdated({...updated,title: e.target.value });
          }} placeholder="제목" />
          
        </div>
      
        <div>
          <textarea
            id="content_txt"
            name="contents"
            placeholder="내용을 입력하시오."
            value={updated.content} onChange={(e) => {
              setUpdated({...updated,content: e.target.value });}}
          ></textarea>
        </div>

        <button style={{marginLeft:"10px"}} onClick={onSubmit}>포스트 등록</button>
      </div></>
   )
 }
  return (
    <>
 
     <PageHeader
        title={'질문'}
      />
      <div className="Career-Write-Main">=
        <div className="Career-Write">
          <Input type="text" id="title_txt" name="title" value={updated.title} onChange={(e) => {
            setUpdated({...updated,title: e.target.value });
          }} placeholder="제목" />
          
        </div>
       
        <div>
          <textarea
            id="content_txt"
            name="contents"
            placeholder="내용을 입력하시오."
            value={updated.content} onChange={(e) => {
              setUpdated({...updated,content: e.target.value });}}
          ></textarea>
        </div>

       <button onClick={onSubmit}>포스트 등록</button>
      </div>
    </>
  );
}


export default CareerQuestionEdit;
