import React from 'react';
import styled from 'styled-components';
import Avatars from 'components/Avatars';
import {useUid} from 'hooks/useUid';
import {IChatRoom} from 'types/chatroom.types';
import {USER_DEFAULT_IMG} from 'constant/constant';

interface ChatHeaderProps {
  chatRoom: IChatRoom;
  children: React.ReactNode;
}
const ChatHeader = ({chatRoom, children}: ChatHeaderProps) => {
  const {uid, isLoading, error} = useUid();
  if (isLoading) return null;
  if (error) return <div>인증이 실패 했습니다</div>;

  const otherUsers = chatRoom?.users.filter(user => user.id !== uid);
  const displayUsers =
    otherUsers && otherUsers.length > 0
      ? otherUsers
      : [{id: 'default', username: '(알 수 없음)', picture: `${USER_DEFAULT_IMG}`}];

  return (
    <StyledHeader>
      <StyledInfo>
        <Avatars users={chatRoom?.isPrivate ? displayUsers : chatRoom?.users} isPrivate={chatRoom?.isPrivate} />
        <StyledTitle>{chatRoom?.isPrivate ? displayUsers[0]?.username : chatRoom?.name}</StyledTitle>
      </StyledInfo>
      {children}
    </StyledHeader>
  );
};

export default ChatHeader;

const StyledHeader = styled.div`
  width: 100%;
  height: 9vh;
  padding: 0.75rem 1.1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({theme}) => theme.colors.white};
`;

const StyledInfo = styled.div`
  display: flex;
  align-items: center;
`;

const StyledTitle = styled.div`
  ${({theme}) => theme.fonts.subtitle4_5};
  margin-left: 1rem;
`;
