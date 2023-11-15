import styled from 'styled-components';
import {Outlet} from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import SideBar from './components/SideBar/SideBar';
import {ServerSocketProvider} from 'contexts/ServerSocketContext';
import UserPublicRoute from 'routes/UserPublicRoute';

function App() {
  return (
    <UserPublicRoute>
      <>
        <ServerSocketProvider>
          <StyledContainer>
            <Navigation />
            <SideBar />
            <Outlet />
          </StyledContainer>
        </ServerSocketProvider>
      </>
    </UserPublicRoute>
  );
}

const StyledContainer = styled.div`
  display: flex;
`;

export default App;
