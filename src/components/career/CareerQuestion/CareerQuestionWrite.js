import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { PUBLIC_IP } from '../../../config';
import { Divider,PageHeader,message } from 'antd';
import {
  careerSave
} from '../../../_actions/reviewPost_action'
import { useDispatch } from 'react-redux';
import useResponsive from '../../../hooks/useResponsive'
import { postSave1 } from '../../../functions/postFunctions'


function CareerQuestionWrite(props) {
  const { isMobile, Default, Mobile } = useResponsive();
 const [state, setState] = useState({title: '',content: ''});
const dispatch = useDispatch();

 
  const onSubmit = (e) => {

    console.log(state)
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
    console.log(body)
    console.log(props.location.pathname.substring(7,15))
    postSave1(body, props.location.pathname.substring(7,15))
    .then(() => {
      props.history.goBack();
      message.success('작성 완료');
    })
    .catch((error) => {
      //errorHandling(error.response?.data.message);
    });
   /*  dispatch(careerSave(body,(props.location.pathname.substring(7,15))))
      .then((response) => {
        if (response.status === 200) {
          console.log(props.history)
          props.history.goBack('/');
        }
      })
      .catch((error) => {
        switch (error.response?.status) {
          case 401:
            message.error('로그인이 필요합니다.');
            props.history.push('/');
          case 403:
            message.error('접근 권한 오류');
            props.history.push('/');
            break;
          default:
            break;
        }
      }); */
  };


  /* const _submitBoard = async function () {
    const title = document.getElementsByName('title')[0].value.trim();
    const contents = document.getElementsByName('contents')[0].value.trim();
    const header = document.getElementsByName('header')[0].value;
  
    if (title === '') {
      return alert('제목을 입력해주세요');
    } else if (contents === '') {
      return alert('내용을 입력해주세요');
    }
  
    const data = { title: title, contents: contents, header:header };
    const res = await axios(`${PUBLIC_IP}/board/careerReview`, {
      method: 'POST',
      data: data,
      headers: new Headers(),
    });
  
    if (res.data) {
      alert('글이 등록되었습니다.');
      return window.location.replace('/board/취창업공간');
    }
  };
   */

  return (
    <>
    <Mobile>
     <PageHeader
        title={'질문'}
      />
      <div className="Career-Write-Main" style = {{marginTop:"-900px", width:"500px"}}>
        <div className="Career-Write">
          <input type="text" id="title_txt" name="title" value={state.title} onChange={(e) => {
            console.log(e.target.value)
            setState({...state,title: e.target.value });
          }} placeholder="제목" />
          
        </div>
      
        <div>
          <textarea
            id="content_txt"
            name="contents"
            placeholder="내용을 입력하시오."
            value={state.content} onChange={(e) => {
              console.log(e.target.value)
              setState({...state,content: e.target.value });}}
          ></textarea>
        </div>

        <button style={{marginLeft:"10px"}} onClick={onSubmit}>포스트 등록</button>
      </div>
      </Mobile>
    <Default>
     <PageHeader
        title={'질문'}
      />
      <div className="Career-Write-Main">
        <div className="Career-Write">
          <input type="text" id="title_txt" name="title" value={state.title} onChange={(e) => {
            console.log(e.target.value)
            setState({...state,title: e.target.value });
          }} placeholder="제목" />
          
        </div>
       
        <div>
          <textarea
            id="content_txt"
            name="contents"
            placeholder="내용을 입력하시오."
            value={state.content} onChange={(e) => {
              console.log(e.target.value)
              setState({...state,content: e.target.value });}}
          ></textarea>
        </div>

       <button onClick={onSubmit}>포스트 등록</button>
      </div>
      </Default>
    </>
  );
}


export default CareerQuestionWrite;
