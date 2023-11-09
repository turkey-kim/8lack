import {Message} from 'types/chatroom.types';
import {User} from 'types/chatroom.types';

export interface MessageListProps {
  messages: Message[];
  usersMap: Record<string, User>;
}
