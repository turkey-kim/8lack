import React from 'react';
import styled from 'styled-components';
import {MessageListProps} from './Message.types';

const MessageList: React.FC<MessageListProps> = ({messages, usersMap}) => {
  return (
    <StyledList>
      {messages.map(message => {
        const user = usersMap[message.userId];
        // TODO: 박나영 utils로 분리
        const formattedDate = message.createdAt.toLocaleString('ko-KR', {
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
        });

        return (
          <StyledItem key={message.id}>
            <StyledAvatar src={user?.picture} alt={user?.name} />
            <StyledInner>
              <StyledBubble>{message.text}</StyledBubble>
              <StyledDate>{formattedDate}</StyledDate>
              <StyledSpacer />
            </StyledInner>
          </StyledItem>
        );
      })}
    </StyledList>
  );
};

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
const StyledAvatar = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  overflow: hidden;
`;
const StyledBubble = styled.span`
  word-break: break-all;
  background-color: ${({theme}) => theme.colors.blue700};
  color: ${({theme}) => theme.colors.white};
  padding: 0.66em 0.68rem;
  border-radius: 10px;
  max-width: 300px;
  overflow-wrap: break-word;
`;
const StyledDate = styled.span`
  margin-left: 0.4rem;
`;
const StyledSpacer = styled.div`
  flex: 1;
`;

export default MessageList;
