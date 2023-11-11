import React, {useEffect} from 'react';
import styled from 'styled-components';
import {useSocketContext} from 'contexts/SocketContext';

const UserList: React.FC = () => {
  const {users, socket} = useSocketContext();
  const connectedUserIds = users.users;

  useEffect(() => {
    if (socket) {
      socket.emit('users', {});
    }
  }, [socket]);

  return (
    <div className="user-list">
      <h3>전체 유저)</h3>
      <StyledList>
        {connectedUserIds.map(user => (
          <StyledUser key={user}>
            <span>{user}</span>
          </StyledUser>
        ))}
      </StyledList>
    </div>
  );
};

interface UserStateProps {
  $online?: boolean;
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
