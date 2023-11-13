import {useEffect, useState} from 'react';
import GroupChat from './GroupChat';
import {StyledContainer} from 'components/PrivateChat/PrivateChats';
import {IChat} from 'types/chatroom.types';
import useRealTimeUpdate from 'hooks/useRealTimeUpdate';

export default function GroupChats() {
  const [sortedChat, setSortedChat] = useState<IChat[]>([]);
  const {
    updateQuery: {isLoading, data: realTimeData},
  } = useRealTimeUpdate();

  useEffect(() => {
    if (!isLoading && realTimeData) {
      const sorted = realTimeData.chats
        .filter((room: IChat) => !room.isPrivate)
        .sort((a: IChat, b: IChat) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
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
