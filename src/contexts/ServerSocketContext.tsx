import React, {createContext, useContext, useEffect, useState} from 'react';
import io, {Socket} from 'socket.io-client';
import {SERVER_URL} from 'constant/constant';
import {authHeaders} from 'api/auth';
import {useSetRecoilState} from 'recoil';
import {onlineUserList} from 'states/atom';

interface ServerSocketState {
  socket: Socket | null;
}
const ServerSocketContext = createContext<ServerSocketState | null>(null);

interface ServerSocketProviderProps {
  children: React.ReactNode;
}

export const ServerSocketProvider: React.FC<ServerSocketProviderProps> = ({children}) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const setOnlineUsers = useSetRecoilState(onlineUserList);

  useEffect(() => {
    const newSocket = io(`${SERVER_URL}/server`, {
      extraHeaders: authHeaders(),
    });

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

    setSocket(newSocket);

    return () => {
      if (newSocket.connected) {
        newSocket.close();
      }
    };
  }, []);

  const contextValue = {
    socket,
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
