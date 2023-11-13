import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import Drawer from 'components/Drawer/Drawer';
import MessageList from 'pages/ChatRoom/components/MessageList';
import SendMessage from 'pages/ChatRoom/components/SendMessage';
import {RxHamburgerMenu} from 'react-icons/rx';
import {handleChatLeave} from 'api/chat';

const Chat = ({chatId}: {chatId: string}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();
  const handleLeaveChat = async () => {
    const response = await handleChatLeave(chatId);
    if (response) {
      navigate(-1);
    }
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <StyledContainer>
        <StyledHeader>
          <StyledInfo>
            <StyledLeaveButton onClick={handleLeaveChat}>채팅 나가기</StyledLeaveButton>
          </StyledInfo>
          <StyleButton onClick={toggleDrawer}>
            <RxHamburgerMenu />
          </StyleButton>
        </StyledHeader>
        <MessageList />
        <SendMessage />
      </StyledContainer>
      <Drawer //
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        isModalOpen={isModalOpen}
        onModalOpen={openModal}
        onModalClose={setIsModalOpen}
      />
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

const StyledLeaveButton = styled.button`
  background-color: ${({theme}) => theme.colors.blueBg1};
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  margin: 10px 0;
  cursor: pointer;
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
