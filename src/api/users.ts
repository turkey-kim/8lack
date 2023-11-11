import axios from 'axios';
import {SERVER_URL, USER_DEFAULT_IMG} from 'constant/constant';
import {authHeaders} from './auth';

export const getUsers = async () => {
  try {
<<<<<<< HEAD
    const res = await axios.get(`${SERVER_URL}/users`, {
      headers: authHeaders(),
    });
    return res.data;
  } catch (err) {
    return false;
=======
    const response = await axios.get(`${SERVER_URL}/users`, {
      headers: authHeaders(),
    });
    return response.data;
  } catch (err: any) {
    alert('전체 유저 정보를 불러올 수 없습니다.');
>>>>>>> af7d5af4acd76aeab9aa681592c29d8601dd672d
  }
};
