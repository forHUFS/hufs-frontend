import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { PUBLIC_IP } from '../../../config';
import { Divider,PageHeader,message, Input,Checkbox } from 'antd';
import { useDispatch } from 'react-redux';
import useResponsive from '../../../hooks/useResponsive'
import { postUpdate1 } from '../../../functions/postFunctions'
import usePostDetail from '../../../hooks/usePostDetail';


const CheckboxGroup = Checkbox.Group;

const plainOptions = ['어문', '창업', 'IT'];
const defaultCheckedList = [];

function CareerQuestionEdit(props) {
  const { isMobile, Default, Mobile } = useResponsive();
 const { postDetail, isLoading, isError } = usePostDetail(+props.match.params.id);
 const [updated, setUpdated] = useState(false);
 

 useEffect(() => {
    if (postDetail) {
      setUpdated({
        title: postDetail.title,
        content: postDetail.content,
        header:postDetail.header,
      });
    }
  }, []);
  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const [indeterminate, setIndeterminate] = useState(true);
 const [checkAll, setCheckAll] = useState(false);
 
   const onChange = list => {
     setCheckedList(list);
     setIndeterminate(!!list.length && list.length < plainOptions.length);
     setCheckAll(list.length === plainOptions.length);
     setUpdated({...updated,header:list})
   };
 
   const onCheckAllChange = e => {
     setCheckedList(e.target.checked ? plainOptions : []);
     setIndeterminate(false);
     setCheckAll(e.target.checked);
     setUpdated({...updated,header:checkedList})
   };

 
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
      header:updated.header,
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
        title={'후기'}
      />
      <div className="Career-Write-Main" style = {{marginTop:"-900px", width:"500px"}}>
        <div className="Career-Write">
          <input type="text" id="title_txt" name="title" value={updated.title} onChange={(e) => {
            setUpdated({...updated,title: e.target.value });
          }} placeholder="제목" />
          
        </div>
        <div className="Career-Check">
        <Checkbox name= "header" indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
        Check all
      </Checkbox>
      <Divider />
      <CheckboxGroup options={plainOptions} value={checkedList || ""} onChange={onChange} />
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
        title={'후기'}
      />
      <div className="Career-Write-Main">
        <div className="Career-Write">
          <input type="text" id="title_txt" name="title" value={updated.title} onChange={(e) => {
            setUpdated({...updated,title: e.target.value });
          }} placeholder="제목" />
          
        </div>
        <div className="Career-Check">
        <Checkbox name= "header" indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
        Check all
      </Checkbox>
      <Divider />
      <CheckboxGroup options={plainOptions} value={checkedList || ""} onChange={onChange} />
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
      </div></>
   )
 }


export default CareerQuestionEdit;
