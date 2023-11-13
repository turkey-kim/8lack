interface Chat {
  id: string;
  name: string;
  users: string[]; // 속한 유저 id
  isPrivate: boolean;

  updatedAt: Date;
}

const dummyChatRoomsList: Chat[] = [
  {
    id: 'string1',
    name: '김팔락의 채팅방',
    isPrivate: false,
    users: ['김팔락', '정범환', '김이나'],

    updatedAt: new Date(),
  },
  {
    id: 'string2',
    name: '그룹채팅방2',
    isPrivate: false,
    users: ['aaa', 'bbb', 'ccc'],

    updatedAt: new Date(),
  },
  {
    id: 'string3',
    name: '끝말잇기 방',
    isPrivate: false,
    users: ['aaa', 'bbb', 'ccc'],

    updatedAt: new Date(),
  },
  {
    id: 'string4',
    name: '대전 향우회',
    isPrivate: false,
    users: ['김대전', '박충북', '서충남'],

    updatedAt: new Date(),
  },
];

export default dummyChatRoomsList;
