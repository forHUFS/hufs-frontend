import axios from 'axios';
import { PUBLIC_URL } from '../config';
import {
  POST_REPORT,
  POST_LIST,
  POST_LIST_FAIL,
  POST_REMOVE,
  POST_SAVE,
  POST_LIKE,
  POST_UPDATE,
  POST_REPORT_FAIL,
  POST_SAVE_FAIL,
  POST_REMOVE_FAIL,
  POST_LIKE_FAIL,
  POST_UPDATE_FAIL,
  POST_SCRAP,
  POST_SCRAP_FAIL,
  POST_SCRAP_REMOVE,
  POST_SCRAP_REMOVE_FAIL,
  POST_DELLIKE,
  POST_DELLIKE_FAIL,
  POST_VIEW_FAIL,
  POST_VIEW,
} from './types';
// 완료
export const postView = async (postId) => {
  const request = await axios.get(`${PUBLIC_URL}/post/${postId}`);

  if (request.status === 200) {
    return {
      type: POST_VIEW,
      payload: request.data.data, // 객체
      status: request.status,
    };
  } else {
    return {
      type: POST_VIEW_FAIL,
      status: request.status,
    };
  }
};
// 완료
export const postList = async (match) => {
  const request = await axios.get(`${PUBLIC_URL}/board${match.path}`);
  if (request.status === 200) {
    return {
      type: POST_LIST,
      payload: request.data.data, // 배열
      status: request.status,
    };
  } else {
    return {
      type: POST_LIST_FAIL,
      status: request.status,
    };
  }
};
//완료
export const postReport = async (postId, body) => {
  const request = await axios //body : postId, content, detail
    .post(`${PUBLIC_URL}/post/${postId}/report`, body);
  if (request.status === 200) {
    return {
      type: POST_REPORT,
      status: request.status,
    };
  } else {
    return {
      type: POST_REPORT_FAIL,
      status: request.status,
    };
  }
};
// 완료
export const postSave = async (body, needDelete, boardId) => {
  const request = await axios.post(`${PUBLIC_URL}/board/${boardId}/post`, body);

  if (needDelete.length !== 0) {
    await axios.post(`${PUBLIC_URL}/post/back`, { url: needDelete });
  }
  if (request.status === 200) {
    return {
      type: POST_SAVE,
      status: request.status,
    };
  } else {
    return {
      type: POST_SAVE_FAIL,
      status: request.error,
    };
  }
};
// 완료
export const postUpdate = async (updated, needDelete, postId) => {
  const request = await axios.put(`${PUBLIC_URL}/post/${postId}`, updated);

  if (needDelete.length !== 0) {
    await axios.post(`${PUBLIC_URL}/post/back`, { url: needDelete });
  }
  if (request.status === 200) {
    return {
      type: POST_UPDATE,
      status: request.status,
    };
  } else {
    return {
      type: POST_UPDATE_FAIL,
      status: request.status,
    };
  }
};
// 완료
export const postRemove = async (postId) => {
  const request = await axios.delete(`${PUBLIC_URL}/post/${postId}`);
  if (request.status === 200) {
    return {
      type: POST_REMOVE,
      status: request.status,
    };
  } else {
    return {
      type: POST_REMOVE_FAIL,
      status: request.status,
    };
  }
};
// 완료
export const postLike = async (postId) => {
  const request = await axios.get(`${PUBLIC_URL}/post/${postId}/addlike`);
  if (request.status === 200) {
    return {
      type: POST_LIKE,
      status: request.status,
    };
  } else {
    return {
      type: POST_LIKE_FAIL,
      status: request.status,
    };
  }
};
export const postDellike = async (postId) => {
  const request = await axios.get(`${PUBLIC_URL}/post/${postId}/dellike`);
  if (request.status === 200) {
    return {
      type: POST_DELLIKE,
      status: request.status,
    };
  } else {
    return {
      type: POST_DELLIKE_FAIL,
      status: request.status,
    };
  }
};

// request  query로 보내야하는데..
// 스웨거 request URL은 맞춤 , 500
export const postScrap = async (postId) => {
  const request = await axios.post(`${PUBLIC_URL}/user/scrap`, null, {
    params: { postId: postId },
  });
  if (request.status === 200) {
    return {
      type: POST_SCRAP,
      status: request.status,
    };
  } else {
    return {
      type: POST_SCRAP_FAIL,
      status: request.status,
    };
  }
};

// id가 스크랩 아이디라서 조금 다른데 해결필요
export const deleteScrap = async (postId) => {
  const request = await axios.delete(`${PUBLIC_URL}/user/scrap`, null, {
    params: { id: postId },
  });
  if (request.status === 200) {
    return {
      type: POST_SCRAP_REMOVE,
      status: request.status,
    };
  } else {
    return {
      type: POST_SCRAP_REMOVE_FAIL,
      status: request.status,
    };
  }
};
