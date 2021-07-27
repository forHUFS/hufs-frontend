import React from 'react';
import { PageHeader } from 'antd';

function PostSub({ match }) {

  return (
    <>
      {match.params?.title !== undefined ? (
        <PageHeader
          title={findBoardName(match.params.title)}
          subTitle={findBoardSub(match.params.title)}
        />) :
        (<PageHeader
          title={findNoBoardName(match.path)}
          subTitle={findBoardSub(match.path)}
        />)}
    </>
  );
}

export default PostSub;

export function findBoardName(boardTitle) {
  // switch (boardTitle) {
  //   case '떠들어Boo':
  //     return '떠들어Boo';
  //   case '학교 해Boo':
  //     return '학교 해Boo';
  //   case '학교 간 Boo':
  //     return '학교 간 Boo';
  //   case '학교 떠난 Boo':
  //     return '학교 떠난 Boo';
  //   case '정면승Boo':
  //     return '정면승Boo';
  //   case '이거 모르면 바Boo':
  //     return '이거 모르면 바Boo';
  //   default:
  //     break;
  // }
  return boardTitle;
}

//match.path 사용
export function findNoBoardName(path) {
  switch (path) {
    case '/scholarship':
      return '장학공간'
    case '/major':
      return '과별공간'
    case '/취창업공간':
      return '커리어 후기'
    case '/취창업공간/취창업공간-질문':
      return '커리어 질문'
    default:
      break;
  }
}

export function findBoardSub(boardTitle) {
  switch (boardTitle) {
    case '자유공간':
      return '자유롭게 놀아~!';
    case '질문공간':
      return '강의, 학교생활, 일상 뭐든 물어봐!';
    case '공구공간':
      return '공유하고 싶은 제품 여기서 같이 사!';
    case '/scholarship':
      return '장학금은 여기서 일괄 확인!'
    case '/major':
      return '본인 전공 잘 찾아가기!'
    case '/취창업공간':
      return '부엉이들의 커리어 후기는 여기서 보자!'
    case '/취창업공간/취창업공간-질문':
      return '커리어에 대한 질문은 여기서 !'
    case '졸업생공간':
      return '졸업생들 여기 모여~~!';
    case '진로공간':
      return '캠O스픽, 스X업 말고 여기서 한 번에 모아보자!';
    case '제휴공간':
      return '외대생이라면 누릴 수 있는 제휴 혜택 정보&꿀팁 궁금한 사람?!';
    //각 과별 설명
    default:
      break;
  }
}

