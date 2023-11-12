import {allChatRoom} from 'api/allChatRoom';
import {myChatRoom} from 'api/myChatRoom';
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
    const fetchData = async () => {
      try {
        const allChat = await allChatRoom();
        const myChat = await myChatRoom();
        const refinedAllChat: Chat[] = allChat.chats;
        const refinedMyChat: Chat[] = myChat.chats;
        // console.log(refinedAllChat);
        console.log(refinedMyChat, 'MyChatList');

        const filtered = refinedAllChat.filter(allChat => {
          for (let i = 0; i < refinedMyChat.length; i++) {
            if (allChat.id === refinedMyChat[i].id) {
              console.log(allChat.id, 'allChat id', refinedMyChat[i].id, 'refinedMyId');
              return false;
            }
          }
          return true;
        });

        setChatRoomsList(filtered);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
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
