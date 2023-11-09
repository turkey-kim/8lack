import {User} from 'types/chatroom.types';

export interface MessageListProps {
  chatId: string;
  usersMap?: Record<string, User>;
}
