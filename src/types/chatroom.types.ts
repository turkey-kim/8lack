export interface ChatRoom {
  id: string;
  name: string;
  users: User[]; // 자신을 포함한 참가자들 정보
  isPrivate: boolean;
  updatedAt: Date;
}

export interface IChat {
  id: string;
  name: string;
  users: User[];
  isPrivate: boolean;
  latestMessage: Message | null;
  updatedAt: Date;
}

export interface User {
  id: string;
  name: string;
  username: string;
  picture: string;
}

export type IChatRoom = Pick<IChat, 'id' | 'name' | 'isPrivate' | 'latestMessage' | 'updatedAt'> & {users: IUserInfo[]};
export type IUserInfo = Omit<User, 'name'> & {username: string};

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

// export interface NewUser {
//   users: string[]; // 참여자들 id
//   joiners: string[]; // 새로운 참여자 id
// }

interface JoinerInfo {
  exp: number;
  iat: number;
  id: string;
}

export interface NewUser {
  users: string[]; // 모든 참여자들의 id
  joiners: JoinerInfo[]; // 새로운 참여자 정보
}

export interface leaveUser {
  users: string[]; // 참여자들 id
  leaver: string; // 나간 사용자 id
}

export interface Props {
  key: string;
  data: IChat;
}
