import ChatRoomEl from './GroupChatRoomEl';
import styled from 'styled-components';
import {Chat} from 'types/chatroom.types';

interface GroupChatRoomsLayoutProps {
  filteredGroupChat: Chat[];
  onSetGroupChat: React.Dispatch<React.SetStateAction<Chat[]>>;
}

const GroupChatRoomsLayout = (props: GroupChatRoomsLayoutProps) => {
  return (
    <StyledRoomContainer>
      {props.filteredGroupChat.map(room => (
        <ChatRoomEl key={room.id} data={room} />
      ))}
    </StyledRoomContainer>
  );
};

export default GroupChatRoomsLayout;

const StyledRoomContainer = styled.div`
  height: calc(100vh - 17.75rem);
  overflow: scroll;
`;