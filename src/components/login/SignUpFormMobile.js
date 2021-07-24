import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { message, Select, Button, Input, Form, Cascader, Checkbox } from 'antd';
import { withRouter } from 'react-router';
import { PUBLIC_IP } from '../../config';
import { InformationModal2 } from '../rule/InformationModal';
import { UseModal2 } from '../rule/UseModal';
import useResponsive from '../../hooks/useResponsive';
import useMainMajor from '../../hooks/useMainMajor';
import useDoubleMajor from '../../hooks/useDoubleMajor';

function SignUpFormMobile(props) {
  const { Option } = Select;
  const { mainMajor, isLoading } = useMainMajor();
  const { doubleMajor, isLoading_d } = useDoubleMajor();
  const { Mobile } = useResponsive();

  const [ submit, setSubmit ] = useState({
    email: props.location.state.email,
    provider: props.location.state.provider,
    nickname: '',
    webMail: '',
    mainMajorId: 1,
    doubleMajorId: 1,
    isAgreed: false,
  });

  if (isLoading || isLoading_d) {
    return <>Lodaing</>
  }
  const majorSeoul = mainMajor.filter((major) => major.campusId === 1);
  const majorGlobal = mainMajor.filter((major) => major.campusId === 2);
  const doubleMajorSeoul = doubleMajor.filter((dMajor) => dMajor.campusId === 1);
  const doubleMajorGlobal = doubleMajor.filter((dMajor) => dMajor.campusId === 2);

  const argCheck = { a: false, b: false };

  var inputAble = true;
  const isWebMail = (props) => {
    var emailInfo = (submit.email).split('@');
    if (emailInfo[1] === 'hufs.ac.kr') {
      submit.webMail = ((submit.email).split('@')[0]);
      return emailInfo[0]
    } else {
      inputAble = false;
      return '@hufs.ac.kr 앞 부분까지만 입력해주세요'
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    const request = await axios
      .post(`${PUBLIC_IP}/user/sign-up`, submit)
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
              message.info('이미 가입된 사용자입니다.');
            }
            break;
          case 422:
            if (error.response.data.message === 'BODY_MAIN_MAJOR') {
              message.info('주전공을 선택하지 않으셨습니다');
            } else {
              message.info(
                '이중전공을 선택하지 않으셨습니다. 없으면 가장 아래의 "미정"을 선택하세요.',
              );
            }
            break;
          default:
            break;
        }
      });
  };

  const tailLayout = {
    wrapperCol: { offset: 10, span: 16 },
  };
  
  function filter(inputValue, path) {
    return path.some(option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
  }

  return (
    <div className="ant-modal-body-revise-mobile">
      <Form 
        id="basic"
        initialValue={{ remember: true }}
      >
        <Form.Item
          label="닉네임"
          name="nickname"
          rules={[{ required: true, message: '닉네임을 입력하세요!' }]}
          onChange={(event) => {
            setSubmit({ ...submit, nickname: event.target.value });
          }}
        >
          <Input
            style={{ width: '100%', textAlign: 'center' }}
            placeholder="닉네임을 입력하세요"
          />
        </Form.Item>

        <Form.Item
          label="웹메일"
          name="webMail"
          onChange={(event) => 
            setSubmit({ ...submit, webMail: event.target.value })
          }
        >
          <Input
            style={{ textAlign: 'center' }}
            placeholder={isWebMail()}
            suffix="@hufs.ac.kr"
            disabled={inputAble}
          />
          <span style={{color: 'DarkGrey', fontSize: 'small',}}>
            위 웹메일로 학생 확인 인증 메일이 발송되며, 인증은 24시간이 지나면 만료됩니다 <br/>(회원 가입 후 별도로 My page에서도 가능합니다)
          </span>
        </Form.Item>

        <Form.Item
          label="주전공"
          name="majorId"
          rules={[{ required: true, message: '' }]}
        >
          <Cascader
            showSearch={{filter}}
            style={{ width: '100%' }}
            onChange={(event) =>
              setSubmit({ ...submit, mainMajorId: +event[1] })
            }
            placeholder='주전공'
            options = {  [{
                value: '서울캠퍼스',
                  label: '서울캠퍼스',
                  children: 
                  majorSeoul.map((major) => { return ({value:major.id, label:major.name})})
                },
                {
                  value: '글로벌캠퍼스',
                  label: '글로벌캠퍼스',
                  children: 
                    majorGlobal.map((major) => { return ({value:major.id, label:major.name})})
                }
              ]}
          />
          <span style={{color: 'DarkGrey', fontSize: 'small',}}>
            주전공을 선택하세요. 없으면 "미정"을 눌러주세요
          </span>
        </Form.Item>

        <Form.Item
          label="이중/부전공"
          name="doubleMajorId"
          rules={[{ required: true, message: '' }]}
        >
          <Cascader
            showSearch={{filter}}
            style={{ width: '100%' }}
            onChange={(event) => 
              setSubmit({ ...submit, doubleMajorId: +event[1] })
            }
            placeholder='이중/ 부전공'
            options = { [{
              value: '서울캠퍼스',
                label: '서울캠퍼스',
                children: 
                doubleMajorSeoul.map((dMajor) => { return ({value:dMajor.id, label:dMajor.name})})
              },
              {
                value: '글로벌캠퍼스',
                label: '글로벌캠퍼스',
                children: 
                  doubleMajorGlobal.map((dMajor) => { return ({value:dMajor.id, label:dMajor.name})})
              }
            ]}
          />
          <span style={{color: 'DarkGrey', fontSize: 'small',}}>
            이중/부전공을 선택하세요. 없으면 "미정"을 눌러주세요
          </span>
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
              argCheck.a = !argCheck.a;
              if (argCheck.a == true && argCheck.b === true) {
                setSubmit({ ...submit, isAgreed: event.target.checked });
              }
            }}
          >
            동의합니다 (필수)
          </Checkbox>
        </Form.Item>

        {/* 이용약관 */}
        <UseModal2 />
        <Form.Item
          {...tailLayout}
          name="isAgreed2"
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
              argCheck.b = !argCheck.b;
              if (argCheck.a == true && argCheck.b) {
                setSubmit({ ...submit, isAgreed: event.target.checked });
              }
            }}
          >
            동의합니다 (필수)
          </Checkbox>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" onClick={onSubmit}>
            회원가입
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default withRouter((SignUpFormMobile));