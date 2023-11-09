export const dummyChatRoom = {
  id: 'chatId',
  name: '그룹 채팅방',
  users: [
    {
      id: 'user1',
      name: '박땡땡',
      picture: 'https://gravatar.com/avatar/c274467c5ef4fe381b154a20c5e7ce26?s=200&d=retro',
    },
    {
      id: 'user2',
      name: '김땡땡',
      picture: 'https://gravatar.com/avatar/d94869409b4e94903723612a4f93a6f9?s=200&d=retro',
    },
    {
      id: 'user3',
      name: '이땡땡',
      picture: 'https://gravatar.com/avatar/h94869409b4e96903723612a4f93a6f9?s=200&d=retro',
    },
  ],
  isPrivate: false,
  updatedAt: new Date(),
};

export const connectedUsersIds: string[] = ['user1', 'user2'];

export const postMessages = [
  {
    id: 'msg1',
    text: '안녕하세요!',
    userId: 'user1',
    createdAt: new Date(),
  },
  {
    id: 'msg2',
    text: '반갑습니다!',
    userId: 'user2',
    createdAt: new Date(),
  },
  {
    id: 'msg3',
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    userId: 'user3',
    createdAt: new Date(),
  },
];
