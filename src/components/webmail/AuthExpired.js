import React from 'react';
import { Result, Button } from 'antd';

function AuthExpired() {
  return (
    <div>
      <Result
        title="이메일 인증 유효기간(24시간)이 만료되었습니다"
        subTitle="다시 인증 부탁드립니다. 유효한 인증 메일이 없을 경우, 마이페이지에서 재전송 가능합니다."
        extra={[
          <Button key="pageDirect">
            <a href="/" target="blank">
              HUFSpace_로 이동하기
            </a>
          </Button>,
        ]}
      />
    </div>
  );
}

export default AuthExpired;
