import React, {createContext, useContext, useEffect, useState} from 'react';
import io, {Socket} from 'socket.io-client';
import {SERVER_URL} from 'constant/constant';
import {authHeaders} from 'api/auth';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {createdChatIdState} from 'states/atom';
import {onlineUserList} from 'states/atom';
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
  const createdChatId = useRecoilValue(createdChatIdState);

  useEffect(() => {
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
      if (!createdChatId.includes(data.responseChat.id)) {
        const message = `채팅방에 초대되었습니다. 🎉`;
        setNotifyMessage(prev => [...prev, {...data, message}]);
        console.log('초대된 채팅방', data);
      } else {
        console.log('현재 유저가 생성한 채팅방', data);
      }
    });

    setSocket(newSocket);

    return () => {
      if (newSocket.connected) {
        newSocket.disconnect();
      }
    };
  }, [createdChatId]);

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
