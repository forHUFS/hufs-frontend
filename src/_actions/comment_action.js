import axios from 'axios';
import { PUBLIC_URL } from '../config';
import {
  COMMENT_REMOVE,
  COMMENT_SAVE,
  COMMENT_LIKE,
  COMMENT_REPORT,
  COMMENT_SAVE_FAIL,
  COMMENT_LIKE_FAIL,
  COMMENT_REMOVE_FAIL,
  COMMENT_REPORT_FAIL,
} from './types';
//  완료
export const commentSave = async (body) => {
  const request = await axios.post(`${PUBLIC_URL}/reply/add`, body);
  if (request.status === 200) {
    return {
      type: COMMENT_SAVE,
      status: request.status,
    };
  } else {
    return {
      type: COMMENT_SAVE_FAIL,
      status: request.status,
    };
  }
};
// 완료
export const commentLike = async (commentId) => {
  const request = await axios.get(`${PUBLIC_URL}/reply/${commentId}/addlike`);
  if (request.status === 200) {
    return {
      type: COMMENT_LIKE,
      status: request.status,
    };
  } else {
    return {
      type: COMMENT_LIKE_FAIL,
      status: request.status,
    };
  }
};
// 완료
export const commentRemove = async (commentId) => {
  const request = await axios.delete(`${PUBLIC_URL}/reply/${commentId}`);
  if (request.status === 200) {
    return {
      type: COMMENT_REMOVE,
      status: request.status,
    };
  } else {
    return {
      type: COMMENT_REMOVE_FAIL,
      status: request.status,
    };
  }
};
// 완료
export const commentReport = async (commentId, body) => {
  const request = await axios.post(
    `${PUBLIC_URL}/reply/${commentId}/report`,
    body,
  );
  if (request.status === 200) {
    return {
      type: COMMENT_REPORT,
      status: request.status,
    };
  } else {
    return {
      type: COMMENT_REPORT_FAIL,
      status: request.status,
    };
  }
};
