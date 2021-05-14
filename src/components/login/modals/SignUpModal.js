import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import {
  message,
  Select,
  Button,
  Input,
  Form,
  Checkbox,
} from 'antd';
import { withRouter } from 'react-router';
import Header from '../../../views/Header/Header';
import { PUBLIC_IP } from '../../../config';
import { InformationModal2 } from '../../rule/InformationModal'
import { UseModal2 } from '../../rule/UseModal'

const SignUpModal = (props) => {
  const { Option } = Select;
  const [major, setMajor] = useState(false);
  const [doubleMajor, setDoubleMajor] = useState(false);
  const [submit, setSubmit] = useState({
    email: props.location.state.email,
    provider: props.location.state.provider,
    nickname: '',
    webMail: '',
    mainMajorId: 1,
    doubleMajorId: 2,
    isAgreed: false,
  });

  const onSubmit = async (e) => {
    console.log(submit);
    e.preventDefault();
    const request = await axios
      .post(`${PUBLIC_IP}/user/sign-up`, submit)
      //.post(`http://localhost:80/user/sign-up`, submit)
      .then((response) => {
        message.success('회원가입이 성공적으로 완료되었습니다 :)');
        message.success(
          '웹메일을 확인해주세요. 웹메일 인증이 완료되면 HUFSpace의 모든 기능을 사용하실 수 있습니다.',
        );
        props.history.push('/');
      })
      .catch((error) => {
        switch (error.response?.status) {
          case 401:
            message.info('개인 정보 수집 동의를 하지 않으셨습니다');
            break;
          case 409:
            if (error.response.data.message === 'CONFLICT_NICKNAME') {
              message.info('이미 존재하는 닉네임입니다');
            } else {
              message.info('이미 가입된 웹메일입니다.');
            }
            break;
          case 422:
            if (error.response.data.message === 'BODY_MAIN_MAJOR') {
              message.info('주전공을 입력하지 않으셨습니다')
            } else {
              message.info('이중전공을 입력하지 않으셨습니다. 없으면 "없음"이라고 작성해주세요')
            }
            break;
          default:
            break;
        }
      });
  };

  const layout = {
    labelcol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const tailLayout = {
    wrapperCol: { offset: 10, span: 16 },
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
          onValuesChange={(e) =>
            setSubmit({ ...submit, [Object.keys(e)[0]]: e[Object.keys(e)[0]] })
          }
          name="basic"
          initialValues={{ remember: true }}
          style={{
            border: '3px solid #8897cb',
            borderRadius: '8px',

            margin: '15%',
            padding: '5%',
          }}
        >
          <Form.Item
            label="닉네임"
            name="nickname"
            rules={[{ required: true, message: '닉네임을 입력하세요!' }]}
            onChange={(event) => 
              setSubmit({ ...submit, nickname: event.target.value })
            }
          >
            <Input
              style={{ textAlign: 'center' }}
              placeholder='닉네임을 입력하세요' />
          </Form.Item>

          <Form.Item
            label="웹메일"
            extra="@hufs.ac.kr 앞 부분까지만 입력해주세요.
            위 웹메일로 학생 확인 인증 메일이 발송되며, 인증은 24시간이 지나면 만료됩니다."
            name="webMail"
            onChange={(event) =>
              setSubmit({ ...submit, webMail: event.target.value })
            }
          >
            <Input style={{ textAlign: 'center' }} suffix="@hufs.ac.kr"></Input>
          </Form.Item>

          <Form.Item 
            label="주전공" 
            name="majorId" 
            onChange={(event) =>
              setSubmit({ ...submit, mainMajorId: +(event.target.value) })
            }
            rules={[{ required: true, message: '' }]}>
            <Input style={{ textAlign: 'center' }} placeholder='주전공을 입력하세요' />
          </Form.Item>
          <Form.Item label="이중/부전공" name="doubleMajorId" 
            onChange={(event) => setSubmit({ ...submit, mainMajor: event.target.value })}
            rules={[{ required: true, message: '' }]} >
            <Input style={{ textAlign: 'center' }} placeholder='이중/부전공을 입력하세요. 없으면 "없음"이라고 적어주세요' />
          </Form.Item>
          {/* 개인정보 */}
          <InformationModal2 />
          <Form.Item
            {...tailLayout}
            name="isAgreed"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(new Error('필수 항목입니다.')),
              },
            ]}
          >

            <Checkbox
              onChange={(event) => {
                setSubmit({ ...submit, isAgreed: event.target.checked });
                console.log(event.target.checked, submit.isAgreed);
              }}
            >
              동의합니다
            </Checkbox>

          </Form.Item>
          {/* 이용약관 */}
          <UseModal2 />
          <Form.Item
            {...tailLayout}
            name="isAgreed"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(new Error('필수 항목입니다.')),
              },
            ]}
          >

            <Checkbox
              onChange={(event) => {
                setSubmit({ ...submit, isAgreed: event.target.checked });
                console.log(event.target.checked, submit.isAgreed);
              }}
            >
              동의합니다
            </Checkbox>
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit" onClick={onSubmit}>
              회원가입
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default withRouter(SignUpModal);
