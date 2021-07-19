import React from 'react';
import { PageHeader } from 'antd';

function PostSub({ match }) {
  return (
    <>
      <PageHeader
        title={findBoardName(match.params.title)}
        subTitle={findBoardSub(match.params.title)}
      />
    </>
  );
}

export default PostSub;

export function findBoardName(boardTitle) {
  switch (boardTitle) {
    case '떠들어Boo':
      return '떠들어Boo';
    case '학교 해Boo':
      return '학교 해Boo';
    case '학교 간 Boo':
      return '학교 간 Boo';
    case '학교 떠난 Boo':
      return '학교 떠난 Boo';
    case '정면승Boo':
      return '정면승Boo';
    case '이거 모르면 바Boo':
      return '이거 모르면 바Boo';
    default:
      break;
  }
}

export function findBoardSub(boardTitle) {
  switch (boardTitle) {
    case '떠들어Boo':
      return '자유롭게 떠드는 커뮤니티';
    case '학교 해Boo':
      return '장학금 여기서 스~윽';
    case '학교 간 Boo':
      return '외대생만의 맛집과 리뷰!';
    case '학교 떠난 Boo':
      return '졸업생들 여기 모여~~!';
    case '정면승Boo':
      return '캠O스픽, 스X업 말고 여기서 한 번에 모아보자!';
    case '이거 모르면 바Boo':
      return '외대생이라면 누릴 수 있는 제휴 혜택 정보&꿀팁 궁금한 사람?!';
    default:
      break;
  }
}
