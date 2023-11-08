import React, {useState} from 'react';
import {ISendMessage} from './SendMessage.types';

const SendMessage: React.FC<ISendMessage> = ({onSendMessage}) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSendMessage(message);
    setMessage('');
  };

  return (
    <form className="chat-input" onSubmit={handleSubmit}>
      <input type="text" placeholder="메시지를 입력하세요" value={message} onChange={e => setMessage(e.target.value)} />
      <button type="submit">전송</button>
    </form>
  );
};

export default SendMessage;
