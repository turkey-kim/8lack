import React, {createContext, useContext, useEffect, useState, useMemo} from 'react';
import io, {Socket} from 'socket.io-client';
import {leaveUser, Message, NewUser, PrevMessage, UserID} from 'types/chatroom.types';
import {authHeaders} from 'api/auth';

interface SocketState {
  socket: Socket | null;
  messages: Message[];
  prevMessages: PrevMessage;
  users: UserID;
}
const ChatSocketContext = createContext<SocketState | null>(null);

interface SocketProviderProps {
  id: string;
  url: string;
  children: React.ReactNode;
}

export const ChatSocketProvider: React.FC<SocketProviderProps> = ({id, url, children}) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [prevMessages, setPrevMessages] = useState<PrevMessage>({messages: []});
  const [users, setUsers] = useState<UserID>({users: []});
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (attempt > 1) return;
    const newSocket = io(url, {
      extraHeaders: authHeaders(),
    });
    newSocket.off('connect');
    newSocket.off('disconnect');
    newSocket.off('message-to-client');
    newSocket.off('messages-to-client');
    newSocket.off('users-to-client');
    newSocket.off('join');
    newSocket.off('leave');

    newSocket.on('connect', () => {
      console.log('Socket connected:', newSocket.id);
      setAttempt(0);
    });

    newSocket.on('connect_error', error => {
      console.error('Socket connect_error:', error.message);
    });

    newSocket.on('disconnect', reason => {
      console.log('Socket disconnect:', reason);
      if (reason === 'io server disconnect') {
        console.log('연결 시도');
        setTimeout(() => setAttempt(attempt + 1), 1000);
      }
    });

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
        newSocket.close();
      }
    };
  }, [id, url, attempt]);

  const contextValue = {
    socket,
    messages,
    prevMessages,
    users,
  };

  return <ChatSocketContext.Provider value={contextValue}>{children}</ChatSocketContext.Provider>;
};

export const useSocketContext = () => {
  const context = useContext(ChatSocketContext);
  if (!context) {
    throw new Error('useSocketContext must be used within a SocketProvider');
  }
  return context;
};
