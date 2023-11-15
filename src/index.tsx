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
import Users from './pages/UsersList';
import SignIn from './pages/SignIn';
import ChatRoom from 'pages/ChatRoom';
import GroupChatList from './pages/GroupChatList/GroupChatList';
import Modal from 'react-modal';
import NonUserRoute from 'routes/NonUserRoute';
import Home from './pages/Home';
import {QueryClientProvider, QueryClient} from '@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';

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
  {
    path: '/signin',
    element: (
      <NonUserRoute>
        <SignIn />
      </NonUserRoute>
    ),
  },
  {
    path: '/signup',
    element: (
      <NonUserRoute>
        <SignIn />
      </NonUserRoute>
    ),
  },
  {
    path: '/home',
    element: <Home />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const queryClient = new QueryClient();

root.render(
  <QueryClientProvider client={queryClient}>
    <ReactQueryDevtools initialIsOpen={true} />
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <RecoilRoot>
        <RouterProvider router={router}></RouterProvider>
      </RecoilRoot>
    </ThemeProvider>
  </QueryClientProvider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
