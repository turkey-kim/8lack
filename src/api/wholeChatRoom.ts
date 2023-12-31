import axios from 'axios';
import {authHeaders} from './auth';
import {SERVER_URL} from '../constant/constant';

export const wholeChatRoom = async () => {
  try {
    const response = await axios.get(`${SERVER_URL}/chat/all`, {headers: authHeaders()});
    return response.data;
  } catch (err) {
    alert('⚠️예기치 못한 에러가 발생하였습니다.');
  }
};
