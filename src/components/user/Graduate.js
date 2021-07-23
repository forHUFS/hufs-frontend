import React, { useState } from 'react';
import { Typography, Input } from 'antd';

function Graduate() {
  const { Title, Text } = Typography;

  return (
    <div>
      <Title level={4}>
        <Text type="secondary" style={{ color: '#191970'}}>
        졸업생 인증하기
        </Text>
      </Title>
      <div>
        <label>종합정보시스템 아이디</label>
        <div>
          <Input
            style={{ width: '200px' }}
            type="id"
          />
        </div>
      </div>
    </div>
  );
}

export default Graduate;