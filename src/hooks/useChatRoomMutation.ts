import {useMutation} from '@tanstack/react-query';
import {useNavigate} from 'react-router-dom';
import {useSetRecoilState} from 'recoil';
import {createdChatIdState} from 'states/atom';
import {makeChatRoom} from 'api/myChatRoom';
import {ChatRoom} from 'types/chatroom.types';

interface IProps {
  chatName: string;
  users: string[];
  isPrivate: boolean;
}

export const useChatCreation = () => {
  const navigate = useNavigate();
  const setCreatedChatId = useSetRecoilState(createdChatIdState);
  const {mutateAsync} = useMutation<ChatRoom, Error, IProps>({
    mutationFn: async variables => {
      return await makeChatRoom(variables.chatName, variables.users, variables.isPrivate);
    },
    onSuccess: data => {
      setCreatedChatId(oldIds => [...oldIds, data.id]);
      navigate(`/chat/${data.id}`);
    },
  });

  const createChatRoom = async (chatName: string, users: string[], isPrivate: boolean) => {
    return await mutateAsync({chatName, users, isPrivate});
  };

  return {createChatRoom};
};
