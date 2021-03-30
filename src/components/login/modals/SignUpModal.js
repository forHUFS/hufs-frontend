import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { message, Select, Modal, Button, Input, Form, Checkbox } from 'antd';
import { withRouter } from 'react-router';
import Header from '../../../views/Header/Header';
import Cookies from 'js-cookie';


const SignUpModal = (props) => {
  const { Option } = Select;
  const [major, setMajor] = useState(false);
  const [doubleMajor, setDoubleMajor] = useState(false);

  const [submit, setSubmit] = useState({email: Cookies.get('email'), nickname: "", webMail: "", mainMajorId: 0, doubleMajorId: "", isAgreed: false});

  useEffect(async () => {
    const request1 = await axios
      .get(`http://52.78.2.40:8080/major/main-major`) //1전공
      .then((response) => response.data.data) // 배열 [id, name ]
      .catch((e) => {
        console.log(e);
      })
    setMajor(request1);
    console.log(request1);

    const request2 = await axios
      .get(`http://52.78.2.40:8080/major/double-major`) //이중전공
      .then((response) => response.data.data)
      .catch((e) => {
        console.log(e);
      }) // 배열 [id, name ]

    setDoubleMajor(request2);
    console.log(request2);
  }, []);

  useEffect(() => {
    console.log(submit);
  }, [submit]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const request = await axios
      .post('http://localhost:5000/user/sign-up', submit)
      .then((response) => {
        console.log(response)

        console.log(response.status);
        message.success('회원가입이 성공적으로 완료되었습니다 :)');
      })
      .catch((error) => {
        switch (error.response?.status) {
          case 401:
            alert('개인 정보 수집 동의를 하지 않으셨습니다');
          case 409:
            alert('이미 존재하는 닉네임입니다')
        }
      });
  };

  const layout = {
    labelcol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };


  return (
    <>
      <Header />
      <div
        style={{
          display: 'inline-block',
          position: 'relative',
          width: '1100px',
          left: '15%',
        }}
      >
        <Form
          onValuesChange={(e) => setSubmit({ ...submit, [e[0]]: e })}
          name="basic"
          initialValues={{ remember: true }}
        >
          <Form.Item
            label="닉네임"
            name="nickname"
            rules={[{ required: true, message: '닉네임을 입력하세요!' }]}
            onChange={event => setSubmit({...submit, nickname: event.target.value})}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="웹메일"
            extra="@hufs.ac.kr 앞 부분까지만 입력해주세요.
            위 웹메일로 학생 확인 인증 메일이 발송됩니다. 메일 인증은 24시간이 지나면 만료됩니다."
            name="webMail"
            rules={[{ required: true, message: 'put your password!' }]}
            onChange={event => setSubmit({...submit, webMail: event.target.value})}
          >
            <Input suffix="@hufs.ac.kr"></Input>
          </Form.Item>

          <Form.Item label="1전공" name="majorId">
            <Select
              style={{ width: 170 }}
              onChange={event=> setSubmit({...submit, mainMajorId: +event})}
            >
              {major ? (
                major.map((major) => {
                  return (
                    <Option key={major.id} value={major.id}>
                      {major.name}
                    </Option>
                  );
                })
              ) : (
                <></>
              )}
            </Select>
          </Form.Item>
          <Form.Item label="이중전공 / 부전공" name="doubleMajorId">
            <Select
              style={{ width: 170 }}
              onChange={event => setSubmit({...submit, doubleMajorId: +event})}
            >
              {doubleMajor ? (
                doubleMajor.map((major) => {
                  return (
                    <Option key={major.id} value={major.id}>
                      {major.name}
                    </Option>
                  );
                })
              ) : (
                <></>
              )}
            </Select>
          </Form.Item>
            <Checkbox  onClick={event => setSubmit({...submit, isAgreed: event.target.checked})}>동의합니다</Checkbox>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit" onClick={onSubmit}>
              회원가입
            </Button>
          </Form.Item>
        </Form>
      </div>
      {/* </Modal> */}
    </>
  );
};

export default withRouter(SignUpModal);

