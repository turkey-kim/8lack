import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {RecoilRoot} from 'recoil';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import NotFound from 'pages/NotFound';
import Users from 'pages/Users';
import MyPage from 'pages/MyPage';
import ChatAll from 'pages/ChatAll';
import Chat from 'components/Chat/Chat';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {index: true, path: '/', element: <ChatAll />},
      {path: '/chat/:chatId', element: <Chat />},
      {path: '/users', element: <Users />},
      {path: '/user', element: <MyPage />},
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <RouterProvider router={router}></RouterProvider>
    </RecoilRoot>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
