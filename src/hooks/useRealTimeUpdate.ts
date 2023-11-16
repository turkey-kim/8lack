import {myChatRoom} from 'api/myChatRoom';
import {useQuery} from '@tanstack/react-query';

export default function useRealTimeUpdate() {
  const updateQuery = useQuery({
    queryKey: ['message'],
    queryFn: myChatRoom,
    refetchInterval: 1000,
    refetchIntervalInBackground: true,
  });

  return {updateQuery};
}
