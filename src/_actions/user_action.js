// login, logout, register, auth

import axios from 'axios';
import { PUBLIC_URL } from '../config';
import {
  INFO_USER,
  AUTH_USER,
  UPDATE_USER,
  WITHDRAW_USER,
  INFO_USER_FAIL,
  WITHDRAW_USER_FAIL,
  UPDATE_USER_FAIL,
} from './types';
// 완료
export const withdrawUser = async () => {
  const request = await axios.delete(`${PUBLIC_URL}/user`);
  if (request.status === 200) {
    return {
      type: WITHDRAW_USER,
      status: request.status,
    };
  } else {
    return {
      type: WITHDRAW_USER_FAIL,
      status: request.status,
    };
  }
};
//완료

export const updateUser = async (updatedData) => {
  const request = await axios.put(`${PUBLIC_URL}/user`, updatedData);
  if (request.status === 200) {
    return {
      type: UPDATE_USER,
      payload: updatedData,
      status: request.status,
    };
  } else {
    return {
      type: UPDATE_USER_FAIL,
      status: request.status,
    };
  }
};
//완료
export const getUserInfo = async () => {
  const request = await axios.get(`${PUBLIC_URL}/user`);

  if (request.status === 200) {
    return {
      type: INFO_USER,
      payload: request.data.data,
      status: request.status,
    };
  } else {
    return {
      type: INFO_USER_FAIL,
      status: request.status,
    };
  }
};
export function auth() {
  const request = axios.get('user/auth').then((response) => response.data);

  return {
    type: AUTH_USER,
    payload: request,
  };
}
