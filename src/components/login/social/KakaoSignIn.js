import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import KakaoBtn from 'react-kakao-login';
import axios from 'axios';
import { PUBLIC_IP } from '../../../config';
import { message } from 'antd';
import { mutate } from 'swr';

function KakaoSignIn() {
  const history = useHistory();
  const { Kakao } = window;
  const [modalState, setModalState] = useState(true);

  Kakao.init('690082dcedf6efeca17e320160913cb3');

  const responseKakao = (res) => {
    Kakao.Auth.login({
      scope: 'profile',
      success: (response) => {
        Kakao.API.request({
          url: `/v2/user/me`,
          success: function (response) {
            console.log(
              'suc',
              response,
              're-email',
              response.kakao_account.email,
            );
            axios
              .post(`${PUBLIC_IP}/user/sign-in`, {
                email: response.kakao_account.email,
                provider: 'kakao',
              })
              .then((response) => {
                if (response.status === 200) {
                  mutate(`${PUBLIC_IP}/user`);
                  message.success('로그인이 정상 완료 되었습니다.');
                  history.push(`/`);
                  setModalState(false);
                }
              })
              .catch((error) => {
                console.log(error);
                switch (error.response?.request.status) {
                  case 404:
                    message.warning(
                      '회원가입이 되지 않은 사용자입니다. 회원가입 페이지로 넘어갑니다.',
                    );
                    history.push(`/register`, {
                      email: response.kakao_account.email,
                      provider: 'kakao',
                    });
                    break;
                  case 499:
                    console.log('body가 비어있는 상태입니다.');
                    break;
                }
              });
          },
        });
      },
      fail: function (error) {
        console.log('fail', error);
      },
    });
  };

  return (
    <>
      <KakaoBtn
        id="signIn-kakao"
        jsKey={'690082dcedf6efeca17e320160913cb3'}
        butonText="Kakao SignIn"
        onSuccess={responseKakao}
        style={{
          display: 'inline-block',
          padding: '0',
          height: '45px',
          lineHeight: '44px',
          color: 'black',
          backgroundColor: '#ffeb00',
          border: '1px solid transparent',
          borderRadius: '3px',
          fontSize: '14px',
          textAlign: 'center',
          cursor: 'pointer',
        }}
      />
    </>
  );
}

export default KakaoSignIn;
