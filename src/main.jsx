import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.scss';
import ErrorPage from './pages/ErrorPage.jsx';
import LoadingPage from './pages/LoadingPage.jsx';

import PatientPage from './pages/PatientPage.jsx';
import MLPredictionPage from './pages/MLPredictionPage.jsx';
import LeanFile from './pages/HeartBeat.jsx';

import AllPatientsPage from './pages/AllPatientsPage.jsx';
import Ecg from './pages/Ecg.jsx';
import HeartBeat from './pages/HeartBeat.jsx';

const App = lazy(() => import('./App.jsx'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/patients',
    element: <AllPatientsPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/patients/:patientId',
    element: <PatientPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/ml_models',
    element: <LeanFile />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/ecg_mod',
    element: <Ecg />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/heartbeat',
    element: <HeartBeat />,
    errorElement: <ErrorPage />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Suspense fallback={<LoadingPage />}>
      <RouterProvider router={router} />
    </Suspense>
  </React.StrictMode>,
)