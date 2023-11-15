import './App.css';
import styled from 'styled-components';
import {Outlet} from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import SideBar from './components/SideBar/SideBar';
import {ServerSocketProvider} from 'contexts/ServerSocketContext';
import {QueryClientProvider, QueryClient} from '@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import UserPublicRoute from 'routes/UserPublicRoute';
import Notification from './pages/Toast';

const queryClient = new QueryClient();

function App() {
  return (
    <UserPublicRoute>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={true} />
        <ServerSocketProvider>
          <StyledContainer>
            <Notification />
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
