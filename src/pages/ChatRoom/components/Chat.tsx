import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import Drawer from 'components/Drawer';
import Avatars from 'components/Avatars';
import MessageList from 'pages/ChatRoom/components/MessageList';
import SendMessage from 'pages/ChatRoom/components/SendMessage';
import UserList from 'pages/ChatRoom/components/UserList';
import {RxHamburgerMenu} from 'react-icons/rx';
import {RiAddFill} from 'react-icons/ri';
import {leaveChatRoom} from 'api/myChatRoom';
import AddUserModal from 'pages/ChatRoom/components/AddUserModal';
import {useChatRoomQuery} from 'hooks/useChatRoomQuery';
import {useRecoilState} from 'recoil';
import {chatRoomState} from 'states/atom';

// TODO: 불필요한 리렌더 줄이기
const Chat = ({chatId}: {chatId: string}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {data: chatRoomData, isLoading, isError} = useChatRoomQuery(chatId);
  const [chatRoom, setChatRoom] = useRecoilState(chatRoomState);

  useEffect(() => {
    if (chatRoomData) {
      setChatRoom(chatRoomData);
    }
  }, [chatRoomData, setChatRoom]);

  const navigate = useNavigate();
  const handleLeaveChat = async () => {
    const res = await leaveChatRoom(chatId);
    if (res) {
      navigate(-1);
    }
  };
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <StyledContainer>
        <StyledHeader>
          <StyledInfo>
            <Avatars users={chatRoom?.users} isPrivate={chatRoom?.isPrivate} />
            <StyledTitle>{chatRoom?.name}</StyledTitle>
          </StyledInfo>
          <StyledButton onClick={toggleDrawer}>
            <RxHamburgerMenu />
          </StyledButton>
        </StyledHeader>
        <MessageList />
        <SendMessage />
      </StyledContainer>
      <Drawer isOpen={isDrawerOpen} onClose={closeDrawer}>
        <StyledLabel>- 대화 상대</StyledLabel>
        <StyledWrapper onClick={toggleModal}>
          <StyledAddButton
            onClick={e => {
              e.stopPropagation();
            }}
          >
            <RiAddFill />
          </StyledAddButton>
          <StyledName>대화상대 초대</StyledName>
        </StyledWrapper>
        <UserList />
        <StyledSpace>
          <StyledLeaveButton onClick={handleLeaveChat}>채팅 나가기</StyledLeaveButton>
        </StyledSpace>
        {isModalOpen && <AddUserModal chatId={chatId} onClose={closeModal} />}
      </Drawer>
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
  padding: 0.75rem 1.1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({theme}) => theme.colors.white};
`;

const StyledSpace = styled.div`
  display: flex;
  flex: 1;
  align-items: flex-end;
`;

const StyledLeaveButton = styled.button`
  background-color: ${({theme}) => theme.colors.blueBg1};
  color: white;
  padding: 1rem;
  margin-bottom: 0.5rem;
  border: none;
  border-radius: 7px;
  width: 100%;
  cursor: pointer;
`;

const StyledInfo = styled.div`
  display: flex;
  align-items: center;
`;

const StyledTitle = styled.div`
  ${({theme}) => theme.fonts.subtitle4_5};
  margin-left: 1rem;
`;

const StyledButton = styled.button`
  display: flex;
`;

const StyledLabel = styled.span`
  font-size: 0.87rem;
  font-weight: 500;
  padding: 0.7rem 0.5rem;
`;

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.65rem;
  gap: 0.65rem;
  color: ${({theme}) => theme.colors.blueBg1};
  cursor: pointer;
`;

const StyledAddButton = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid ${({theme}) => theme.colors.gray300};
  color: ${({theme}) => theme.colors.blueBg1};
  display: flex;
  align-items: center;
  justify-content: center;

  & > svg {
    width: 1rem;
    height: 1rem;
  }
`;

const StyledName = styled.span`
  ${({theme}) => theme.fonts.body2};
`;
