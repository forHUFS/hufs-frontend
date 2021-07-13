import axios from 'axios';
import { PUBLIC_IP } from '../config';

export const commentSave = async (body) => {
  await axios.post(`${PUBLIC_IP}/reply`, body);
};
export const commentRemove = async (commentId) => {
  await axios.delete(`${PUBLIC_IP}/reply/${commentId}`);
};
