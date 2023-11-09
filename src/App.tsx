import './App.css';
import styled from 'styled-components';
import {Outlet} from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import SideBar from './components/SideBar/SideBar';
import UserPublicRoute from 'routes/UserPublicRoute';

function App() {
  return (
    <UserPublicRoute>
      <StyledContainer>
        <Navigation />
        <SideBar />
        <Outlet />
      </StyledContainer>
    </UserPublicRoute>
  );
}

const StyledContainer = styled.div`
  display: flex;
`;

export default App;
