import NoSearchResult from 'components/NoSearchResult';
import ChatRoomEl from './GroupChatRoomEl';
import styled from 'styled-components';
import {IChat} from 'types/chatroom.types';
import {FixedSizeList as List} from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

interface GroupChatRoomsLayoutProps {
  filteredGroupChat: IChat[];
  onSetGroupChat: React.Dispatch<React.SetStateAction<IChat[]>>;
}

const GroupChatRoomsLayout = (props: GroupChatRoomsLayoutProps) => {
  return (
    <StyledRoomContainer>
      {props.filteredGroupChat.length ? (
        <AutoSizer>
          {({height, width}: {height: number; width: number}) => (
            <List
              height={height}
              width={width}
              itemCount={props.filteredGroupChat.length}
              itemSize={156}
              itemData={props.filteredGroupChat}
            >
              {ChatRoomEl}
            </List>
          )}
        </AutoSizer>
      ) : (
        <NoSearchResult text="조건에 맞는 그룹채팅방이 없습니다" />
      )}
    </StyledRoomContainer>
  );
};

export default GroupChatRoomsLayout;

const StyledRoomContainer = styled.div`
  height: calc(100vh - 17.75rem);
  overflow-x: hidden;
  overflow-y: scroll;
  scrollbar-width: none; /* 파이어폭스 */

  &::-webkit-scrollbar {
    display: none;
  }
`;
