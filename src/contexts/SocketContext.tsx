import React, {createContext, useContext, useEffect, useState} from 'react';
import io, {Socket} from 'socket.io-client';
import {leaveUser, Message, NewUser, PrevMessage, UserID} from 'types/chatroom.types';
import {authHeaders} from 'api/auth';

interface SocketState {
  socket: Socket | null;
  messages: Message[];
  prevMessages: PrevMessage;
  users: UserID;
}
const SocketContext = createContext<SocketState | null>(null);

interface SocketProviderProps {
  id: string;
  url: string;
  options?: any;
  children: React.ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({id, url, options, children}) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [prevMessages, setPrevMessages] = useState<PrevMessage>({messages: []});
  const [users, setUsers] = useState<UserID>({users: []});

  useEffect(() => {
    const newSocket = io(url, {...options, extraHeaders: authHeaders()});

    newSocket.on('connect', () => {
      console.log('Socket connected:', newSocket.id);
    });

    newSocket.on('connect_error', error => {
      console.error('Socket connect_error:', error);
    });

    newSocket.on('disconnect', reason => {
      console.log('Socket disconnected:', reason);
    });

    newSocket.off('message-to-client');
    newSocket.off('messages-to-client');
    newSocket.off('users-to-client');
    newSocket.off('join');
    newSocket.off('leave');
    // 메시지 수신
    newSocket.on('message-to-client', (data: Message) => {
      setMessages(prevMessages => [...prevMessages, data]);
    });
    // 이전 메시지 수신
    newSocket.on('messages-to-client', (data: PrevMessage) => {
      setPrevMessages(data);
    });
    // join 이벤트 데이터 처리
    newSocket.on('join', (data: NewUser) => {
      const joinMessage = data.joiners.map(joiner => ({
        id: `join-${joiner.id}`,
        text: `${joiner.id}님이 입장했습니다.`,
        userId: 'system',
        createdAt: new Date(),
      }));
      setMessages(prevMessages => [...prevMessages, ...joinMessage]);
    });
    // leave 이벤트 데이터 처리
    newSocket.on('leave', (data: leaveUser) => {
      const leaveMessage = {
        id: `leave-${data.leaver}`,
        text: `${data.leaver}님이 나가셨습니다.`,
        userId: 'system',
        createdAt: new Date(),
      };
      setMessages(prevMessages => [...prevMessages, leaveMessage]);
    });
    // 접속 상태 유저 목록
    newSocket.on('users-to-client', (data: UserID) => {
      setUsers(data);
    });

    setSocket(newSocket);

    return () => {
      if (newSocket.connected) {
        newSocket.disconnect();
      }
    };
  }, [id, url, options]);

  const contextValue = {
    socket,
    messages,
    prevMessages,
    users,
  };

  return <SocketContext.Provider value={contextValue}>{children}</SocketContext.Provider>;
};

export const useSocketContext = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocketContext must be used within a SocketProvider');
  }
  return context;
};
