import React from 'react';
import styled from 'styled-components';

function PublicChat() {
  return (
    <ul>
      <StyledChatBox>그룹채팅방</StyledChatBox>
      <StyledChatBox>그룹채팅방</StyledChatBox>
      <StyledChatBox>그룹채팅방</StyledChatBox>
    </ul>
  );
}

export default PublicChat;

export const StyledChatBox = styled.li`
  border: 1px solid;
  border-radius: 15px;
  padding: 1rem;
`;
