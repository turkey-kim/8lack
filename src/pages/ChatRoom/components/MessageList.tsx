import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {useSocketContext} from 'contexts/SocketContext';
import {Message} from 'types/chatroom.types';
import {formatMessageDate} from 'utils/formatDate';

const MessageList: React.FC = () => {
  const {socket, prevMessages, messages} = useSocketContext();
  const [loadPrevMessages, setLoadPrevMessages] = useState(false);

  useEffect(() => {
    if (socket && loadPrevMessages) {
      socket.emit('fetch-messages', {});
    }
  }, [socket, loadPrevMessages]);

  const renderMessage = (message: Message) => {
    if (message.userId === 'system') {
      return <StyledSystemMessage key={message.id}>{message.text}</StyledSystemMessage>;
    }

    return (
      <StyledItem key={message.id}>
        {message.userId}
        <StyledInner>
          <StyledBubble>{message.text}</StyledBubble>
          <StyledDate>{formatMessageDate(message.createdAt)}</StyledDate>
          <StyledSpacer />
        </StyledInner>
      </StyledItem>
    );
  };

  return (
    <>
      <StyledButton onClick={() => setLoadPrevMessages(true)}>이전 대화 불러오기</StyledButton>
      <StyledList>
        {/* 이전 메시지 표시 */}
        {prevMessages.messages.map(renderMessage)}
        {/* 실시간 메시지 표시 */}
        {messages.map(renderMessage)}
      </StyledList>
    </>
  );
};
export default MessageList;

const StyledList = styled.div`
  padding: 0px 1rem 0.5rem;
  scroll-behavior: smooth;
  flex-grow: 1;
  overflow-y: auto;
  overscroll-behavior: contain;
`;
const StyledItem = styled.div`
  display: flex;
  padding: 10px 0px;
  width: 100%;
`;
const StyledInner = styled.div`
  flex: 1;
  display: flex;
  align-items: flex-end;
  margin-left: 0.8rem;
`;
const StyledButton = styled.button`
  background-color: ${({theme}) => theme.colors.blue700};
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  margin: 10px 0;
  cursor: pointer;

  &:hover {
    background-color: ${({theme}) => theme.colors.blue700};
  }
`;
const StyledSystemMessage = styled.div`
  text-align: center;
  color: ${({theme}) => theme.colors.gray700};
  padding: 10px;
`;
// const StyledAvatar = styled.img`
//   width: 30px;
//   height: 30px;
//   border-radius: 50%;
//   overflow: hidden;
// `;
const StyledBubble = styled.span`
  word-break: break-all;
  background-color: ${({theme}) => theme.colors.blue700};
  color: ${({theme}) => theme.colors.white};
  padding: 0.8em 1.1rem;
  border-radius: 1rem;
  max-width: 500px;
  overflow-wrap: break-word;
`;
const StyledDate = styled.span`
  margin-left: 0.4rem;
`;
const StyledSpacer = styled.div`
  flex: 1;
`;
