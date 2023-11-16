import React, {createContext, useContext, useEffect, useState} from 'react';
import io, {Socket} from 'socket.io-client';
import {SERVER_URL} from 'constant/constant';
import {authHeaders} from 'api/auth';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {createdChatIdState} from 'states/atom';
import {onlineUserList} from 'states/atom';
import {Iinvite} from 'types/server.types';
import {useUid} from 'hooks/useUid';

interface ServerSocketState {
  socket: Socket | null;
  notifyMessage: Iinvite[];
  setNotifyMessage: React.Dispatch<React.SetStateAction<Iinvite[]>>;
}
const ServerSocketContext = createContext<ServerSocketState | null>(null);

interface ServerSocketProviderProps {
  children: React.ReactNode;
}

export const ServerSocketProvider: React.FC<ServerSocketProviderProps> = ({children}) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [notifyMessage, setNotifyMessage] = useState<Iinvite[]>([]);
  const setOnlineUsers = useSetRecoilState(onlineUserList);
  const createdChatIds = useRecoilValue(createdChatIdState);
  const {uid, isLoading} = useUid();

  useEffect(() => {
    if (isLoading) return;
    const newSocket = io(`${SERVER_URL}/server`, {
      extraHeaders: authHeaders(),
    });
    newSocket.off('connect');
    newSocket.off('disconnect');
    newSocket.off('users-server-to-client');
    newSocket.off('new-chat');
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
    newSocket.on('users-server-to-client', ({users}) => {
      setOnlineUsers(users);
    });
    newSocket.on('invite', (data: Iinvite) => {
      if (!createdChatIds.includes(data.responseChat.id)) {
        let message = `채팅방에 초대되었습니다. 🎉`;
        let title = `${data.responseChat.name}`;
        let avatar: string | null = null;
        if (data.responseChat.isPrivate) {
          const otherUser = data.responseChat.users.find(user => user.id !== uid);
          if (otherUser) {
            message = `${otherUser.username}님이 대화를 요청했습니다.`;
            title = `${otherUser.username}`;
            avatar = `${otherUser.picture}`;
          }
        }
        setNotifyMessage(prev => [...prev, {...data, message, title, avatar, type: 'invite'}]);
      } else {
        console.log('현재 유저가 생성한 채팅방', data);
      }
    });
    newSocket.on('new-chat', (data: Iinvite) => {
      if (!data.responseChat.users.some(user => user.id === uid)) {
        const message = `새로운 채팅방이 생성되었습니다.🤩`;
        const title = `${data.responseChat.name}`;
        const avatar = null;
        setNotifyMessage(prev => [...prev, {...data, message, title, avatar, type: 'new-chat'}]);
      }
    });

    setSocket(newSocket);

    return () => {
      if (newSocket.connected) {
        newSocket.disconnect();
      }
    };
  }, [createdChatIds, isLoading, uid]);

  useEffect(() => {
    if (createdChatIds.length > 0) {
    }
  }, [createdChatIds]);

  const contextValue = {
    socket,
    notifyMessage,
    setNotifyMessage,
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
