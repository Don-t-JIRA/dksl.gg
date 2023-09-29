// React, router
import React, { Suspense } from 'react';
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
import LoadingComponent from './components/common/LoadingComponent.jsx';
import NotFound from './components/common/NotFound.jsx';

// Routing 설정
const router = createBrowserRouter([
  { path: '/', element: <MainContainer /> },
  { path: '/user/:type', element: <UserContainer /> },
  { path: '/record/:summoner', element: <RecordContainer /> },
  { path: '/group/:type', element: <GroupContainer /> },
  { path: '/test', element: <TestContainer /> },
  { path: '*', element: <NotFound /> },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <ErrorBoundary FallbackComponent={ErrorComponent}>
    <Provider>
      <GlobalStyles />
      <React.StrictMode>
        <Suspense fallback={<LoadingComponent />}>
          <RouterProvider router={router} />
        </Suspense>
      </React.StrictMode>
    </Provider>
  </ErrorBoundary>
);
