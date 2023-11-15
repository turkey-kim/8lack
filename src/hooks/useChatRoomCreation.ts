import {useNavigate} from 'react-router-dom';
import {makeChatRoom} from 'api/myChatRoom';
import {ChatRoom} from 'types/chatroom.types';

export const useChatCreation = () => {
  const navigate = useNavigate();

  const createChatRoom = async (chatName: string, users: string[], isPrivate: boolean): Promise<ChatRoom> => {
    const res: ChatRoom = await makeChatRoom(chatName, users, isPrivate);
    sessionStorage.setItem('chatId', res.id);

    setTimeout(() => {
      sessionStorage.removeItem('chatId');
    }, 60000);

    navigate(`/chat/${res.id}`);
    return res;
  };

  return createChatRoom;
};
