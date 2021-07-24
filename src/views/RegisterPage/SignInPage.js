import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import GoogleSignIn from '../../components/login/social/GoogleSignIn';
import KakaoSignIn from '../../components/login/social/KakaoSignIn';
import { mutate } from 'swr';
import { PUBLIC_IP } from '../../config';
function SignInPage() {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <Button type="text" onClick={() => setModalVisible(true)}>
        로그인
      </Button>
      <Modal
        title="로그인 / LOGIN"
        centered
        okButtonProps={{ style: { display: 'none' } }}
        visible={modalVisible}
        onOk={() => {
          setModalVisible(false);
        }}
        onCancel={() => {
          setModalVisible(false);
        }}
      >
        <GoogleSignIn />
        <KakaoSignIn />
      </Modal>
    </>
  );
}

export default SignInPage;
