import './index.scss';
import React, {Suspense, lazy} from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import ErrorPage from './pages/ErrorPage.jsx';
import LoadingPage from './pages/LoadingPage.jsx';
import PatientPage from './pages/PatientPage.jsx';
import AllPatientsPage from './pages/AllPatientsPage.jsx';
import ModelsPage from './pages/ModelsPage.jsx';
import DoctorPage from './pages/DoctorPage.jsx';
import AllDoctorsPage from './pages/AllDoctorsPage.jsx';
import MyDoctorPage from './pages/personal_pages/MyDoctorPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./redux/userSlice.js";
import {Provider} from "react-redux";
import {accessTokenReducer, refreshTokenReducer} from "./redux/tokensSlice.js";
import {ConfigProvider} from "antd";
import MyPatientPage from "./pages/personal_pages/MyPatientPage.jsx";
import AppointmentsPage from "./pages/AppointmentsPage.jsx";
import PatientAppointmentsPage from "./pages/PatientAppointmentsPage.jsx";


const App = lazy(() => import('./App.jsx'));

const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        errorElement: <ErrorPage/>,
    },
    {
        path: '/login',
        element: <LoginPage/>,
        errorElement: <ErrorPage/>,
    },
    {
        path: '/patients',
        element: <AllPatientsPage/>,
        errorElement: <ErrorPage/>,
    },
    {
        path: '/patients/:patientId',
        element: <PatientPage/>,
        errorElement: <ErrorPage/>,
    },
    {
        path: '/models/:patientId',
        element: <ModelsPage/>,
        errorElement: <ErrorPage/>,
    },
    {
        path: '/doctors',
        element: <AllDoctorsPage/>,
        errorElement: <ErrorPage/>,
    },
    {
        path: '/doctors/:doctorId',
        element: <DoctorPage/>,
        errorElement: <ErrorPage/>,
    },
    {
        path: '/my/doctors/',
        element: <MyDoctorPage/>,
        errorElement: <ErrorPage/>,
    },
    {
        path: '/my/patients/',
        element: <MyPatientPage/>,
        errorElement: <ErrorPage/>,
    },
    {
        path: '*',
        element: <ErrorPage/>,
    },
    {
        path: '/appointments',
        element: <AppointmentsPage/>,
        errorElement: <ErrorPage/>,
    },
    {
        path: '/patient/appointments/',
        element: <PatientAppointmentsPage/>,
        errorElement: <ErrorPage/>,
    }
]);

const store = configureStore({
    reducer: {
        user: userReducer,
        accessToken: accessTokenReducer,
        refreshToken: refreshTokenReducer,
    },
})

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <Suspense fallback={<LoadingPage/>}>
                <ConfigProvider
                    theme={{
                        token: {
                            // Seed Token
                            colorPrimary: '#5A54F9',
                            borderRadius: 2,

                            // Alias Token
                            colorBgContainer: '#ffffff',
                        },
                    }}
                >
                    <RouterProvider router={router}/>
                </ConfigProvider>
            </Suspense>
        </Provider>
    </React.StrictMode>,
)