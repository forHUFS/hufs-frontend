import React,{useState} from 'react';
import axios from 'axios';
import { PUBLIC_IP } from '../../../config';
import { PageHeader } from 'antd';

function CareerQuestionWrite() {
 const [state, setstate] = useState({title:"",contents:""});



  const _submitBoard = async function () {
    const title = document.getElementsByName('title')[0].value.trim();
    const contents = document.getElementsByName('contents')[0].value.trim();
  
    if (title === '') {
      return alert('제목을 입력해주세요');
    } else if (contents === '') {
      return alert('내용을 입력해주세요');
    }
  
    const data = { title: title, contents: contents };
    const res = await axios(`${PUBLIC_IP}/board/${8}/post`, {
      method: 'POST',
      data: data,
      headers: new Headers(),
    });
  
    if (res.data) {
      alert('글이 등록되었습니다.');
      return window.location.replace('/career');
    }
  };
  

  return (
    <>
     <PageHeader
        title={'질문'}
      />
      <div className="Career-Write-Main">
        <div className="Career-Write">
          <input type="text" id="title_txt" name="title" placeholder="제목" />
          
        </div>
        <div>
          <textarea
            id="content_txt"
            name="contents"
            placeholder="내용을 입력하시오."
          ></textarea>
        </div>

        <button onClick={()=>_submitBoard()}>포스트 등록</button>
      </div>
    </>
  );
}


export default CareerQuestionWrite;
