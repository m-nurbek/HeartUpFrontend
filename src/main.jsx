import './index.scss';
import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage.jsx';
import LoadingPage from './pages/LoadingPage.jsx';
import PatientPage from './pages/PatientPage.jsx';
import AllPatientsPage from './pages/AllPatientsPage.jsx';
import ModelsPage from './pages/ModelsPage.jsx';
import DoctorPage from './pages/DoctorPage.jsx';



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
    errorElement: <ErrorPage />
  },
  {
    path: '/patients/:patientId',
    element: <PatientPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/models/:patientId',
    element: <ModelsPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/doctor',
    element: <DoctorPage />,
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