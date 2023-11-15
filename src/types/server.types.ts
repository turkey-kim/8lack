export interface Iinvite {
  responseChat: ResponseChat;
  message?: string;
  isInvited?: boolean;
  isVisible?: boolean;
}

export interface ResponseChat {
  id: string;
  name: string;
  users: User[];
  isPrivate: boolean;
  updatedAt: string;
}

export interface User {
  id: string;
  username: string;
  picture: string;
}
