import React from 'react';
import ReactDOM from 'react-dom/client';
import TestContainer from './pages/TestContainer.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'jotai';
import GlobalStyle from './styles/globalStyle.js';
import MainContainer from './pages/MainContainer.jsx';

const router = createBrowserRouter([
  { path: '/', element: <MainContainer /> },
  { path: '/test', element: <TestContainer /> },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
    <GlobalStyle />
  </Provider>
);
