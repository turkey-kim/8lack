import {useEffect, useState} from 'react';
import PrivateChat, {Chat} from './PrivateChat';
import {dummyPrivateRooms} from './dummyPrivateRooms';

export default function PrivateChats() {
  const [sortedChat, setSortedChat] = useState<Chat[]>([]);

  useEffect(() => {
    const sorted = [...dummyPrivateRooms]
      .filter(room => room.isPrivate)
      .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
    setSortedChat(sorted);
  }, []);
  return (
    <ul>
      {sortedChat.map(room => (
        <PrivateChat key={room.id} data={room} />
      ))}
    </ul>
  );
}
