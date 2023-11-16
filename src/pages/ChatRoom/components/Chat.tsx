import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import Drawer from 'components/Drawer';
import ChatHeader from 'pages/ChatRoom/components/ChatHeader';
import MessageList from 'pages/ChatRoom/components/MessageList';
import SendMessage from 'pages/ChatRoom/components/SendMessage';
import UserList from 'pages/ChatRoom/components/UserList';
import {leaveChatRoom} from 'api/myChatRoom';
import GenerateModal from 'components/GenerateModal/GenerateModal';
import {useChatRoomQuery} from 'hooks/useChatRoomQuery';
import {RxHamburgerMenu} from 'react-icons/rx';
import {RiAddFill} from 'react-icons/ri';
import {useRecoilState} from 'recoil';
import {chatRoomState} from 'states/atom';
import {useChatRoomRefetch} from 'hooks/useChatRoomRefetch';

// TODO: 불필요한 리렌더 줄이기
const Chat = ({chatId}: {chatId: string}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {data: chatRoomData, refetch} = useChatRoomQuery(chatId);
  const [chatRoom, setChatRoom] = useRecoilState(chatRoomState);

  useChatRoomRefetch(refetch, isDrawerOpen);

  useEffect(() => {
    if (chatRoomData) {
      setChatRoom(chatRoomData);
    }
  }, [chatRoomData, setChatRoom]);

  const navigate = useNavigate();
  const handleLeaveChat = async () => {
    const res = await leaveChatRoom(chatId);
    if (res) {
      navigate(`/`);
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
        <ChatHeader chatRoom={chatRoomData}>
          <StyledButton onClick={toggleDrawer}>
            <RxHamburgerMenu />
          </StyledButton>
        </ChatHeader>
        <MessageList />
        <SendMessage />
      </StyledContainer>
      <Drawer isOpen={isDrawerOpen} onClose={closeDrawer}>
        <StyledWrapper onClick={openModal}>
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
        {isModalOpen && (
          <GenerateModal
            onToggleModal={() => setIsModalOpen(false)}
            headline="그룹 채팅방에 초대하기"
            label1="사용자 선택하기"
            label2="새로 초대할 사용자"
            optionInput={false}
            primaryBtn="그룹 채팅방에 초대하기"
          ></GenerateModal>
        )}
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
  font-size: 0.9rem;
  font-weight: 600;
`;

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.65rem;
  color: ${({theme}) => theme.colors.blueBg1};
  cursor: pointer;
  padding: 0.6rem;

  &:hover {
    background-color: ${({theme}) => theme.colors.blue100};
    border-radius: 12px;
  }
`;

const StyledAddButton = styled.button`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 1px solid ${({theme}) => theme.colors.gray300};
  color: ${({theme}) => theme.colors.blueBg1};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  font-weight: 600;

  & > svg {
    width: 1rem;
    height: 1rem;
  }
`;

const StyledName = styled.span`
  font-size: 0.96rem;
  font-weight: 500;
`;

const StyledButton = styled.button`
  display: flex;
  height: 100%;
  align-items: center;

  & > svg {
    width: 1rem;
    height: 1rem;
    stroke-width: 1;
  }

  &:hover {
    background-color: ${({theme}) => theme.colors.blue100};
    border-radius: 12px;
  }
`;
