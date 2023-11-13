import React from 'react';
import {useParams} from 'react-router-dom';
import {ChatSocketProvider} from 'contexts/ChatSocketContext';
import Chat from 'pages/ChatRoom/components/Chat';
import styled from 'styled-components';
import {SERVER_URL} from 'constant/constant';

function ChatRoom() {
  const {chatId} = useParams();
  const SOCKET_URL = `${SERVER_URL}/chat?chatId=${chatId}`;

  return (
    <StyledContainer>
      <ChatSocketProvider id={`Room_${chatId}`} url={SOCKET_URL}>
        <Chat chatId={chatId!} />
      </ChatSocketProvider>
    </StyledContainer>
  );
}
export default ChatRoom;

const StyledContainer = styled.div`
  overflow: hidden;
  width: 100%;
`;
