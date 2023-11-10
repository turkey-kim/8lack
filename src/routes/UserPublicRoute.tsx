import {ReactElement} from 'react';
import {Navigate} from 'react-router';
import useAuthCheck from 'hooks/useAuthCheck';

interface Props {
  children: ReactElement;
}

const UserPublicRoute = ({children}: Props): any => {
  const {isLoading, authorization} = useAuthCheck();

  if (isLoading && !authorization) return <>...is Loading</>;
  if (!isLoading && authorization) return children;
  if (!isLoading && !authorization) return <Navigate to="/signin" />;
};

export default UserPublicRoute;
