import axios from 'axios';
import {SERVER_URL} from '../constant';
import {authHeaders} from './auth';

interface UpdateUser {
  name?: string;
  picture?: string;
}

export const patchInfo = async (updateData: UpdateUser) => {
  try {
    const {name, picture} = updateData;
    await axios.patch(`${SERVER_URL}/user`, updateData, {headers: authHeaders});
    alert(`${name}님의 정보를 수정하였습니다.`);
  } catch (err: any) {
    console.log(err);
  }
};

// 사진을 string으로 변환하기
export async function uploadImage(file: File) {
  const data = new FormData();
  data.append('file', file);
  data.append('upload_preset', `${process.env.REACT_APP_CLOUDINARY_PRESET}`);
  // console.log(data);
  try {
    const response = await axios.post(`${process.env.REACT_APP_CLOUDINARY_URL}`, data);
    //console.log(response.data.secure_url); //서버 url
    return response.data;
  } catch (error) {
    console.error('에러 발생', error);
  }
}

// export async function getImage(file: File) {
