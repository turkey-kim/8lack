import React, {useEffect, useState, useRef} from 'react';
import styled from 'styled-components';
import {useSocketContext} from 'contexts/SocketContext';
import {groupMessagesByDate} from 'utils/formatDate';
import MessageItem from './MessageItem';

const MessageList: React.FC = () => {
  const {socket, prevMessages, messages} = useSocketContext();
  const groupedMessages = groupMessagesByDate(prevMessages);
  const [loadPrevMessages, setLoadPrevMessages] = useState(false);
  const uid = localStorage.getItem('8lack_uid');
  const messageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messageRef.current) {
      const list = messageRef.current;
      const shouldScroll = list.scrollHeight - list.clientHeight <= list.scrollTop + 150;

      if (shouldScroll) {
        list.scrollTop = list.scrollHeight;
      }
    }
  }, [messages.length]);

  useEffect(() => {
    if (socket && loadPrevMessages) {
      socket.emit('fetch-messages', {});
    }
  }, [socket, loadPrevMessages]);

  // 이전 메시지 렌더링
  const renderGroupedMessages = () =>
    Object.entries(groupedMessages).map(([date, messages]) => (
      <div key={date}>
        <StyledDateHeader>{date}</StyledDateHeader>
        {messages.map(message => (
          <MessageItem key={message.id} message={message} isCurrentUser={message.userId === uid} />
        ))}
      </div>
    ));

  // 실시간 메시지 렌더링
  return (
    <>
      <StyledButton onClick={() => setLoadPrevMessages(true)}>이전 대화 불러오기</StyledButton>
      <StyledList ref={messageRef}>
        {renderGroupedMessages()}
        {messages.map(message => (
          <MessageItem key={message.id} message={message} isCurrentUser={message.userId === uid} />
        ))}
      </StyledList>
    </>
  );
};

export default MessageList;

const StyledDateHeader = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 10px;
  font-size: 0.85rem;
`;

const StyledList = styled.div`
  padding: 0px 1rem 0.5rem;
  scroll-behavior: smooth;
  flex-grow: 1;
  overflow-y: auto;
  overscroll-behavior: contain;
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
