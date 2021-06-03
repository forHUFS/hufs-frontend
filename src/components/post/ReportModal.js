import React, { useState } from 'react';
import { Input, Select, Modal, Button, message } from 'antd';
import { withRouter } from 'react-router';
import { PUBLIC_IP } from '../../config';
import axios from 'axios';
function ReportModal({ type, id, history }) {
  const { Option } = Select;
  const { TextArea } = Input;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [body, setBody] = useState({ content: 1, detail: '' });
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const onReport = async () => {
    if (type === 'post') {
      await axios
        .post(`${PUBLIC_IP}/post/${id}/report`, body)
        .then(() => {
          message.success('신고가 완료되었습니다. 감사합니다.');
        })
        .catch((error) => {
          switch (error.response?.status) {
            case 401:
              message.error('로그인이 필요합니다.');
              history.push('/');
              break;
            case 403:
              message.error('접근 권한이 없습니다');
              break;
            case 409:
              message.error('이미 신고한 게시글입니다.');
              break;
            default:
              break;
          }
        });
    } else if (type === 'comment') {
      await axios
        .post(`${PUBLIC_IP}/reply/${id}/report`, body)
        .then((response) => {
          message.success('신고가 완료되었습니다. 감사합니다.');
        })
        .catch((error) => {
          switch (error.response?.status) {
            case 401:
              message.error('로그인이 필요합니다.');
              history.push('/');
              break;
            case 403:
              message.error('접근 권한이 없습니다');
              break;
            case 409:
              message.error('이미 신고한 댓글입니다.');
              break;
            default:
              break;
          }
        });
    }
    setBody({ content: 1, detail: '' });
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
            setBody({ ...body, content: e });
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
          value={body.detail}
          onChange={(e) => setBody({ ...body, detail: e.target.value })}
        />
      </Modal>
    </>
  );
}

export default withRouter(ReportModal);
