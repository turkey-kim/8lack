import {useEffect, useState} from 'react';
import PrivateChat from './PrivateChat';
import {IChat} from 'types/chatroom.types';
import styled from 'styled-components';
import {theme} from '../../styles/Theme';
import useRealTimeUpdate from 'hooks/useRealTimeUpdate';

export default function PrivateChats() {
  const [sortedChat, setSortedChat] = useState<IChat[]>([]);
  const {
    updateQuery: {isLoading, data: realTimeData},
  } = useRealTimeUpdate();

  useEffect(() => {
    if (!isLoading && realTimeData) {
      const sorted = realTimeData.chats
        .filter((room: IChat) => room.isPrivate)
        .sort((a: IChat, b: IChat) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
      setSortedChat(sorted);
    }
  }, [isLoading, realTimeData]);

  return (
    <StyledContainer>
      {sortedChat.map(room => (
        <PrivateChat key={room.id} data={room} />
      ))}
    </StyledContainer>
  );
}

export const StyledContainer = styled.ul`
  height: 34rem;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 6px;
    background: ${theme.colors.gray100};
  }
  &::-webkit-scrollbar-thumb {
    background: ${theme.colors.gray300};
    border-radius: 6px;
  }
`;
