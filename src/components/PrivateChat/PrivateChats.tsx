import {useEffect, useState} from 'react';
import PrivateChat, {Chat} from './PrivateChat';
import {dummyPrivateRooms} from './dummyPrivateRooms';
import styled from 'styled-components';
import {theme} from '../../styles/Theme';

export default function PrivateChats() {
  const [sortedChat, setSortedChat] = useState<Chat[]>([]);

  useEffect(() => {
    const sorted = [...dummyPrivateRooms]
      .filter(room => room.isPrivate)
      .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
    setSortedChat(sorted);
  }, []);

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
