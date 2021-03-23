// login, logout, register, auth

import axios from 'axios';
import { INFO_USER, AUTH_USER, UPDATE_NICKNAME_USER } from './types';
export const updateNickName = async (nickName) => {
  const request = await axios
    .put('user/nickname', nickName)
    .then((response) => response.data);

  return {
    type: UPDATE_NICKNAME_USER,
    payload: request,
    success: true,
  };
};
export const getUserInfo = async () => {
  const request = await axios.all([
    axios.get('user/info'),
    axios.get('user/post'),
    axios.get('user/comment'),
    axios.get('user/scrap'),
  ]);

  const response = {
    id: request[0].data.id,
    nickName: request[0].data.nickName,
    posts: request[1].data,
    comments: request[2].data,
    scraps: request[3].data,
  };
  return {
    type: INFO_USER,
    payload: response,
  };
};
export function auth() {
  const request = axios.get('authApi').then((response) => response.data);

  return {
    type: AUTH_USER,
    payload: request,
  };
}
