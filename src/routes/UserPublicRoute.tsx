import {ReactElement} from 'react';
import styled from 'styled-components';
import {Navigate} from 'react-router';
import useAuthCheck from 'hooks/useAuthCheck';
import LoadingCircle from 'components/LoadingCircle/LoadingCircle';

interface Props {
  children: ReactElement;
}

const UserPublicRoute = ({children}: Props): any => {
  const {authorization, isLoading} = useAuthCheck();

  if (isLoading && !authorization)
    return (
      <StyledLoadingContainer>
        <LoadingCircle />
      </StyledLoadingContainer>
    );
  if (!isLoading && authorization) return children;
  if (!isLoading && !authorization) return <Navigate to="/home" />;
};

export default UserPublicRoute;

const StyledLoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;
