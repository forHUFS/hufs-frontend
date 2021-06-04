import axios from 'axios';
import { PUBLIC_IP } from '../config';

export const postDelete = async (postId) => {
  axios.delete(`${PUBLIC_IP}/post/${postId}`);
};

export const postLike = async (postId) => {
  await axios.get(`${PUBLIC_IP}/post/${postId}/addlike`);
};

export const postScrap = async (postId) => {
  await axios.post(`${PUBLIC_IP}/user/scrap`, null, {
    params: { postId: postId },
  });
};
/////////

export const postSave = async (body, needDelete, boardId) => {
  await axios.post(`${PUBLIC_IP}/board/${boardId}/post`, body);
  if (needDelete.length !== 0) {
    await axios.post(`${PUBLIC_IP}/post/back`, { url: needDelete });
  }
};

export const postUpdate = async (updated, needDelete, postId) => {
  await axios.put(`${PUBLIC_IP}/post/${postId}`, updated);
  if (needDelete.length !== 0) {
    await axios.post(`${PUBLIC_IP}/post/back`, { url: needDelete });
  }
};

export const deleteScrap = async (scrapId) => {
  await axios.delete(`${PUBLIC_IP}/user/scrap`, {
    params: { id: scrapId },
  });
};
