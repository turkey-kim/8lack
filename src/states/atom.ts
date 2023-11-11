import {atom} from 'recoil';
import {recoilPersist} from 'recoil-persist';

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
