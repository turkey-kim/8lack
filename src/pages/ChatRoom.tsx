import React from 'react';
import Chat from '../components/Chat/Chat';
import styled from 'styled-components';

function ChatRoom() {
  return (
    <StyledContainer>
      <Chat />
    </StyledContainer>
  );
}

export default ChatRoom;

const StyledContainer = styled.div`
  overflow: hidden;
  width: 100%;
`;
