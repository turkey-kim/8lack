import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {RecoilRoot} from 'recoil';
import {ThemeProvider} from 'styled-components';
import {theme} from './styles/Theme';
import GlobalStyles from './styles/GlobalStyles';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import NotFound from './pages/NotFound';
import Users from './pages/Users';
import SignIn from './pages/SignIn';
import SignUp from 'pages/SignUp';
import ChatRoom from 'pages/ChatRoom/index';
import GroupChatList from './pages/GroupChatList';
import Modal from 'react-modal';

Modal.setAppElement('#root');
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {index: true, path: '/', element: <GroupChatList />},
      {path: '/chat/:chatId', element: <ChatRoom />},
      {path: '/users', element: <Users />},
    ],
  },
  {path: '/signin', element: <SignIn />},
  {path: '/signup', element: <SignUp />},
]);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    <RecoilRoot>
      <RouterProvider router={router}></RouterProvider>
    </RecoilRoot>
  </ThemeProvider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
