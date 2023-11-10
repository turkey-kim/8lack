import axios from 'axios';

const headers = {
  'content-type': 'application/json',
  serverId: process.env.REACT_APP_SERVER_ID,
  Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
};

export const myChatRoom = async () => {
  try {
    const response = await axios.get('https://fastcampus-chat.net/chat', {headers: headers});
    console.log(response);
    return response.data;
  } catch (err) {
    alert('⚠️예기치 못한 에러가 발생하였습니다.');
  }
};
