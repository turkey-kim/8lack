import {useNavigate} from 'react-router-dom';
import {useSetRecoilState} from 'recoil';
import {createdChatIdState} from 'states/atom';

import {makeChatRoom} from 'api/myChatRoom';
import {ChatRoom} from 'types/chatroom.types';

export const useChatCreation = () => {
  const navigate = useNavigate();
  const setCreatedChatId = useSetRecoilState(createdChatIdState);

  const createChatRoom = async (chatName: string, users: string[], isPrivate: boolean) => {
    const res: ChatRoom = await makeChatRoom(chatName, users, isPrivate);
    setCreatedChatId(oldId => [...oldId, res.id]);
    navigate(`/chat/${res.id}`);
  };

  return createChatRoom;
};
