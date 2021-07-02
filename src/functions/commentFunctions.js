import axios from 'axios';
import { PUBLIC_IP } from '../config';

export const commentSave = async (body) => {
  await axios.post(`${PUBLIC_IP}/reply/add`, body);
};

export const commentLike = async (commentId) => {
  await axios.get(`${PUBLIC_IP}/reply/${commentId}/addlike`);
};

export const commentRemove = async (commentId) => {
  await axios.delete(`${PUBLIC_IP}/reply/${commentId}`);
};

export const commentReply = async (reply) => {
  await axios.post(`${PUBLIC_IP}/reply/add/re`, reply);
};
