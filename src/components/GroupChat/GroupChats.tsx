import React, {useEffect, useState} from 'react';
import GroupChat from './GroupChat';
import {myChatRoom} from 'api/myChatRoom';
import {StyledContainer} from 'components/PrivateChat/PrivateChats';
import {Chat} from 'types/chatroom.types';

export default function GroupChats() {
  const [myGroupChat, setMyGroupChat] = useState<Chat[]>([]);
  const [sortedChat, setSortedChat] = useState<Chat[]>([]);

  useEffect(() => {
    myChatRoom().then(room => {
      setMyGroupChat(room.chats);
    });
  }, []);

  useEffect(() => {
    const sorted = [...myGroupChat]
      .filter(room => !room.isPrivate)
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
    setSortedChat(sorted);
  }, [myGroupChat]);

  return (
    <StyledContainer>
      {sortedChat.map(room => {
        return <GroupChat key={room.id} data={room} />;
      })}
    </StyledContainer>
  );
}
