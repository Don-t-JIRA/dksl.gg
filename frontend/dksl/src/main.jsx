import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import TestContainer from './pages/TestContainer.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'jotai';

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/test', element: <TestContainer /> },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
    ,
  </Provider>
);
