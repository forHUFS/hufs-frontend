import axios from 'axios';
import { message, Button, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import { PUBLIC_IP } from '../../config';
import { updateUser } from '../../_actions/user_action';
import MajorSelect from './MajorSelect';
import SecondMajorSelect from './SecondMajorSelect';
function UserInfo(props) {
  const dispatch = useDispatch();
  // 인증 여부 받아서 disabled
  const { email, webMail, nickname, mainMajor, doubleMajor } = useSelector(
    (state) => state.user,
  );
  const [loading, setLoading] = useState(true);
  const [mainMajorList, setMainMajorList] = useState([]);
  const [doubleMajorList, setDoubleMajorList] = useState([]);
  const [change, setChange] = useState({
    nickname: nickname,
    mainMajorId: mainMajor,
    doubleMajorId: doubleMajor,
  });
  const [webMailInput, setWebMailInput] = useState(webMail);
  console.log(email, webMail, nickname, mainMajor, doubleMajor);
  useEffect(async () => {
    await axios
      .all([
        axios.get(`${PUBLIC_IP}/major/main-major`),
        axios.get(`${PUBLIC_IP}/major/double-major`),
      ])
      .then((response) => {
        setMainMajorList(response[0].data.data);
        setDoubleMajorList(response[1].data.data);
      });
  }, []);
  const onSubmit = () => {
    const answer = window.confirm('변경은 한 번 ');

    if (answer) {
      dispatch(updateUser(change))
        .then((response) => {
          message.success('수정이 완료되었습니다.');
        })
        .catch((error) => {
          switch (error.response?.status) {
            case 400:
              message.error('닉네임을 변경한지 30일이 지나지 않았을 경우');
              break;
            case 401:
              message.error('로그인하지 않은 사용자');
              props.history.push('/');
              break;
            case 403:
              message.error('접근 권한 오류');
              break;
            case 409:
              message.error('이미 존재하는 닉네임입니다.');
              break;
            default:
              break;
          }
        });
    }
  };
  function mainMajorChange(value) {
    setChange({ ...change, majorId: value });
  }
  function doubleMajorChange(value) {
    setChange({ ...change, secondMajorId: value });
  }

  const onAuth = async () => {
    await axios
      .post(`${PUBLIC_IP}/user/email`)
      .then((response) => {
        message.success(
          '이메일이 성공적으로 전송되었습니다. 웹메일을 확인해주세요',
        );
      })
      .catch((error) => {
        switch (error?.response?.status) {
          case 401:
            message.error('로그인이 필요합니다.');
            props.history.push('/');
            break;
          default:
            message.error('알 수 없는 오류 발생');
            break;
        }
      }); // no parameter? 이메일 보내야할거같은데
  };
  return (
    // google, kakao 연동 필요.
    <div>
      {loading ? (
        <h3>로딩 중...</h3>
      ) : (
        <>
          <div style={{ margin: '8px 0' }}>
            <label>이메일</label>
            <div style={{ margin: '8px 0' }}>
              <Input
                value={email}
                style={{ width: '200px' }}
                disabled={true}
              ></Input>
            </div>
          </div>
          <div style={{ margin: '8px 0' }}>
            <label>웹메일</label>
            <div style={{ margin: '8px 0' }}>
              <Input
                value={webMailInput}
                onChange={(e) => setWebMailInput(e.target.value)}
                style={{ width: '200px' }}
                suffix={<>@hufs.ac.kr</>}
              ></Input>
              <Button onClick={onAuth} style={{ marginLeft: '8px' }}>
                인증하기
              </Button>
            </div>

            {/* 인증 하기, 인증 여부에 따른 disabled 작성 필요 */}
          </div>
          <div style={{ margin: '8px 0' }}>
            <label>닉네임</label>
          </div>
          <div style={{ margin: '8px 0' }}>
            <Input
              style={{ width: '200px' }}
              type="nickname"
              placeholder={nickname}
              value={change.nickname}
              onChange={(e) =>
                setChange({ ...change, nickname: e.target.value })
              }
            />
          </div>
          <label>본전공</label>
          <MajorSelect
            list={mainMajorList}
            defaultMajor={mainMajor}
            onChange={mainMajorChange}
          />
          <label>이중전공/부전공</label>
          <SecondMajorSelect
            list={doubleMajorList}
            defaultSecondMajor={doubleMajor}
            onChange={doubleMajorChange}
          />
          <button onClick={onSubmit}> 유저 정보 변경 </button>{' '}
        </>
      )}
    </div>
  );
}

export default withRouter(UserInfo);
