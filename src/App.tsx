import './App.css';
import styled from 'styled-components';
import {Outlet} from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import SideBar from './components/SideBar/SideBar';
import {ServerSocketProvider} from 'contexts/ServerSocketContext';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import UserPublicRoute from 'routes/UserPublicRoute';

function App() {
  return (
    <UserPublicRoute>
      <>
        <ReactQueryDevtools initialIsOpen={true} />
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
