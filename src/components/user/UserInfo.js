import axios from 'axios';
import { message, Button, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import { PUBLIC_IP } from '../../config';
import MajorSelect from './MajorSelect';
import SecondMajorSelect from './SecondMajorSelect';
import styles from '../../css/UserInfo.module.css';
import profile from '../../image/profile.png';
import useUserInfo from '../../hooks/useUserInfo';
import { mutate } from 'swr';
import useResponsive from '../../hooks/useResponsive';
function UserInfo(props) {
  const [mainMajorList, setMainMajorList] = useState([]);
  const [doubleMajorList, setDoubleMajorList] = useState([]);
  let user = props.user;
  const [change, setChange] = useState({
    nickname: user.nickName,
    mainMajorId: user.MainMajor.id,
    doubleMajorId: user.DoubleMajor.id,
  });
  const [webMailInput, setWebMailInput] = useState('');
  const { isMobile, Mobile, Default } = useResponsive();
  let isLoading = props.isLoading;
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
  // useEffect(() => {
  //   if (!isLoading) {
  //     setChange({
  //       nickname: user.nickName,
  //       mainMajorId: user.MainMajor.id,
  //       doubleMajorId: user.DoubleMajor.id,
  //     });
  //   }
  // }, []);
  const onSubmit = async () => {
    const answer = window.confirm(
      '다음 변경은 30일 이후에 가능합니다. 변경하시겠습니까?',
    );
    if (answer) {
      const dataToUpdate = getChangedInfo();
      if (dataToUpdate == undefined) {
        message.info('변경 사항이 없습니다.');
        return;
      }
      await axios
        .put(`${PUBLIC_IP}/user`, dataToUpdate)
        .then(() => {
          message.success('정보 변경이 완료되었습니다.');
        })
        .catch((error) => {
          switch (error.response.data.message) {
            case 'INVALID_NICKNAME_TIME':
              message.error('닉네임을 변경한지 30일이 지나지 않았습니다.');
              break;
            case 'UNAUTHORIZED':
              message.error('로그인하지 않은 사용자');
              props.history.push('/');
              break;
            case 'FORBIDDEN_SUSPENSION':
              message.error('정지된 사용자');
            case 'FORBIDDEN_BEFORE':
              message.error('이메일 인증이 필요합니다');
              break;
            case 'CONFLICT_NICKNAME':
              message.error('이미 존재하는 닉네임입니다.');
            case 'CONFLICT_MAIN_MAJOR':
              message.error('주 전공을 이미 수정하셨습니다.');
            case 'CONFLICT_DOBULE_MAJOR':
              message.error('이중 전공을 이미 수정하셨습니다.');
              break;
            default:
              message.error('알 수 없는 에러');
              props.history.push('/');
              break;
          }
        });
      mutate(`${PUBLIC_IP}/user`);
    }
  };
  function MainMajorChange(value) {
    setChange({ ...change, mainMajorId: value });
  }
  function DoubleMajorChange(value) {
    setChange({ ...change, doubleMajorId: value });
  }

  const getChangedInfo = () => {
    let toBeSubmitted;
    if (change.nickname !== user.nickName) {
      toBeSubmitted = { ...toBeSubmitted, nickname: change.nickname };
    }
    if (change.mainMajorId !== user.MainMajor.id) {
      toBeSubmitted = { ...toBeSubmitted, mainMajorId: change.mainMajorId };
    }
    if (change.doubleMajorId !== user.DoubleMajor.id) {
      toBeSubmitted = { ...toBeSubmitted, doubleMajorId: change.doubleMajorId };
    }
    return toBeSubmitted;
  };
  const onAuth = async () => {
    const body = webMailInput == undefined ? user.webMail : webMailInput;
    await axios
      .post(`${PUBLIC_IP}/user/email`, { webMail: body })
      .then((response) => {
        message.success(
          '이메일이 성공적으로 전송되었습니다. 웹메일을 확인해주세요',
        );
      })
      .catch((error) => {
        switch (error?.response?.data.message) {
          case 'UNAUTHORIZED':
            message.error('로그인이 필요합니다.');
            props.history.push('/');
            break;
          case 'CONFLICT':
            message.error('이미 인증처리가 된 웹메일입니다.');
            break;
          default:
            message.error('알 수 없는 오류 발생');
            break;
        }
      });
  };
  if (isLoading) return <>loading..</>;
  if (isMobile) {
    return (
      // <Mobile>
      <>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <img src={profile} style={{ width: 102, height: 102 }} />
          {/* <label>이메일</label> */}
          <div
            style={{
              alignContent: 'space-evenly',
              width: 200,
              height: 200,
              display: 'flex',
              flexWrap: 'wrap',
            }}
          >
            <Input
              value={user.Providers[0].email}
              style={{ width: '180px' }}
              disabled={true}
            ></Input>
            {/* <label>웹메일</label> */}
            {user.Token?.isEmailAuthenticated ? (
              <Input
                disabled
                value={user.webMail}
                style={{ width: '180px' }}
                suffix={<>@hufs.ac.kr</>}
              ></Input>
            ) : (
              <>
                <Input
                  defaultValue={user.webMail}
                  value={webMailInput}
                  onChange={(e) => setWebMailInput(e.target.value)}
                  style={{ width: '180px' }}
                  suffix={<>@hufs.ac.kr</>}
                ></Input>
                <Button onClick={onAuth} style={{ marginRight: 24 }}>
                  인증
                </Button>
              </>
            )}
            <Input
              style={{ width: '200px' }}
              type="nickName"
              defaultValue={user.nickName}
              placeholder={user.nickName}
              onChange={(e) => {
                setChange({ ...change, nickname: e.target.value });
              }}
            />
            <MajorSelect
              list={mainMajorList}
              defaultMajor={user.MainMajor.name}
              onChange={MainMajorChange}
            />{' '}
            <SecondMajorSelect
              list={doubleMajorList}
              defaultSecondMajor={user.DoubleMajor.name}
              onChange={DoubleMajorChange}
            />
            <Button
              style={{
                height: '28px',
              }}
              onClick={onSubmit}
            >
              수정
            </Button>
          </div>
        </div>{' '}
        {/* </Mobile> */}
      </>
    );
  }
  return (
    // <Default>
    <>
      <div className={styles.card}>
        <div className={styles.image}>
          <img src={profile} />
        </div>
        <div className={styles.info}>
          <div className={styles.email}>
            <label>이메일</label>
            <div>
              <Input
                value={user.Providers[0].email}
                style={{ width: '200px' }}
                disabled={true}
              ></Input>
            </div>
          </div>
          <div className={styles.webMail}>
            <label>웹메일</label>
            <div>
              {user.Token?.isEmailAuthenticated ? (
                <Input
                  disabled
                  value={user.webMail}
                  style={{ width: '200px' }}
                  suffix={<>@hufs.ac.kr</>}
                ></Input>
              ) : (
                <>
                  <Input
                    defaultValue={user.webMail}
                    value={webMailInput}
                    onChange={(e) => setWebMailInput(e.target.value)}
                    style={{ width: '200px' }}
                    suffix={<>@hufs.ac.kr</>}
                  ></Input>
                  <Button
                    onClick={onAuth}
                    // style={{ marginLeft: '8px' }}
                  >
                    인증하기
                  </Button>
                </>
              )}
            </div>

            {/* 인증 하기, 인증 여부에 따른 disabled 작성 필요 */}
          </div>
          <div className={styles.nickName}>
            <label>닉네임</label>
            <div>
              <Input
                style={{ width: '200px' }}
                type="nickName"
                value={change.nickname}
                placeholder={user.nickName}
                onChange={(e) => {
                  setChange({ ...change, nickname: e.target.value });
                }}
              />
            </div>
          </div>
          <div className={styles.mainMajor}>
            <label>주전공</label>
            <MajorSelect
              list={mainMajorList}
              defaultMajor={user.MainMajor.name}
              onChange={MainMajorChange}
            />
          </div>
          <div className={styles.secondMajor}>
            <label>이중/부전공</label>
            <SecondMajorSelect
              list={doubleMajorList}
              defaultSecondMajor={user.DoubleMajor.name}
              onChange={DoubleMajorChange}
            />
          </div>
          <Button style={{ height: '28px' }} onClick={onSubmit}>
            수정하기
          </Button>
        </div>
      </div>
    </>
    // </Default>
  );
}

export default withRouter(UserInfo);
