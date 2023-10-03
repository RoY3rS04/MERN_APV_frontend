import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AuthLayout from './layout/AuthLayout.jsx';
import Login from './pages/Login.jsx';
import ConfirmAccount from './pages/ConfirmAccount.jsx';
import ForgetPassword from './pages/ForgetPassword.jsx';
import Register from './pages/Register.jsx';
import NewPassword from './pages/NewPassword.jsx';
import { AuthProvider } from './context/AuthProvider.jsx';
import Protected from './layout/Protected.jsx';
import ManagePacients from './pages/ManagePatients.jsx';
import { PatientsProvider } from './context/patientsProvider.jsx';
import ChangePassword from './pages/ChangePassword.jsx';
import EditProfile from './pages/EditProfile.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Login/>
      },
      {
        path: 'register',
        element: <Register/>
      },
      {
        path: 'i-forgot-password',
        element: <ForgetPassword/>
      },
      {
        path: 'i-forgot-password/:token',
        element: <NewPassword/>
      },
      {
        path: 'confirm/:id',
        element: <ConfirmAccount/>
      }
    ]
  },
  {
    path: '/admin',
    element: <Protected/>,
    children: [
      {
        index: true,
        element: <ManagePacients/>
      },
      {
        path: 'profile',
        element: <EditProfile/>
      },
      {
        path: 'change-password',
        element: <ChangePassword/>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <PatientsProvider>
        <RouterProvider router={router}>
          <App />
        </RouterProvider>
      </PatientsProvider>
    </AuthProvider>
  </React.StrictMode>,
)
