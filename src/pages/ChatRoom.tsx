import React from 'react';
import {useParams} from 'react-router-dom';
import Chat from 'components/Chat/Chat';
import styled from 'styled-components';

function ChatRoom() {
  const {chatId} = useParams();
  return (
    <StyledContainer>
      <Chat chatId={chatId!} />
    </StyledContainer>
  );
}

export default ChatRoom;

const StyledContainer = styled.div`
  overflow: hidden;
  width: 100%;
`;
