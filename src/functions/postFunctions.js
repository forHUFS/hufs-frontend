import axios from 'axios';
import { PUBLIC_IP } from '../config';

export const postDelete = async (postId) => {
  await axios.delete(`${PUBLIC_IP}/post/${postId}`);
};

export const postCommentLike = async (type, id) => {
  await axios.post(`${PUBLIC_IP}/like`, { [type]: id });
};

export const postScrap = async (postId) => {
  await axios.post(`${PUBLIC_IP}/user/scrap`, null, {
    params: { postId: postId },
  });
};
export const deleteScrap = async (scrapId) => {
  await axios.delete(`${PUBLIC_IP}/user/scrap`, {
    params: { id: scrapId },
  });
};
export const postUpdate = async (updated, needDelete, postId) => {
  await axios.put(`${PUBLIC_IP}/post/${postId}`, updated);
  if (needDelete.length !== 0) {
    await axios.post(`${PUBLIC_IP}/post/back`, { url: needDelete });
  }
};
export const postSave = async (body, needDelete, boardId) => {
  await axios.post(`${PUBLIC_IP}/board/${boardId}/post`, body);
  if (needDelete.length !== 0) {
    await axios.post(`${PUBLIC_IP}/post/back`, { url: needDelete });
  }
};
export const postSearch = async (body) => {
  const response = await axios
    .get(`${PUBLIC_IP}/search`, {
      params: body, // option = titleAndContent, title, content, nick
    })
    .then((res) => res.data.data.reverse());
  return response;
};
export const imageUpload = async (formData) => {
  await axios.post(`${PUBLIC_IP}/post/image`, formData, {
    header: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

/////////
