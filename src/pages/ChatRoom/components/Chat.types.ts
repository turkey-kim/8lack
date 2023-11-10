// 요청 데이터 타입
export interface ChatRoomParticipateRequest {
  chatId: string;
}

// 응답 데이터 타입
export interface ChatRoomResponse {
  id: string;
  name: string;
  users: User[];
  isPrivate: boolean;
  updatedAt: Date;
}

export interface User {
  id: string;
  username: string;
  picture: string;
}
