import React, { useState } from 'react';
import axios from 'axios';
import { Typography, Input, Button, message } from 'antd';
import useUserInfo from '../../hooks/useUserInfo';
import styles from '../../css/Graduate.module.css';

function Graduate() {
  const { Title, Text } = Typography;
  const { user, isLoading } = useUserInfo();
  const [ submit, setSubmit ] = useState({
    pk: '',
    id: '',
    password: '',
  });

  if( isLoading ) {
    return (
      <>Loading</>
    )
  }
  const onSubmit = async (e) => {
    submit.id==='' ? message.info('아이디를 입력하세요') : 
      submit.password === '' ? message.info('비밀번호를 입력하세요') :
      submit.pk === '' ? message.error('알 수 없는 에러입니다') : 
    e.preventDefault();
    console.log("submit:", submit);
    const request = await axios
      .post(`https://2wsdsvvxij.execute-api.ap-northeast-2.amazonaws.com/get-info/`, submit, )
      .then((res) => {
        console.log(res);
        message.success("졸업생 인증에 성공했습니다")
      })
      .catch((err) => {
        switch (err.response?.data.message){
          case "UNAUTHORIZED" :
            message.error("아이디와 비밀번호를 정확히 입력했는지 확인해 주세요");
            break;
          case "UNGRADUATED" :
            message.info("아직 졸업생이 아닙니다. 졸업 후 이용해 주세요:)");
            break;
          default:
            break;
        }
      })
  };

  return (
    <div className={styles.main}>
      <Title level={4}>
        <Text type="secondary" className={styles.name} style={{ color: '#191970'}}>
        졸업생 인증하기
      <div className={styles.info}>
        종합정보시스템의 아이디와 비밀번호는 HUFSpace에 저장되지 않습니다.
      </div>
        </Text>
      </Title>
      <div className={styles.idcontent}>
        <label className={styles.label}>종합정보시스템 아이디</label>
          <Input className={styles.idInput}
            type="id"
            onChange={(event) => {
              setSubmit({...submit, pk: user.id, id: event.target.value});
            }}
          />
      </div>
      <div className={styles.pwdcontent}>
        <label>종합정보시스템 비밀번호</label>
        <div>          
          <Input.Password
            className={styles.pwdInput}
            onChange={(event) => 
              setSubmit({...submit, password : event.target.value})
            }
            />
        </div>
      </div>
      <Button className={styles.btn} onClick={onSubmit}>
        인증하기
      </Button>
    </div>
  );
}

export default Graduate;