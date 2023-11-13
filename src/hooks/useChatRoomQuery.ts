import {useQuery} from '@tanstack/react-query';
import {getChatRoom} from 'api/myChatRoom';

export const useChatRoomQuery = (chatId: string) => {
  return useQuery({queryKey: ['chatRoom', chatId], queryFn: () => getChatRoom(chatId)});
};
