import axios from 'axios';
import {SERVER_URL, USER_DEFAULT_IMG} from 'constant/constant';

export const headers = {
  'content-type': 'application/json',
  serverId: process.env.REACT_APP_SERVER_ID,
};

export const authHeaders = () => {
  const accessToken = localStorage.getItem('accessToken');
  return {
    'content-type': 'application/json',
    serverId: process.env.REACT_APP_SERVER_ID!,
    Authorization: `Bearer ${accessToken}`,
  };
}; // 토큰이 필요한 api에는 해당 헤더를 사용하시면 됩니다!

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
    alert(`${name}님 회원가입에 성공하셨습니다!, 로그인페이지로 이동합니다!`);
    return true;
  } catch (err: any) {
    alert('잘못된 형식입니다!');
    return false;
  }
};

export const checkIdDuplication = async (id: string) => {
  try {
    const res = await axios.post(`${SERVER_URL}/check/id`, {id: id}, {headers: headers});
    return res.data;
  } catch {
    return false;
  }
};

// 인증 관련 코드
export const authCheck = async () => {
  try {
    const res = await axios.get(`${SERVER_URL}/auth/me`, {
      headers: authHeaders(),
    });
    return res.data;
  } catch (err) {
    return false;
  }
};
