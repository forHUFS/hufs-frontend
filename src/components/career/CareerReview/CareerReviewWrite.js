import React, { useState, useEffect } from 'react';
import { Checkbox, Divider, message } from 'antd';
import { useDispatch } from 'react-redux';
import useResponsive from '../../../hooks/useResponsive'
import { postSave1 } from '../../../functions/postFunctions'
import PostSub from '../../post/PostSub'

import { postSave1 } from '../../../functions/postFunctions'


const CheckboxGroup = Checkbox.Group;

const plainOptions = ['어문', '창업', 'IT'];
const defaultCheckedList = [];

function CareerReviewWrite(props) {
  const { isMobile, Default, Mobile } = useResponsive();
  const [state, setState] = useState({ title: '', content: '', header: '' });
  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);
  const dispatch = useDispatch();

  const onChange = list => {
    setCheckedList(list);
    setIndeterminate(!!list.length && list.length < plainOptions.length);
    setCheckAll(list.length === plainOptions.length);
    setState({ ...state, header: list })
  };

  const onCheckAllChange = e => {
    setCheckedList(e.target.checked ? plainOptions : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
    setState({ ...state, header: checkedList })
  };

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
      header: state.header,
    };

    postSave1(body, props.location.pathname.substring(7, 15))
      .then(() => {
        props.history.goBack();
        message.success('작성 완료');
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
      })
  }


  return (
    <>
      <Mobile>
        <PostSub match={props.match} />
        <div className="Career-Write-Main" style={{ marginTop: "-900px", width: "500px" }}>
          <div className="Career-Write">
            <input type="text" id="title_txt" name="title" value={state.title} onChange={(e) => {
              setState({ ...state, title: e.target.value });
            }} placeholder="제목" />

          </div>
          <div className="Career-Check">
            <Checkbox name="header" indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
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
              value={state.content} onChange={(e) => {
                setState({ ...state, content: e.target.value });
              }}
            ></textarea>
          </div>


          <button style={{ marginLeft: "10px" }} onClick={onSubmit}>포스트 등록</button>
        </div>
      </Mobile>

      <Default>
        <PostSub match={props.match} />
        <div className="Career-Write-Main">
          <div className="Career-Write">
            <input type="text" id="title_txt" name="title" value={state.title} onChange={(e) => {
              setState({ ...state, title: e.target.value });
            }} placeholder="제목" />

          </div>
          <div className="Career-Check">
            <Checkbox name="header" indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
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
              value={state.content} onChange={(e) => {
                setState({ ...state, content: e.target.value });
              }}
            ></textarea>
          </div>


        </div>
        <div className="Career-Check">
          <Checkbox name="header" indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
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
            value={state.content} onChange={(e) => {

              setState({ ...state, content: e.target.value });
            }}

          ></textarea>
        </div>

        <button onClick={onSubmit}>포스트 등록</button>

      </Default>
    </>
  );
}


export default CareerReviewWrite;
