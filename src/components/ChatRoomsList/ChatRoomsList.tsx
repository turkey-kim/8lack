import ChatRoomEl from './ChatRoomEl';
import styled from 'styled-components';

interface Message {
  id: string;
  text: string;
  userId: string;

  createdAt: Date;
}

interface Chat {
  id: string;
  name: string;
  isPrivate: boolean;
  users: string[];
  messages: Message[]; // message 객체가 속합니다.

  updatedAt: Date;
}

const ChatLists = () => {
  const chatRoomsList: Chat[] = [
    {
      id: 'string1',
      name: '김팔락의 채팅방',
      isPrivate: false,
      users: ['김팔락', '정범환', '김이나'],
      messages: [],

      updatedAt: new Date(),
    },
    {
      id: 'string2',
      name: '그룹채팅방2',
      isPrivate: false,
      users: ['aaa', 'bbb', 'ccc'],
      messages: [],

      updatedAt: new Date(),
    },
    {
      id: 'string3',
      name: '끝말잇기 방',
      isPrivate: false,
      users: ['aaa', 'bbb', 'ccc'],
      messages: [],

      updatedAt: new Date(),
    },
    {
      id: 'string4',
      name: '대전 향우회',
      isPrivate: false,
      users: ['김대전', '박충북', '서충남'],
      messages: [],

      updatedAt: new Date(),
    },
  ];

  return (
    <StyledRoomContainer>
      {chatRoomsList.map(room => (
        <ChatRoomEl key={room.id} data={room} />
      ))}
    </StyledRoomContainer>
  );
};

export default ChatLists;

const StyledRoomContainer = styled.div`
  height: calc(100vh - 17.75rem);
  overflow: scroll;
`;
