import React, {useState, useMemo} from 'react';
import styled from 'styled-components';
import MessageList from 'components/MessageList/MessageList';
import UserList from 'components/UserList/UserList';
import SendMessage from 'components/SendMessage/SendMessage';
import {User, Message, ChatRoom} from 'types/chatroom.types';
import {connectedUsersIds, postMessages, dummyChatRoom} from './Chat.data';

const Chat = () => {
  const [chatRoom, setChatRoom] = useState<ChatRoom>(dummyChatRoom);
  const [messages, setMessages] = useState<Message[]>(postMessages);

  // 채팅방 유저 객체
  const usersMap = useMemo(() => {
    const map: Record<string, User> = {};
    for (const user of chatRoom.users) {
      map[user.id] = user;
    }
    return map;
  }, [chatRoom]);

  const renderAvatars = () => {
    const users = chatRoom.users;
    if (chatRoom.isPrivate) {
      // 비공개방: 개인 채팅방은 아바타 1개만 보여줌
      const user = users[0];
      return <StyledChatImg src={user.picture} alt={user.name} />;
    } else {
      const avatars = users
        .slice(0, 2)
        .map((user, index) => (
          <StyledChatImg key={user.id} src={user.picture} alt={user.name} zIndex={1} marginLeft={index * -15} />
        ));
      return (
        <>
          {avatars}
          {users.length > 2 && <StyledMore style={{marginLeft: -15 * avatars.length}}>+{users.length - 2}</StyledMore>}
        </>
      );
    }
  };

  const handleSendMessage = (messageText: string) => {
    // socket.emit('message-to-server', { text: messageText, chatId: chatRoom?.id })
    console.log(messageText);
  };

  return (
    <StyledContainer>
      <StyledHeader>
        {renderAvatars()}
        <StyledTitle>{chatRoom?.name}</StyledTitle>
      </StyledHeader>
      <UserList connectedUserIds={connectedUsersIds} usersMap={usersMap} />
      <MessageList messages={messages} usersMap={usersMap} />
      <SendMessage onSendMessage={handleSendMessage} />
    </StyledContainer>
  );
};

export default Chat;

const StyledContainer = styled.div`
  background-color: ${({theme}) => theme.colors.blue100};
`;

const StyledHeader = styled.div`
  width: 100%;
  height: 66px;
  display: flex;
  align-items: center;
  background-color: ${({theme}) => theme.colors.white};
`;

interface StyledChatImgProps {
  marginLeft?: number;
  zIndex?: number;
}

const StyledChatImg = styled.img<StyledChatImgProps>`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid ${({theme}) => theme.colors.white};
  position: relative;
  left: ${({marginLeft}) => marginLeft}px;
  z-index: ${({zIndex}) => zIndex};
`;

const StyledMore = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  margin-left: -20px;
  border-radius: 50%;
  border: 2px solid ${({theme}) => theme.colors.white};
  background-color: ${({theme}) => theme.colors.blue100};
  color: ${({theme}) => theme.colors.blue700};
  font-size: 0.75rem;
  font-weight: 500;
  position: relative;
  z-index: 3;
`;

const StyledTitle = styled.div`
  ${({theme}) => theme.fonts.subtitle4};
  margin-left: 1rem;
`;
