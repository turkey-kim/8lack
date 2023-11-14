import React, {useEffect} from 'react';
import styled from 'styled-components';
import {useSocketContext} from 'contexts/ChatSocketContext';
import {useRecoilValue} from 'recoil';
import {chatRoomUsersSelector} from 'states/atom';

const UserList: React.FC = () => {
  const {users, socket} = useSocketContext();
  const connectedUserIds = users.users;

  useEffect(() => {
    if (socket) {
      socket.emit('users', {});
    }
  }, [socket]);

  const usersMap = useRecoilValue(chatRoomUsersSelector) || {};

  return (
    <StyledList>
      {Object.values(usersMap).map(user => (
        <StyledUser key={user.id} $online={connectedUserIds.includes(user.id)}>
          <StyledAvatarWrapper>
            <StyledAvatar src={user.picture} alt={user.username} />
            <StyledStatus $online={connectedUserIds.includes(user.id)} />
          </StyledAvatarWrapper>
          <StyledName>{user.username}</StyledName>
        </StyledUser>
      ))}
    </StyledList>
  );
};
export default UserList;

interface UserStateProps {
  $online?: boolean;
}

const StyledList = styled.ul`
  padding: 0;
`;

const StyledUser = styled.li<UserStateProps>`
  display: flex;
  align-items: center;
  margin-bottom: 0.65rem;
  gap: 0.65rem;
  position: relative;
`;

const StyledAvatarWrapper = styled.span`
  position: relative;
  width: 30px;
  height: 30px;
`;

const StyledAvatar = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 1px solid ${({theme}) => theme.colors.gray300};
`;

const StyledStatus = styled.span<UserStateProps>`
  position: absolute;
  width: 7.5px;
  height: 7.5px;
  border-radius: 50%;
  background-color: ${({$online, theme}) => ($online ? theme.colors.success : theme.colors.gray300)};
  margin-left: 5px;
  bottom: 0;
  right: 0;
  border: 2px solid ${({theme}) => theme.colors.white};
  box-sizing: content-box;
`;

const StyledName = styled.span`
  ${({theme}) => theme.fonts.body2};
`;
