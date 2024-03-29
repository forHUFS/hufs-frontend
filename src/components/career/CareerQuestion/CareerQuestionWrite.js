import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PUBLIC_IP } from '../../../config';


import { Divider, PageHeader, message, Input } from 'antd';


import {
  careerSave
} from '../../../_actions/reviewPost_action'
import { useDispatch } from 'react-redux';
import useResponsive from '../../../hooks/useResponsive'
import { postSave1 } from '../../../functions/postFunctions'

function CareerQuestionWrite(props) {

  const { isMobile, Default, Mobile } = useResponsive();
 const [state, setState] = useState({title: '',content: ''});


  const onSubmit = (e) => {

    /* e.preventDefault(); */
    if (state.title.trim().length === 0) {
      // 공백 제목 검사
      message.info('제목을 적어주세요');
      return;
    }
    let body = {
      title: state.title,
      content: state.content,
    };
    postSave1(body, "취창업공간-질문")
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
          <Input id="title_txt" name="title" value={state.title} onChange={(e) => {
            setState({...state,title: e.target.value });
          }} placeholder="제목" />
          
        </div>
      
        <div>
          <textarea
            id="content_txt"
            name="contents"
            placeholder="내용을 입력하시오."
            value={state.content} onChange={(e) => {
              setState({...state,content: e.target.value });}}
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
        <div className="Career-Write-Main">
          <div className="Career-Write">

            <Input type="text" id="title_txt" name="title" value={state.title} onChange={(e) => {

              setState({ ...state, title: e.target.value });
            }} placeholder="제목" />

          </div>
          <div>
          <textarea
            id="content_txt"
            name="contents"
            placeholder="내용을 입력하시오."
            value={state.content} onChange={(e) => {
              setState({...state,content: e.target.value });}}
          ></textarea>
        </div>

       <button onClick={onSubmit}>포스트 등록</button>
      </div>

    </>
  );
}


export default CareerQuestionWrite;