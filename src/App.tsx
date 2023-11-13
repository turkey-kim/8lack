import './App.css';
import styled from 'styled-components';
import {Outlet} from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import SideBar from './components/SideBar/SideBar';
import {ServerSocketProvider} from 'contexts/ServerSocketContext';
import {QueryClientProvider, QueryClient} from '@tanstack/react-query';
import UserPublicRoute from 'routes/UserPublicRoute';

const queryClient = new QueryClient();

function App() {
  return (
    <UserPublicRoute>
      <QueryClientProvider client={queryClient}>
        <ServerSocketProvider>
          <StyledContainer>
            <Navigation />
            <SideBar />
            <Outlet />
          </StyledContainer>
        </ServerSocketProvider>
      </QueryClientProvider>
    </UserPublicRoute>
  );
}

const StyledContainer = styled.div`
  display: flex;
`;

export default App;
