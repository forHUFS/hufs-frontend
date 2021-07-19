import React, { useState } from 'react';
import { Input, Select, Modal, Button, message } from 'antd';
import { withRouter } from 'react-router';
import { PUBLIC_IP } from '../../config';
import axios from 'axios';
import useErrorHandling from '../../hooks/useErrorHandling';
function ReportModal({ type, id, history }) {
  const errorHandling = useErrorHandling();
  const { Option } = Select;
  const { TextArea } = Input;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [data, setData] = useState({ content: 1, detail: '', [type]: id });
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const onReport = async () => {
    await axios
      .post(`${PUBLIC_IP}/report`, data)
      .then(() => {
        message.success('신고가 완료되었습니다. 감사합니다.');
      })
      .catch((error) => {
        errorHandling(error.response?.data.message);
      });

    setData({ content: 1, detail: '' });
    setIsModalVisible(false);
  };
  return (
    <>
      <div>
        <span
          className="report"
          onClick={showModal}
          style={{
            cursor: 'pointer',
            float: 'right',
            marginLeft: '10px',
            marginRight: '10px',
          }}
        >
          신고
        </span>
      </div>
      <Modal
        title="신고 / report"
        visible={isModalVisible}
        onOk={onReport}
        onCancel={handleCancel}
      >
        <Select
          defaultValue={1}
          style={{ width: 170 }}
          onChange={(e) => {
            setData({ ...data, content: e });
          }}
        >
          <Option value={1}>불쾌함</Option>
          <Option value={2}>광고성</Option>
        </Select>
        <br />
        <br />
        <br />
        <TextArea
          placeholder="신고 상세 사유"
          rows={4}
          value={data.detail}
          onChange={(e) => setData({ ...data, detail: e.target.value })}
        />
      </Modal>
    </>
  );
}

export default withRouter(ReportModal);
