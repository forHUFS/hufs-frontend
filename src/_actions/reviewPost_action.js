import axios from 'axios';
import { PUBLIC_IP } from '../config';
import {
  POST_LIST,
  POST_LIST_FAIL,
  POST_REMOVE,
  POST_SAVE,
  POST_UPDATE,
  POST_SAVE_FAIL,
  POST_REMOVE_FAIL,
  POST_UPDATE_FAIL,
  POST_VIEW_FAIL,
  POST_VIEW,
  REVIEW_DETAIL,
  REVIEW_DETAIL_FAIL
} from './types';
// 완료

export const postView = async (postId) => {
  const request = await axios.get(`${PUBLIC_IP}/store/review/${postId}`);

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
export const postList = async (rstrnId) => {
  const request = await axios.get(`${PUBLIC_IP}/store/${rstrnId}/reviews`, {
    withCredentials: true,
  });
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
export const postSave = async (body, needDelete, rstrnId) => {
  const request = await axios.post(`${PUBLIC_IP}/store/${rstrnId}/review`, body);

  if (needDelete.length !== 0) {
    await axios.post(`${PUBLIC_IP}/post/back`, { url: needDelete });
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
  const request = await axios.put(`${PUBLIC_IP}/store/review/${postId}`, updated);

  if (needDelete.length !== 0) {
    await axios.post(`${PUBLIC_IP}/post/back`, { url: needDelete });
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
  const request = await axios.delete(`${PUBLIC_IP}/store/review/${postId}`);
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

export const reviewDetail = async (rstrnId) => {
  const request = await axios.get(`${PUBLIC_IP}/store/${rstrnId}/detail`);
  if (request.status === 200) {
    return {
      type: REVIEW_DETAIL,
      payload: request.data.data[0],
      status: request.status,
    };
  } else {
    return {
      type: REVIEW_DETAIL_FAIL,
      status: request.status,
    };
  }
};

////

export const careerView = async (postId) => {
  const request = await axios.get(`${PUBLIC_IP}/post/${postId}`);

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
export const careerList = async (title) => {
  const request = await axios.get(`${PUBLIC_IP}/board/${title}`, {
    withCredentials: true,
  });
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
export const careerSave = async (body,title) => {
  console.log(title)
  const request = await axios.post(`${PUBLIC_IP}/board/${title}`, body);
/* 
  if (needDelete.length !== 0) {
    await axios.post(`${PUBLIC_IP}/post/back`, { url: needDelete });
  } */
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
export const careerUpdate = async (updated, needDelete, postId) => {
  const request = await axios.put(`${PUBLIC_IP}/post/${postId}`, updated);

/*   if (needDelete.length !== 0) {
    await axios.post(`${PUBLIC_IP}/post/back`, { url: needDelete });
  } */
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
export const careerRemove = async (postId) => {
  const request = await axios.delete(`${PUBLIC_IP}/post/${postId}`);
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
