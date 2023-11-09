import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {IUserList} from './UserList.types';
import {UserID} from 'types/chatroom.types';
import {useChatSocket} from 'hooks/useChatSocket';

const UserList: React.FC<IUserList> = ({chatId, usersMap}) => {
  const [connectedUserIds, setConnectedUserIds] = useState<UserID[]>([]);
  const socket = useChatSocket(chatId);

  useEffect(() => {
    const handleUsersToClient = (responseData: {users: UserID[]}) => {
      setConnectedUserIds(responseData.users); // 접속 중인 유저 ID로 상태 업데이트
    };

    if (socket) {
      socket.on('users-to-client', handleUsersToClient);

      return () => {
        socket.off('users-to-client', handleUsersToClient);
      };
    }
  }, [socket]);
  return (
    <div className="user-list">
      <h3>전체 유저 (온라인/자리비움)</h3>
      <StyledList>
        {usersMap &&
          Object.values(usersMap).map(user => (
            <StyledUser key={user.id} $online={connectedUserIds.includes(user.id)}>
              <StyledImage src={user.picture} alt={user.name} />
              <span>{user.name}</span>
              <StatusIndicator $online={connectedUserIds.includes(user.id)} />
            </StyledUser>
          ))}
      </StyledList>
    </div>
  );
};

interface UserStateProps {
  $online: boolean;
}

const StyledList = styled.ul`
  padding: 0;
  list-style: none;
`;

const StyledUser = styled.li<UserStateProps>`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  color: ${({$online, theme}) => ($online ? theme.colors.success : theme.colors.gray500)};
`;

const StyledImage = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
`;

const StatusIndicator = styled.span<UserStateProps>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({$online, theme}) => ($online ? theme.colors.success : theme.colors.gray500)};
  margin-left: 5px;
`;

export default UserList;
