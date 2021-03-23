import axios from 'axios';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../../hooks/useInput';
import { updateNickName } from '../../_actions/user_action';

function UserInfo() {
  const { id, nickName } = useSelector((state) => state.user); //  유저 리듀서에 있는 유저 정보 가져오기?
  const [nick, onChange, setNick] = useInput(nickName);
  const dispatch = useDispatch();
  const onSubmit = () => {
    dispatch(updateNickName(nick)).then((response) => {
      if (response.success) {
        alert('닉네임 변경 완료');
      } else {
        alert('닉네임 변경 실패');
      }
    });
  };
  return (
    <div>
      <div style={{ margin: '8px 0' }}>
        {' '}
        <label>아이디</label>
      </div>
      <h3>{id}</h3>
      <div style={{ margin: '8px 0' }}>
        <label>닉네임</label>
      </div>
      <div>
        <input
          type="nickName"
          value={nick}
          onChange={onChange}
          style={{ marginRight: '40px' }}
        />
        <button onClick={onSubmit}> 닉네임 변경 </button>
      </div>
    </div>
  );
}

export default UserInfo;
