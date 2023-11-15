import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import {AnimatePresence} from 'framer-motion';
import ToastItem from 'pages/Toast/components/ToastItem';
import {useServerSocketContext} from 'contexts/ServerSocketContext';
import {FaUserGroup} from 'react-icons/fa6';
import styled from 'styled-components';
import {participateChatRoom} from 'api/myChatRoom';
import {useNavigate} from 'react-router-dom';

const Toast: React.FC = () => {
  const {notifyMessage} = useServerSocketContext();
  const [visibleNotifications, setVisibleNotifications] = useState<Record<string, boolean>>({});

  const mockMessages = [...Array(5)].map((_, i) => ({
    responseChat: {
      id: `mock_id_${i}`,
      name: `강남 맛집 공유방 ${i + 1}`,
      users: [{id: 'user1', username: '김땡땡', picture: 'https://...'}],
      isPrivate: false,
      updatedAt: new Date().toISOString(),
    },
    message: i % 2 === 0 ? `채팅방에 초대되었습니다. ${i + 1}` : `새로운 채팅방이 생성되었습니다. ${i + 1}`,
    isInvited: i % 2 === 0,
  }));

  useEffect(() => {
    setVisibleNotifications(
      mockMessages.reduce(
        (acc, curr) => {
          acc[curr.responseChat.id] = true;
          return acc;
        },
        {} as Record<string, boolean>,
      ),
    );
  }, []);

  const handleClose = (id: string) => {
    setVisibleNotifications(prev => ({...prev, [id]: false}));
  };

  const navigate = useNavigate();

  const joinChat = (chatId: string) => {
    console.log(chatId);
    participateChatRoom(chatId).then(() => navigate(`/chat/${chatId}`));
  };

  return ReactDOM.createPortal(
    <StyledContainer>
      <AnimatePresence>
        {mockMessages.map(
          notify =>
            visibleNotifications[notify.responseChat.id] && (
              <ToastItem
                key={notify.responseChat.id}
                onJoin={() => joinChat(notify.responseChat.id)}
                onClose={() => handleClose(notify.responseChat.id)}
                isInvited={notify.isInvited}
              >
                <StyledTitleWrapper>
                  <StyledChatTitle>{notify.responseChat.name}</StyledChatTitle>
                  <StyledUserCount>
                    <FaUserGroup />
                    {notify.responseChat.users.length}
                  </StyledUserCount>
                </StyledTitleWrapper>
                <StyledChatMessage>{notify?.message}</StyledChatMessage>
              </ToastItem>
            ),
        )}
      </AnimatePresence>
    </StyledContainer>,
    document.getElementById('toast-root') as HTMLElement,
  );
};

export default Toast;

const StyledContainer = styled.div`
  position: fixed;
  top: 30px;
  right: 30px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StyledTitleWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  margin-bottom: 0.2rem;
`;

const StyledChatTitle = styled.div`
  font-size: 1.1rem;
  font-weight: 700;
  line-height: 1.5;
`;

const StyledChatMessage = styled.div`
  ${({theme}) => theme.fonts.caption};
  color: ${({theme}) => theme.colors.gray700};
`;

const StyledUserCount = styled.div`
  font-size: 0.7rem;
  font-weight: 500;
  color: ${({theme}) => theme.colors.gray700};

  & > svg {
    width: 0.7rem;
    height: 0.7rem;
    margin-right: 0.1rem;
  }
`;
