import './App.css';
import {theme} from './styles/Theme';
import {ThemeProvider} from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import {Routes, Route} from 'react-router';
import {PageContainer, MainTitle} from './pages/Users';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<></>}></Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
