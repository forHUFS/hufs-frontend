// login, logout, register, auth
import {
  INFO_USER,
  AUTH_USER,
  UPDATE_USER,
  WITHDRAW_USER,
} from '../_actions/types';
export default function user(state = initialState, action) {
  switch (action.type) {
    case INFO_USER:
      return action.payload; // action.payload, ...state만 떠도 될 것 같은데?
    case UPDATE_USER:
      return {
        ...state,
        nickName: action.payload,
      };
    case WITHDRAW_USER:
      return {
        ...state,
      };
    default:
      return {
        ...state,
      };
  }
}

const initialState = {
  nickName: 'nickName',
  major: '주전공',
  secondMajor: '이중전공',
  posts: [
    { postId: 1, title: 'title', content: 'content1' },
    { postId: 2, title: 'title', content: 'content2' },
    { postId: 3, title: 'title', content: 'content3' },
  ],
  comments: [
    { commentId: 234, content: 'comment', postId: '1', postTitle: 'title1' },
    { commentId: 252, content: 'comment', postId: '2', postTitle: 'title2' },
    { commentId: 222, content: 'comment', postId: '1', postTitle: 'title3' },
  ],
  scraps: [
    { postId: 4, content: 'asfsdf' },
    { postId: 11, content: '123491' },
  ],
};
// userscrap 필요
