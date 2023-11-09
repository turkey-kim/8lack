import {User, UserID} from 'types/chatroom.types';

export interface IDrawer {
  isOpen: boolean;
  onClose: () => void;
  chatId: string;
  usersMap?: Record<UserID, User>;
}
