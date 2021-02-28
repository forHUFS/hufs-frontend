import { POST_LIST, POST_REMOVE, POST_SAVE } from "../_actions/types";

export default function post(state = initialState, action) {
  let posts = state.posts;

  switch (action.type) {
    case POST_SAVE:
        return {
            posts: posts.concat({...action.payload, id:posts.length + 1}),
            selected: {},
        }
    case POST_REMOVE:
      return {
        ...state,
        posts: posts.filter((post) => post.id !== action.id),
        selectedBoard: {},
        deleteSuccess: true
      };
    case POST_LIST:
        return { 
           ...state,
        }
    default:
      return state;
  }
}

const initialState = {
  maxNo: 0,
  posts: [{
    id: 1,
    title: "1번입니다",
    content: "1번 내용",
    like: 0,
    postId: 1,
    userId: "아이디가 int?"
  },{
    id: 2,
    title: "2번입니다",
    content: "2번 내용",
    like: 0,
    postId: 1,
    userId: "아이디가 int?"
  },{
    id: 3,
    title: "3번입니다",
    content: "3번 내용",
    like: 0,
    postId: 1,
    userId: "아이디가 int?"
  },{
    id: 4,
    title: "4번입니다",
    content: "4번 내용",
    like: 0,
    postId: 1,
    userId: "아이디가 int?"
  },],
  selected: {},
};
