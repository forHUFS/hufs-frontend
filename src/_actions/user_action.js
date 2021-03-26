// login, logout, register, auth

import axios from 'axios';
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> main
import { INFO_USER, AUTH_USER, UPDATE_USER } from './types';
export const updateUser = async (updatedData) => {
  const request = await axios
    .put('user/nickname', updatedData)
    .then((response) => response.data);

  return {
    type: UPDATE_USER,
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
    nickName: request[0].data.nickName,
    major: request[0].data.major,
    secondMajor: request[0].data.secondMajor,
    posts: request[1].data,
    comments: request[2].data,
    scraps: request[3].data,
  };
<<<<<<< HEAD
=======
import { INFO_USER, AUTH_USER, UPDATE_USER, WITHDRAW_USER } from './types';
export const withdrawUser = async () => {
  const request = await axios
    .delete('user/withdrawl')
    .then((response) => response.data);

  return {
    type: WITHDRAW_USER,
    payload: request,
  };
};
export const updateUser = async (updatedData) => {
  const request = await axios
    .put('user/nickname', updatedData)
    .then((response) => response.data);

>>>>>>> feature/mypage
  return {
    type: UPDATE_USER,
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
    nickName: request[0].data.nickName,
    major: request[0].data.major,
    secondMajor: request[0].data.secondMajor,
    posts: request[1].data,
    comments: request[2].data,
    scraps: request[3].data,
  };
=======
>>>>>>> main
  return {
    type: INFO_USER,
    payload: response,
  };
};
export function auth() {
  const request = axios.get('user/auth').then((response) => response.data);

  return {
    type: AUTH_USER,
    payload: request,
  };
}
