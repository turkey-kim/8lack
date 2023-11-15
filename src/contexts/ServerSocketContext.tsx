import React, {createContext, useContext, useEffect, useState} from 'react';
import io, {Socket} from 'socket.io-client';
import {SERVER_URL} from 'constant/constant';
import {authHeaders} from 'api/auth';
import {useSetRecoilState} from 'recoil';
import {onlineUserList} from 'states/atom';
import {useUid} from 'hooks/useUid';
import {Iinvite} from 'types/server.types';

interface ServerSocketState {
  socket: Socket | null;
  notifyMessage: Iinvite[];
}
const ServerSocketContext = createContext<ServerSocketState | null>(null);

interface ServerSocketProviderProps {
  children: React.ReactNode;
}

export const ServerSocketProvider: React.FC<ServerSocketProviderProps> = ({children}) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [notifyMessage, setNotifyMessage] = useState<Iinvite[]>([]);
  const setOnlineUsers = useSetRecoilState(onlineUserList);
  const {uid, isLoading} = useUid();

  useEffect(() => {
    if (isLoading) return;
    const newSocket = io(`${SERVER_URL}/server`, {
      extraHeaders: authHeaders(),
    });
    newSocket.off('connect');
    newSocket.off('disconnect');
    newSocket.off('invite');
    setNotifyMessage([]);

    newSocket.on('connect', () => {
      console.log('Server Socket connected:', newSocket.id);
    });
    newSocket.on('connect_error', error => {
      console.error('Server Socket connect_error:', error.message);
    });
    newSocket.on('disconnect', reason => {
      console.log('Server Socket disconnect:', reason);
    });
    newSocket.off('users-server-to-client');
    newSocket.on('users-server-to-client', ({users}) => {
      setOnlineUsers(users);
    });
    newSocket.on('invite', (data: Iinvite) => {
      console.log('invite Message', data);
      const isInvited = data.responseChat.users.some(user => user.id === uid);
      const message = isInvited ? `채팅방에 초대되었습니다.` : `새로운 채팅방이 생성되었습니다.`;
      setNotifyMessage(prev => [...prev, {...data, message, isInvited}]);
    });

    setSocket(newSocket);

    return () => {
      if (newSocket.connected) {
        newSocket.disconnect();
      }
    };
  }, [isLoading, uid]);

  const contextValue = {
    socket,
    notifyMessage,
  };

  return <ServerSocketContext.Provider value={contextValue}>{children}</ServerSocketContext.Provider>;
};

export const useServerSocketContext = () => {
  const context = useContext(ServerSocketContext);
  if (!context) {
    throw new Error('useServerSocketContext must be used within a ServerSocketProvider');
  }
  return context;
};
