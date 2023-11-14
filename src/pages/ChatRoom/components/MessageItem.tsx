import React from 'react';
import styled from 'styled-components';
import {formatMessageDate} from 'utils/formatDate';
import {Message} from 'types/chatroom.types';
import {useRecoilValue} from 'recoil';
import {chatRoomUsersSelector} from 'states/atom';

interface MessageItemProps {
  message: Message;
  isCurrentUser: boolean;
}

const MessageItem: React.FC<MessageItemProps> = ({message, isCurrentUser}) => {
  const usersMap = useRecoilValue(chatRoomUsersSelector) || {};

  const user = usersMap[message.userId];
  // console.log('MessageItem: ', message);

  if (message.userId === 'system') {
    return <StyledSystemMessage>{message.text}</StyledSystemMessage>;
  }
  return (
    <StyledItem $currentUser={isCurrentUser}>
      <StyledInner $currentUser={isCurrentUser}>
        {!isCurrentUser && user && <StyledAvatar src={user.picture} alt={user.username} />}
        <StyledBubble $currentUser={isCurrentUser}>{message.text}</StyledBubble>
        <StyledDate>{formatMessageDate(message.createdAt)}</StyledDate>
        <StyledSpacer $currentUser={isCurrentUser} />
      </StyledInner>
    </StyledItem>
  );
};

export default MessageItem;

const StyledSystemMessage = styled.div`
  text-align: center;
  color: ${({theme}) => theme.colors.gray700};
  padding: 10px;
`;

const StyledItem = styled.div<{$currentUser: boolean}>`
  display: flex;
  padding: 10px 0px;
  width: 100%;
  justify-content: ${({$currentUser}) => ($currentUser ? 'flex-end' : 'flex-start')};
`;

const StyledBubble = styled.span<{$currentUser: boolean}>`
  word-break: break-all;
  background-color: ${({theme, $currentUser}) => ($currentUser ? theme.colors.blue700 : theme.colors.gray300)};
  color: ${({theme, $currentUser}) => ($currentUser ? theme.colors.white : theme.colors.blueBg3)};
  padding: 0.8em 1.1rem;
  border-radius: 1rem;
  max-width: 500px;
  overflow-wrap: break-word;
`;

const StyledInner = styled.div<{$currentUser: boolean}>`
  display: flex;
  align-items: center;
  gap: 0.65rem;
  ${({$currentUser}) => ($currentUser ? 'flex-direction: row-reverse;' : '')}
`;

const StyledAvatar = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  overflow: hidden;
`;

const StyledDate = styled.span`
  margin: 0.4rem;
  height: 100%;
  display: flex;
  align-items: flex-end;
  font-size: 0.78rem;
  color: ${({theme}) => theme.colors.gray700};
`;

const StyledSpacer = styled.div<{$currentUser: boolean}>`
  flex: ${({$currentUser}) => ($currentUser ? '1' : '0')};
`;
