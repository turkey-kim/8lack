import {atom} from 'recoil';
import {ChatRoom} from 'types/chatroom.types';

export const chatRoomState = atom<ChatRoom | null>({
  key: 'chatRoomState',
  default: null,
});
