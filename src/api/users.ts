import axios from 'axios';
import {SERVER_URL, USER_DEFAULT_IMG} from '../constant';
import {authHeaders} from './auth';

export const getUsers = async () => {
  try {
    const response = await axios.get(`${SERVER_URL}/users`, {
      headers: authHeaders(),
    });
    return response.data;
  } catch (err: any) {
    alert('전체 유저 정보를 불러올 수 없습니다.');
  }
};
