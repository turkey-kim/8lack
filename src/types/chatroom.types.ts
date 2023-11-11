export interface ChatRoom {
  id: string;
  name: string;
  users: User[]; // 자신을 포함한 참가자들 정보
  isPrivate: boolean;
  updatedAt: Date;
}

export interface User {
  id: string;
  username: string;
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
  joiners: Array<{id: string}>; // 새로운 참여자 id
}

export interface leaveUser {
  users: string[]; // 참여자들 id
  leaver: string; // 나간 사용자 id
}
