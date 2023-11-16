export interface Iinvite {
  responseChat: ResponseChat;
  message: string;
  title: string;
  avatar: string | null;
  type: string;
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
