export interface ChatRoom {
  id: string;
  name: string;
  users: User[]; // 자신을 포함한 참가자들 정보
  isPrivate: boolean;
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
