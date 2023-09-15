import React from 'react';
import ReactDOM from 'react-dom/client';
import TestContainer from './pages/TestContainer.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'jotai';
import GlobalStyles from './styles/globalStyles.style.js';
import MainContainer from './pages/MainContainer.jsx';
import UserContainer from './pages/UserContainer.jsx';

const router = createBrowserRouter([
  { path: '/', element: <MainContainer /> },
  { path: '/user/:type', element: <UserContainer /> },
  { path: '/test', element: <TestContainer /> },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider>
    <GlobalStyles />
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
