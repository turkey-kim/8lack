import React, {createContext, useContext, useEffect, useState} from 'react';
import io, {Socket} from 'socket.io-client';
import {v4 as uuidv4} from 'uuid';
import {leaveUser, Message, NewUser, PrevMessage, UserID} from 'types/chatroom.types';
import {authHeaders} from 'api/auth';

interface SocketState {
  socket: Socket | null;
  messages: Message[];
  prevMessages: PrevMessage;
  users: UserID;
  eventTriggered: boolean;
  setEventTriggered: React.Dispatch<boolean>;
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
  const [eventTriggered, setEventTriggered] = useState(false);

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

    // 새로운 소켓 연결 시 이전 메시지 초기화
    setMessages([]);
    setPrevMessages({messages: []});
    setUsers({users: []});

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
        setTimeout(() => setAttempt(prev => prev + 1), 1000);
      }
    });
    // 메시지 수신
    newSocket.on('message-to-client', (data: Message) => {
      setMessages(prev => [...prev, data]);
    });
    // 이전 메시지 수신
    newSocket.on('messages-to-client', (data: PrevMessage) => {
      console.log('Messages to client:', data);
      setPrevMessages(data);
    });
    // join 이벤트 데이터 처리
    newSocket.on('join', (data: NewUser) => {
      const joinMessage =
        Array.isArray(data.joiners) && data.joiners.length > 0
          ? typeof data.joiners[0] === 'string'
            ? data.joiners.map(joiner => ({
                id: `join-${joiner}-${uuidv4()}`,
                text: `${joiner}님이 입장했습니다.`,
                userId: 'system',
                createdAt: new Date(),
              }))
            : data.joiners.map(joiner => ({
                id: `join-${joiner.id}-${uuidv4()}`,
                text: `${joiner.id}님이 입장했습니다.`,
                userId: 'system',
                createdAt: new Date(),
              }))
          : [];
      setMessages(prevMessages => [...prevMessages, ...joinMessage]);
      setEventTriggered(true);
    });
    // leave 이벤트 데이터 처리
    newSocket.on('leave', (data: leaveUser) => {
      const leaveMessage = {
        id: `leave-${data.leaver}-${uuidv4()}`,
        text: `${data.leaver}님이 나가셨습니다.`,
        userId: 'system',
        createdAt: new Date(),
      };
      setMessages(prevMessages => [...prevMessages, leaveMessage]);
      setEventTriggered(true);
    });
    // 접속 상태 유저 목록
    newSocket.on('users-to-client', (data: UserID) => {
      setUsers(data);
    });

    setSocket(newSocket);

    return () => {
      if (newSocket.connected) {
        newSocket.disconnect();
        setMessages([]);
        setPrevMessages({messages: []});
        setUsers({users: []});
      }
    };
  }, [id, url, attempt]);

  const contextValue = {
    socket,
    messages,
    prevMessages,
    users,
    eventTriggered,
    setEventTriggered,
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
