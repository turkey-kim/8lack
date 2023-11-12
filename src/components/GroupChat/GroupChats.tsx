import {useEffect, useState} from 'react';
import GroupChat from './GroupChat';
import {StyledContainer} from 'components/PrivateChat/PrivateChats';
import {Chat} from 'types/chatroom.types';
import useRealTimeUpdate from 'hooks/useRealTimeUpdate';

export default function GroupChats() {
  const [sortedChat, setSortedChat] = useState<Chat[]>([]);
  const {
    updateQuery: {isLoading, data: realTimeData},
  } = useRealTimeUpdate();

  useEffect(() => {
    if (!isLoading && realTimeData) {
      const sorted = realTimeData.chats
        .filter((room: Chat) => !room.isPrivate)
        .sort((a: Chat, b: Chat) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
      setSortedChat(sorted);
    }
  }, [isLoading, realTimeData]);

  return (
    <StyledContainer>
      {sortedChat.map(room => {
        return <GroupChat key={room.id} data={room} />;
      })}
    </StyledContainer>
  );
}
