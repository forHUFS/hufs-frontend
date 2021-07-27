import { Select } from 'antd';
import React from 'react';

function PostHeaderToolBar({ value, setvalue }) {
  const { Option } = Select;
  return (
    <div
      style={{
        padding: 12,
        paddingBottom: 0,
      }}
    >
      <label
        style={{
          paddingRight: 20,
        }}
      >
        카테고리
      </label>
      <Select
        defaultValue="선택"
        style={{ width: 120 }}
        onChange={(e) => setvalue({ ...value, header: e })}
      >
        <Option value="자유">자유</Option>
        <Option value="소식">소식</Option>
      </Select>

    </div>
  );
}

export default PostHeaderToolBar;
