import {atom, selector} from 'recoil';
import {recoilPersist} from 'recoil-persist';
import {IChatRoom, IUserInfo} from 'types/chatroom.types';

const {persistAtom} = recoilPersist({
  key: 'localStorage',
  storage: localStorage,
});

export const loginState = atom({
  key: 'loginState',
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const userInformation = atom({
  key: 'userInformation',
  default: {
    id: '',
    name: '',
    picture: '',
  },
});

export const onlineUserList = atom({
  key: 'onlineUserList',
  default: [],
});

export const isStarBtnClicked = atom({
  key: 'isStarBtnClicked',
  default: false,
});

export const chatRoomState = atom<IChatRoom | null>({
  key: 'chatRoomState',
  default: null,
});

export const chatRoomUsersSelector = selector<Record<string, IUserInfo> | null>({
  key: 'chatRoomUsersSelector',
  get: ({get}) => {
    const chatRoom = get(chatRoomState);
    if (chatRoom) {
      const map: Record<string, IUserInfo> = {};
      for (const user of chatRoom.users) {
        map[user.id] = user;
      }
      return map;
    }
    return null;
  },
});
