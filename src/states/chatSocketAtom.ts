import {atom} from 'recoil';
import {Socket} from 'socket.io-client';

export const chatSocketState = atom<Socket | null>({
  key: 'chatSocketState',
  default: null,
});
