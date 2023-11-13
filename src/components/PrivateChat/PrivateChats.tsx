import PrivateChat from './PrivateChat';
import styled from 'styled-components';
import {theme} from '../../styles/Theme';
import useSortedSidebarChat from 'hooks/useSortedSidebarChat';

export default function PrivateChats() {
  const sortedChat = useSortedSidebarChat();

  return (
    <StyledContainer>
      {sortedChat.map(room => room.isPrivate && <PrivateChat key={room.id} data={room} />)}
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
