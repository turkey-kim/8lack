import {User} from 'types/chatroom.types';

export interface IDrawer {
  isOpen: boolean;
  onClose: () => void;

  isModalOpen: boolean;
  onModalClose: React.Dispatch<boolean>;
  onModalOpen: () => void;

  usersMap?: Record<string, User>;
}
