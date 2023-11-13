import GroupChat from './GroupChat';
import {StyledContainer} from 'components/PrivateChat/PrivateChats';
import useSortedSidebarChat from 'hooks/useSortedSidebarChat';

export default function GroupChats() {
  const sortedChat = useSortedSidebarChat();
  return (
    <StyledContainer>
      {sortedChat.map(room => !room.isPrivate && <GroupChat key={room.id} data={room} />)}
    </StyledContainer>
  );
}
