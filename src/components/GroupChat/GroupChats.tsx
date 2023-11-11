import React from 'react';
import {dummyPrivateRooms} from '../PrivateChat/dummyPrivateRooms';
import GroupChat from './GroupChat';

export default function GroupChats() {
  return (
    <ul>
      {dummyPrivateRooms.map(room => {
        return !room.isPrivate && <GroupChat key={room.id} data={room} />;
      })}
    </ul>
  );
}
