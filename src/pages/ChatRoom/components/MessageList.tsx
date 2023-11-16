import React, {useEffect, useState, useRef, useMemo} from 'react';
import styled from 'styled-components';
import {useSocketContext} from 'contexts/ChatSocketContext';
import {groupMessagesByDate} from 'utils/formatDate';
import MessageItem from './MessageItem';
import {Message} from 'types/chatroom.types';
import {useUid} from 'hooks/useUid';

const MessageList: React.FC = () => {
  const {socket, prevMessages, messages} = useSocketContext();
  const [allMessages, setAllMessages] = useState<Message[]>([]);
  const messageRef = useRef<HTMLDivElement>(null);

  const groupedMessages = useMemo(() => groupMessagesByDate(allMessages), [allMessages]);

  // 이전 대화 불러오기
  useEffect(() => {
    if (socket) {
      socket.emit('fetch-messages', {});
    }
  }, [socket]);

  // 메시지 중복 제거
  useEffect(() => {
    const combinedMessages = [...prevMessages.messages, ...messages];
    const uniqueMessages = Array.from(new Map(combinedMessages.map(msg => [msg.id, msg])).values());
    setAllMessages(uniqueMessages);
  }, [messages, prevMessages]);

  // 스크롤 조정
  useEffect(() => {
    if (messageRef.current) {
      const list = messageRef.current;
      list.scrollTop = list.scrollHeight;
    }
  }, [allMessages]);

  const {uid, isLoading, error} = useUid();
  if (isLoading) return null;
  if (error) return <div>인증이 실패 했습니다</div>;

  return (
    <StyledList ref={messageRef}>
      {Object.entries(groupedMessages).map(([date, msgs]) => (
        <div key={date}>
          <StyledDateHeader>{date}</StyledDateHeader>
          {msgs.map(msg => (
            <MessageItem key={msg.id} message={msg} isCurrentUser={msg.userId === uid} />
          ))}
        </div>
      ))}
    </StyledList>
  );
};

export default MessageList;

const StyledDateHeader = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 10px;
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: -0.05px;
  color: ${({theme}) => theme.colors.gray700};
`;

const StyledList = styled.div`
  padding: 0px 1.5rem 0.5rem;
  scroll-behavior: smooth;
  flex-grow: 1;
  overflow-y: auto;
  overscroll-behavior: contain;
`;
