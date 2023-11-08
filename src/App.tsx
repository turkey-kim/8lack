import './App.css';
import {theme} from './styles/Theme';
import {ThemeProvider} from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import {Routes, Route} from 'react-router';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <h1>메인 테스트 페이지입니다.</h1> 메인 페이지 적용 시 자유롭게 지워주세용
            </>
          }
        ></Route>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
