import { message } from 'antd';
import { Redirect, useHistory } from 'react-router';
//CONFLICT, 404 정리 필요. +are
export default function useErrorHandling() {
  const history = useHistory();

  const errorHandling = (error) => {
    switch (error) {
      case 'INVALID_NICKNAME_TIME':
        message.error('닉네임을 변경한지 30일이 지나지 않았습니다.');
        break;
      case 'UNAUTHORIZED': // 비로그인
        history.push('/');
        return message.error('로그인이 필요합니다.');
        break;
      case 'FORBIDDEN_SUSPENSION': // 정지된 사용자
        history.push('/');
        return message.error('정지된 사용자');
        break;
      case 'FORBIDDEN_BEFORE': // 이메일 인증이 되지 않은 사용자
        history.push('/');
        return message.error('이메일 인증이 필요합니다');
        break;
      case 'FORBIDDEN': // 본인이 작성하지 않은 게시글, admin 계정은 허용
        message.error('권한이 없는 사용자입니다.');
        break;
      case 'CONFLICT':
        message.error('이미 인증처리가 된 웹메일입니다.');
        break;
      case 'CONFLICT_NICKNAME':
        message.error('이미 존재하는 닉네임입니다.');
        break;
      case 'CONFLICT_MAIN_MAJOR':
        message.error('주 전공을 이미 수정하셨습니다.');
        break;
      case 'CONFLICT_DOBULE_MAJOR':
        message.error('이중 전공을 이미 수정하셨습니다.');
        break;
      case 'BODY_MAIN_MAJOR':
        message.error('주 전공을 입력해주세요.');
        break;
      case 'BODY_DOUBLE_MAJOR':
        message.error('이중 전공을 입력해주세요.');
        break;
      case 'QUERY':
        message.error('쿼리 스트링 에러, 운영진에게 연락바랍니다.');
        break;
      case 'EXPIRED':
        message.error('인증 시간(24시간)이 만료되었습니다. 다시 인증해주세요.');
        break;
      case 'QUERY_KEYWORD':
        return message.error('두 글자 이상 입력해주세요.');
        break;
      case 'QUERY_OPTION':
        message.error('옵션을 다시 선택해주세요.');
        break;
      case 'RESOURCE_NOT_FOUND':
        message.error('검색 결과가 존재하지 않습니다.');
        break;
      case 'FORBIDDEN_MAJOR':
        history.goBack();
        return message.error('본인의 전공이 아닙니다.');
      default:
        message.error('알 수 없는 에러');
        break;
    }
  };

  return errorHandling;
}
