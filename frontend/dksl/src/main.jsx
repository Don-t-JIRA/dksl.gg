// React, router
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
// Jotai
import { Provider } from 'jotai';
// Component
import ErrorComponent from './components/common/ErrorComponent.jsx';
// Container
import TestContainer from './pages/TestContainer.jsx';
import MainContainer from './pages/MainContainer.jsx';
import UserContainer from './pages/UserContainer.jsx';
import RecordContainer from './pages/RecordContainer.jsx';
import GroupContainer from './pages/GroupContainer.jsx';
// Styled
import GlobalStyles from './styles/globalStyles.style.js';

// Routing 설정
const router = createBrowserRouter([
  { path: '/', element: <MainContainer /> },
  { path: '/user/:type', element: <UserContainer /> },
  { path: '/record', element: <RecordContainer /> },
  { path: '/group', element: <GroupContainer /> },
  { path: '/test', element: <TestContainer /> },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <ErrorBoundary FallbackComponent={ErrorComponent}>
    <Provider>
      <GlobalStyles />
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </Provider>
  </ErrorBoundary>
);
