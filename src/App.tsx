import './App.css';
import styled from 'styled-components';
import {theme} from './styles/Theme';
import {ThemeProvider} from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import {Outlet} from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import SideBar from './components/SideBar/SideBar';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <StyledContainer>
        <Navigation />
        <SideBar />
        <Outlet />
      </StyledContainer>
    </ThemeProvider>
  );
}

const StyledContainer = styled.div`
  display: flex;
`;

export default App;
