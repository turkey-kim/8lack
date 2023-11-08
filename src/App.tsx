import './App.css';
import {theme} from './styles/Theme';
import {ThemeProvider} from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import {Routes, Route} from 'react-router';
import Users from './pages/Users';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Users />
            </>
          }
        ></Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
