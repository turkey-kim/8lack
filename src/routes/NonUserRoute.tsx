import {ReactElement, useEffect} from 'react';
import {useRecoilValue} from 'recoil';
import {loginState} from 'states/atom';
import {Navigate} from 'react-router';

interface Props {
  children: ReactElement;
}

const NonUserRoute = ({children}: Props): any => {
  const isLoggedIn = useRecoilValue(loginState);

  if (isLoggedIn) return <Navigate to="/" />;
  if (!isLoggedIn) return children;
};

export default NonUserRoute;
