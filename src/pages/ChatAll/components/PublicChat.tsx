import React from 'react';
import styled from 'styled-components';
import ChatRoomForm from './ChatRoomForm';

function PublicChat() {
  return (
    <ul>
      <ChatRoomForm />
    </ul>
  );
}

export default PublicChat;

export const StyledChatBox = styled.li`
  border: 1px solid;
  border-radius: 15px;
  padding: 1rem;
`;
