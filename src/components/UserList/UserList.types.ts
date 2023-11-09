import {User} from 'types/chatroom.types';

export interface IUserList {
  connectedUserIds: string[];
  usersMap: Record<string, User>;
}
