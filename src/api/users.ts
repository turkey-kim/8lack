import axios from 'axios';
import {SERVER_URL, USER_DEFAULT_IMG} from '../constant';
import {authHeaders} from './auth';

export const getUsers = async () => {
  try {
    const res = await axios.get(`${SERVER_URL}/users`, {
      headers: authHeaders(),
    });
    return res.data;
  } catch (err) {
    return false;
  }
};
