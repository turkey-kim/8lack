import {ReactElement, useEffect} from 'react';
import {Navigate} from 'react-router';
import useAuthCheck from 'hooks/useAuthCheck';
import {useRecoilState} from 'recoil';
import {onlineUserList} from 'states/atom';
import {io} from 'socket.io-client';
import {SERVER_URL} from 'constant/constant';

const socketHeaders = () => {
  const accessToken = localStorage.getItem('accessToken');
  return {
    Authorization: `Bearer ${accessToken}`,
    serverId: process.env.REACT_APP_SERVER_ID as string,
  };
}; // 소켓 전용 토큰

interface Props {
  children: ReactElement;
}

const UserPublicRoute = ({children}: Props): any => {
  const {authorization, isLoading} = useAuthCheck();
  const [onlineUsers, setOnlineUsers] = useRecoilState(onlineUserList);

  useEffect(() => {
    const socket = io(`${SERVER_URL}/server`, {
      extraHeaders: socketHeaders(),
    });
    socket.on('users-server-to-client', ({users}) => {
      setOnlineUsers(users);
    });

    return () => {
      socket.disconnect();
    }; // 홈화면 언마운트(로그아웃) 시, 소켓 닫음.
  }, []);

  useEffect(() => {
    // console.log(onlineUsers);
  }, [onlineUsers]); // 온라인 유저리스트 불러오기 테스트 코드 (삭제 예정)

  if (isLoading && !authorization) return <></>;
  if (!isLoading && authorization) return children;
  if (!isLoading && !authorization) return <Navigate to="/home" />;
};

export default UserPublicRoute;
