import NoSearchResult from 'components/NoSearchResult';
import ChatRoomEl from './GroupChatRoomEl';
import styled from 'styled-components';
import {IChat} from 'types/chatroom.types';

interface GroupChatRoomsLayoutProps {
  filteredGroupChat: IChat[];
  onSetGroupChat: React.Dispatch<React.SetStateAction<IChat[]>>;
}

const GroupChatRoomsLayout = (props: GroupChatRoomsLayoutProps) => {
  return (
    <StyledRoomContainer>
      {props.filteredGroupChat.length ? (
        props.filteredGroupChat.map(room => <ChatRoomEl key={room.id} data={room} />)
      ) : (
        <NoSearchResult text="조건에 맞는 그룹채팅방이 없습니다" />
      )}
    </StyledRoomContainer>
  );
};

export default GroupChatRoomsLayout;

const StyledRoomContainer = styled.div`
  height: calc(100vh - 17.75rem);
  overflow: scroll;
`;
