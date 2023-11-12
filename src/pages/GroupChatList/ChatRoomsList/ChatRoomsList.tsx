import {allChatRoom} from 'api/AllChatRoom';
import ChatRoomEl from './ChatRoomEl';
import styled from 'styled-components';
import {useEffect, useState} from 'react';

interface Chat {
  id: string;
  name: string;
  isPrivate: boolean;
  users: string[];

  updatedAt: Date;
}

const ChatLists = () => {
  const [chatRoomsList, setChatRoomsList] = useState<Chat[]>([]);

  useEffect(() => {
    allChatRoom().then(res => {
      setChatRoomsList(res.chats);
    });
  }, []);

  return (
    <StyledRoomContainer>
      {chatRoomsList?.map(room => (
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
