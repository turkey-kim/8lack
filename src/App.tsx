import './App.css';
import styled from 'styled-components';
import {Outlet} from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import SideBar from './components/SideBar/SideBar';

function App() {
  return (
    <StyledContainer>
      <Navigation />
      <SideBar />
      <Outlet />
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  display: flex;
`;

export default App;
