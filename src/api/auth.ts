import axios from 'axios';
import {SERVER_URL, USER_DEFAULT_IMG} from '../constant';

const headers = {
  'content-type': 'application/json',
  serverId: process.env.REACT_APP_SERVER_ID,
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

// 인증 관련 코드

const authHeaders = {
  'content-type': 'application/json',
  serverId: process.env.REACT_APP_SERVER_ID,
  Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
}; // 토큰이 필요한 api에는 해당 헤더를 사용하시면 됩니다!

export const authCheck = async () => {
  try {
    const res = await axios.get(`${SERVER_URL}/auth/me`, {headers: authHeaders});
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

//마이페이지에서 이름, 사진 수정
interface UpdateUser {
  name?: string;
  picture?: string; // 사용자 프로필 이미지(url or base64)
}

export const patchAuth = async (updateData: UpdateUser) => {
  try {
    const {name, picture} = updateData;
    await axios.patch(`${SERVER_URL}/user`, updateData, {headers: authHeaders});
    alert(`${name}님의 정보를 수정하였습니다.`);
  } catch (err: any) {
    console.log(err);
  }
};
