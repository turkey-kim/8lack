import PrivateChat from './PrivateChat';
import useSortedSidebarChat from 'hooks/useSortedSidebarChat';

export default function PrivateChats() {
  const sortedChat = useSortedSidebarChat();

  return <ul>{sortedChat.map(room => room.isPrivate && <PrivateChat key={room.id} data={room} />)}</ul>;
}
