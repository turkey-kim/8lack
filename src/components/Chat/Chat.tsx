import React, {useState, useEffect, useMemo} from 'react';
import io from 'socket.io-client';
import {authHeaders} from 'api/auth';
import styled from 'styled-components';
import Drawer from 'components/Drawer/Drawer';
import MessageList from 'components/MessageList/MessageList';
import SendMessage from 'components/SendMessage/SendMessage';
import {User, Message, ChatRoom, UserID} from 'types/chatroom.types';
import {RxHamburgerMenu} from 'react-icons/rx';
import {useRecoilState, useRecoilValue} from 'recoil';
import {chatRoomState} from 'states/chatRoomState';

const Chat = ({chatId}: {chatId: string}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const chatRoom = useRecoilValue(chatRoomState);

  // 채팅방 유저 객체
  const usersMap = useMemo(() => {
    return chatRoom?.users.reduce(
      (map, user) => {
        map[user.id] = user;
        return map;
      },
      {} as Record<string, User>,
    );
  }, [chatRoom]);

  const renderAvatars = () => {
    if (!chatRoom) return null;

    const {users, isPrivate} = chatRoom;
    return isPrivate ? (
      // 비공개방: 개인 채팅방은 아바타 1개만 보여줌
      <StyledChatImg src={users[0].picture} alt={users[0].name} />
    ) : (
      // 공개방: 여러 아바타 보여줌
      <>
        {users.slice(0, 2).map((user, index) => (
          <StyledChatImg key={user.id} src={user.picture} alt={user.name} zIndex={1} marginLeft={index * -15} />
        ))}
        {users.length > 2 && <StyledMore style={{marginLeft: -15 * 2}}>+{users.length - 2}</StyledMore>}
      </>
    );
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <>
      <StyledContainer>
        <StyledHeader>
          <StyledInfo>
            {renderAvatars()}
            <StyledTitle>{chatRoom?.name}</StyledTitle>
          </StyledInfo>
          <StyleButton onClick={toggleDrawer}>
            <RxHamburgerMenu />
          </StyleButton>
        </StyledHeader>
        <MessageList chatId={chatId} usersMap={usersMap} />
        <SendMessage chatId={chatId} />
      </StyledContainer>
      <Drawer isOpen={isDrawerOpen} onClose={closeDrawer} chatId={chatId} usersMap={usersMap} />
    </>
  );
};

export default Chat;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  background-color: ${({theme}) => theme.colors.blue100};
  width: 100%;
`;

const StyledHeader = styled.div`
  width: 100%;
  height: 66px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({theme}) => theme.colors.white};
`;

const StyledInfo = styled.div`
  display: flex;
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

const StyleButton = styled.button`
  display: flex;
`;
