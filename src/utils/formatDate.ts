import {PrevMessage, Message} from 'types/chatroom.types';

export const formatMessageDate = (data: Date) => {
  return new Date(data).toLocaleString('ko-KR', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
};

export const groupMessagesByDate = (prevMessages: PrevMessage) => {
  const dateGroupedMessages: {[date: string]: Message[]} = {};

  prevMessages.messages.forEach(message => {
    const messageDate = new Date(message.createdAt).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
    });

    if (!dateGroupedMessages[messageDate]) {
      dateGroupedMessages[messageDate] = [];
    }
    dateGroupedMessages[messageDate].push(message);
  });

  return dateGroupedMessages;
};
