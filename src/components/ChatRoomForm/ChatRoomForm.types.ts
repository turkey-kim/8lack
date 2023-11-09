// 요청 데이터 타입
export interface ChatRoomCreateRequest {
  name: string;
  users: string[];
  isPrivate?: boolean;
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
  name: string;
  picture: string;
}
