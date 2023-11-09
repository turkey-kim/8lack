import {User, UserID} from 'types/chatroom.types';

export interface IDrawer {
  isOpen: boolean;
  onClose: () => void;
  connectedUserIds: UserID[];
  usersMap: Record<UserID, User>;
}
