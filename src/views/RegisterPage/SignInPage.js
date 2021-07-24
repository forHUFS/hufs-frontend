import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import GoogleSignIn from '../../components/login/social/GoogleSignIn';
import KakaoSignIn from '../../components/login/social/KakaoSignIn';

function SignInPage({ setLogin }) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
    <Button type="text" onClick={()=>setModalVisible(true)}>
      로그인
    </Button>
    <Modal
      title="로그인 / LOGIN"
      centered
      okButtonProps={{ style: { display: 'none' } }}
      visible={modalVisible}
      onOk={() => setModalVisible(false)}
      onCancel={() => {setModalVisible(false)}}
    >
      <GoogleSignIn setLogin={setLogin} />
      <KakaoSignIn setLogin={setLogin} />
    </Modal>
    </>
  );
}

export default SignInPage;