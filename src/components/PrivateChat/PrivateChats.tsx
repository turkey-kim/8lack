import PrivateChat from './PrivateChat';
import {dummyPrivateRooms} from './dummyPrivateRooms';

export default function PrivateChats() {
  return (
    <div>
      {dummyPrivateRooms.map(room => {
        return <PrivateChat />;
      })}
    </div>
  );
}
