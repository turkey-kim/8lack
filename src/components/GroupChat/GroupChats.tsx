import GroupChat from './GroupChat';
import useSortedSidebarChat from 'hooks/useSortedSidebarChat';

export default function GroupChats() {
  const sortedChat = useSortedSidebarChat();
  return <ul>{sortedChat.map(room => !room.isPrivate && <GroupChat key={room.id} data={room} />)}</ul>;
}
