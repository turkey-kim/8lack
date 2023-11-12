import './App.css';
import styled from 'styled-components';
import {Outlet} from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import SideBar from './components/SideBar/SideBar';
import UserPublicRoute from 'routes/UserPublicRoute';
import {QueryClientProvider, QueryClient} from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserPublicRoute>
        <StyledContainer>
          <Navigation />
          <SideBar />
          <Outlet />
        </StyledContainer>
      </UserPublicRoute>
    </QueryClientProvider>
  );
}

const StyledContainer = styled.div`
  display: flex;
`;

export default App;
