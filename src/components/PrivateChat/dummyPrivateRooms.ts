export const dummyPrivateRooms = [
  {
    id: 'id1',
    name: 'chat room 1',
    users: [
      {
        id: 'user1',
        name: '장수빈',
        picture: 'https://gravatar.com/avatar/c274467c5ef4fe381b154a20c5e7ce26?s=200&d=retro',
      },
      {
        id: 'user2',
        name: '장모락',
        picture: 'https://gravatar.com/avatar/d94869409b4e94903723612a4f93a6f9?s=200&d=retro',
      },
    ],
    isPrivate: true,
    updatedAt: new Date('2022-11-10'),
    latestMessage: null,
  },
  {
    id: 'id123',
    name: 'chat room 1ff',
    users: [
      {
        id: 'user1',
        name: '장수빈',
        picture: 'https://gravatar.com/avatar/c274467c5ef4fe381b154a20c5e7ce26?s=200&d=retro',
      },
      {
        id: 'user2',
        name: '민모리',
        picture: 'https://gravatar.com/avatar/d94869409b4e94903723612a4f93a6f9?s=200&d=retro',
      },
    ],
    isPrivate: true,
    updatedAt: new Date('2020-1-10'),
    latestMessage: null,
  },

  {
    id: 'id2',
    name: 'chat room 2',
    users: [
      {
        id: 'user122',
        name: '장수빈',
        picture: 'https://gravatar.com/avatar/c274467c5ef4fe381b154a20c5e7ce26?s=200&d=retro',
      },
      {
        id: 'user222',
        name: '김머시기',
        picture: 'https://gravatar.com/avatar/d94869409b4e94903723612a4f93a6f9?s=200&d=retro',
      },
    ],
    isPrivate: false,
    updatedAt: new Date('2023-10-23'),
    latestMessage: {
      id: '8f7f67bb-f1ab-4792-9678-0b8546adcb6f',
      text: '밥먹었니?',
      userId: 'test:test6',
      createdAt: new Date(),
    },
  },
  {
    id: 'id3',
    name: 'chat room 3',
    users: [
      {
        id: 'user1ffff22',
        name: '장수빈',
        picture: 'https://gravatar.com/avatar/c274467c5ef4fe381b154a20c5e7ce26?s=200&d=retro',
      },
      {
        id: 'user2fff22',
        name: '김파락',
        picture: 'https://gravatar.com/avatar/d94869409b4e94903723612a4f93a6f9?s=200&d=retro',
      },
    ],
    isPrivate: true,
    updatedAt: new Date('2023-11-10'),
    latestMessage: {
      id: '8f7f67bb-f1ab-4792-9678-0b8546adcb6f',
      text: '뭐해?',
      userId: 'test:test6',
      createdAt: new Date(),
    },
  },
];
