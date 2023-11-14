import {useQuery} from '@tanstack/react-query';
import {useEffect} from 'react';
import {authCheck} from 'api/auth';

export const useUid = () => {
  const {data, isLoading, error} = useQuery({
    queryKey: ['auth'],
    queryFn: authCheck,
    initialData: () => {
      const storedUid = sessionStorage.getItem('authData');
      return storedUid ? {user: {id: JSON.parse(storedUid)}} : null;
    },
  });

  useEffect(() => {
    if (data && data.user && data.user.id) {
      sessionStorage.setItem('authData', JSON.stringify(data.user.id));
    }
  }, [data]);

  const uid = data?.user?.id || null;

  return {uid, isLoading, error};
};
