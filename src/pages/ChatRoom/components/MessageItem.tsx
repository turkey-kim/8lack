import React, {useEffect} from 'react';
import styled from 'styled-components';
import {motion} from 'framer-motion';
import {formatMessageDate} from 'utils/formatDate';
import {Message} from 'types/chatroom.types';
import {useRecoilValue} from 'recoil';
import {chatRoomUsersSelector} from 'states/atom';
import {useSocketContext} from 'contexts/ChatSocketContext';

interface MessageItemProps {
  message: Message;
  isCurrentUser: boolean;
}

const MessageItem: React.FC<MessageItemProps> = ({message, isCurrentUser}) => {
  const {users, socket} = useSocketContext();
  const connectedUserIds = users.users;

  useEffect(() => {
    if (socket) {
      socket.emit('users', {});
    }
  }, [socket]);

  const usersMap = useRecoilValue(chatRoomUsersSelector) || {};
  const user = usersMap[message.userId];

  if (message.userId === 'system') {
    return (
      <StyledSystemMessage>
        <span>{message.text}</span>
      </StyledSystemMessage>
    );
  }

  const variants = {
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        duration: 0.2,
        ease: 'easeOut',
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
        ease: 'easeOut',
      },
    },
  };

  return (
    <StyledItem $currentUser={isCurrentUser} initial="hidden" animate="visible" variants={variants}>
      <StyledInner $currentUser={isCurrentUser}>
        <StyledRowSection>
          <StyledAvatarWrapper>
            <StyledAvatar src={user?.picture} alt={user?.username} />
            <StyledStatus $online={connectedUserIds.includes(user?.id)} />
          </StyledAvatarWrapper>
        </StyledRowSection>
        <StyledColSection>
          <StyledUserName $currentUser={isCurrentUser}>{user?.username}</StyledUserName>
          <StyledColBottomSection $currentUser={isCurrentUser}>
            <StyledBubble $currentUser={isCurrentUser}>{message.text}</StyledBubble>
            <StyledSmallSection>
              <StyledDate>{formatMessageDate(message.createdAt)}</StyledDate>
            </StyledSmallSection>
          </StyledColBottomSection>
        </StyledColSection>
        <StyledSpacer $currentUser={isCurrentUser} />
      </StyledInner>
    </StyledItem>
  );
};

export default MessageItem;

const StyledSystemMessage = styled.div`
  text-align: center;
  color: ${({theme}) => theme.colors.gray700};
  padding: 3rem 0 1.1rem;

  & > span {
    border-radius: 20px;
    background-color: ${({theme}) => theme.alpha.alpha3};
    padding: 0.3rem 1.5rem;
    font-size: 0.8rem;
    font-weight: 500;
  }
`;

const StyledItem = styled(motion.div)<{$currentUser: boolean}>`
  display: flex;
  padding: 7px 0px;
  width: 100%;
  justify-content: ${({$currentUser}) => ($currentUser ? 'flex-end' : 'flex-start')};
`;

const StyledBubble = styled.span<{$currentUser: boolean}>`
  background-color: ${({theme, $currentUser}) => ($currentUser ? theme.colors.blue700 : theme.colors.gray300)};
  color: ${({theme, $currentUser}) => ($currentUser ? theme.colors.white : theme.colors.blueBg3)};
  padding: 0.8em 1.1rem;
  border-radius: 25px;
  border-top-left-radius: ${({theme, $currentUser}) => ($currentUser ? 25 : 1)}px;
  border-top-right-radius: ${({theme, $currentUser}) => ($currentUser ? 1 : 25)}px;
  max-width: 500px;
  overflow-wrap: break-word;
  word-break: break-all;
  font-size: 0.97rem;
  font-weight: 500;
`;

const StyledAvatarWrapper = styled.span`
  position: relative;
  width: 34px;
  height: 34px;
`;

const StyledAvatar = styled.img`
  width: 34px;
  height: 34px;
  border-radius: 50%;
  overflow: hidden;
  background-color: ${({theme}) => theme.colors.white};
  border: 1px solid ${({theme}) => theme.colors.gray300};
`;

const StyledStatus = styled.span<{$online?: boolean}>`
  position: absolute;
  width: 7.5px;
  height: 7.5px;
  border-radius: 50%;
  background-color: ${({$online, theme}) => ($online ? theme.colors.success : theme.colors.gray300)};
  margin-left: 5px;
  bottom: 0;
  right: 0;
  border: 2px solid ${({theme}) => theme.colors.blue100};
  box-sizing: content-box;
`;

const StyledDate = styled.span`
  margin: 0.4rem;
  height: 100%;
  display: flex;
  align-items: flex-end;
  font-size: 0.72rem;
  color: ${({theme}) => theme.colors.gray700};
`;

const StyledInner = styled.div<{$currentUser: boolean}>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  ${({$currentUser}) => ($currentUser ? 'flex-direction: row-reverse;' : '')}
`;

const StyledUserName = styled.span<{$currentUser: boolean}>`
  font-size: 0.8rem;
  color: ${({theme}) => theme.colors.gray700};
  display: flex;
  justify-content: ${({$currentUser}) => ($currentUser ? 'flex-end' : 'flex-start')};
  padding: 0.3rem 0 0.5rem;
  height: 100%;
`;

const StyledRowSection = styled.div`
  flex: 1;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  height: 100%;
  position: relative;
`;

const StyledColSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledColBottomSection = styled.div<{$currentUser: boolean}>`
  flex: 2;
  display: flex;
  ${({$currentUser}) => ($currentUser ? 'flex-direction: row-reverse;' : '')}
`;

const StyledSmallSection = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const StyledSpacer = styled.div<{$currentUser: boolean}>`
  flex: ${({$currentUser}) => ($currentUser ? '1' : '0')};
`;
