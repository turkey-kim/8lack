import React from 'react';
import styled from 'styled-components';
import {IUserList} from './UserList.types';

const UserList: React.FC<IUserList> = ({connectedUserIds, usersMap}) => {
  return (
    <div className="user-list">
      <h3>전체 유저 (온라인/자리비움)</h3>
      <StyledList>
        {Object.values(usersMap).map(user => (
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
  color: ${({$online}) => ($online ? 'green' : 'gray')};
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
  background-color: ${({$online}) => ($online ? 'green' : 'gray')};
  margin-left: 5px;
`;

export default UserList;
