import axios from 'axios';
import {SERVER_URL, USER_DEFAULT_IMG} from '../constant';
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
