import {useQuery} from '@tanstack/react-query';
import {getChatRoom} from 'api/myChatRoom';

export const useChatRoomQuery = () => {
  return useQuery({queryKey: ['chatRoom'], queryFn: () => getChatRoom});
};
