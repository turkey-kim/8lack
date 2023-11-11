import {User} from 'types/chatroom.types';

export interface IDrawer {
  isOpen: boolean;
  onClose: () => void;
  usersMap?: Record<string, User>;
}
