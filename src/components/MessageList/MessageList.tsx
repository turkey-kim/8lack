import React from 'react';
import {Message} from 'types/chatroom.types';
import {User} from 'types/chatroom.types';

interface MessageListProps {
  messages: Message[];
  usersMap: Record<string, User>;
}

const MessageList: React.FC<MessageListProps> = ({messages, usersMap}) => {
  return (
    <>
      {messages.map(message => {
        const user = usersMap[message.userId];
        const formattedDate = message.createdAt.toLocaleString();
        return (
          <div className="message" key={message.id}>
            <div className="message-info">
              <img src={user?.picture} alt={user?.name} />
            </div>
            <div className="message-text">{message.text}</div>
            <span className="message-date">{formattedDate}</span>
          </div>
        );
      })}
    </>
  );
};

export default MessageList;
