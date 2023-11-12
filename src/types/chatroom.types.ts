export interface ChatRoom {
  id: string;
  name: string;
  users: User[]; // 자신을 포함한 참가자들 정보
  isPrivate: boolean;
  updatedAt: Date;
}

export interface Chat {
  id: string;
  name: string;
  users: User[]; // 속한 유저 id
  isPrivate: boolean;
  latestMessage: Message | null;
  updatedAt: Date;
}

export interface User {
  id: string;
  name: string;
  picture: string;
}

export interface Message {
  id: string;
  text: string;
  userId: string;
  createdAt: Date;
}

export interface PrevMessage {
  messages: Message[];
}

export interface UserID {
  users: string[];
}

export interface NewUser {
  users: string[]; // 참여자들 id
  joiners: string[]; // 새로운 참여자 id
}

export interface leaveUser {
  users: string[]; // 참여자들 id
  leaver: string; // 나간 사용자 id
}

export interface Props {
  key: string;
  data: Chat;
}
