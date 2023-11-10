import {ReactElement, useEffect} from 'react';
import {Navigate} from 'react-router';
import useAuthCheck from 'hooks/useAuthCheck';

interface Props {
  children: ReactElement;
}

const UserPublicRoute = ({children}: Props): any => {
  const {authorization, isLoading} = useAuthCheck();

  if (isLoading && !authorization) return <>...is Loading</>;
  if (!isLoading && authorization) return children;
  if (!isLoading && !authorization) return <Navigate to="/signin" />;
};

export default UserPublicRoute;
