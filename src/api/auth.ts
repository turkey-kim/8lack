import axios from 'axios';
import {SERVER_URL, USER_DEFAULT_IMG} from '../constant';

const headers = {
  'content-type': 'application/json',
  serverId: process.env.REACT_APP_SERVER_ID,
};

const authHeaders = {
  'content-type': 'application/json',
  serverId: process.env.REACT_APP_SERVER_ID,
  Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
};

export const postSignIn = async (id: string, pw: string) => {
  try {
    const response = await axios.post(
      `${SERVER_URL}/login`,
      {id: id, password: pw},
      {
        headers: headers,
      },
    );
    return response.data;
  } catch (err: any) {
    alert('로그인 정보가 잘못되었습니다~');
  }
};

export const postSignUp = async (id: string, pw: string, name: string) => {
  try {
    await axios.post(
      `${SERVER_URL}/signup`,
      {id: id, password: pw, name: name, picture: USER_DEFAULT_IMG},
      {headers: headers},
    );
    alert(`${name}님 회원가입에 성공하셨습니다!`);
  } catch (err: any) {
    alert('잘못된 형식입니다!');
  }
};

export const authCheck = async () => {
  try {
    const res = await axios.get(`${SERVER_URL}/auth/me`, {headers: authHeaders});
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
