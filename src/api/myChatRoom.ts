import axios from 'axios';
import {authHeaders} from './auth';
import {SERVER_URL} from 'constant/constant';

export const myChatRoom = async () => {
  try {
    const response = await axios.get(`${SERVER_URL}/chat`, {headers: authHeaders()});
    return response.data;
  } catch (err) {
    alert('⚠️예기치 못한 에러가 발생하였습니다.');
  }
};

export const makeChatRoom = async (name: string, users: string[], isPrivate?: boolean) => {
  try {
    const response = await axios.post(
      `${SERVER_URL}/chat`,
      {name: name, users: users, isPrivate: isPrivate},
      {headers: authHeaders()},
    );
    console.log(response, '성공?');
    return response.data;
  } catch (err) {
    alert('⚠️그룹 채팅방 생성 도중 예기치 못한 에러가 발생하였습니다.');
  }
};
