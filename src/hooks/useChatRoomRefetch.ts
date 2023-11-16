import {useEffect} from 'react';
import {UseQueryResult} from '@tanstack/react-query';
import {useSocketContext} from 'contexts/ChatSocketContext';
import {ChatRoom} from 'types/chatroom.types';

export const useChatRoomRefetch = (
  refetch: UseQueryResult<ChatRoom, unknown>['refetch'],
  isDrawerOpen: boolean,
): void => {
  const {eventTriggered, setEventTriggered} = useSocketContext();

  useEffect(() => {
    if (isDrawerOpen && eventTriggered) {
      refetch();
      setEventTriggered(false);
    }
  }, [isDrawerOpen, eventTriggered, refetch, setEventTriggered]);
};
