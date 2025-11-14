import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Login from '../pages/auth/Login';
// import Signup from '../pages/auth/Signup';
// import ForgotPassword from '../pages/auth/ForgotPassword';
import Dashboard from '../pages/dashboard/Dashboard';
import { useSelector } from 'react-redux';
import type { RootState } from '../redux/store';
import OTP_Page from '../pages/auth/OTP_Page';
import OTP_Login from '../pages/auth/OTP_Login';



const AppRoutes: React.FC = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const email = useSelector((state: any) => state.otp.email);

  return (
    <Router>
      <Routes>
        <Route
          path="*"
          element={<Navigate to="/login" replace />} />

        <Route
          path="/login"
          element={<OTP_Login />}
        />
        <Route
          path="/otp"
          element={email ? <OTP_Page /> : <Navigate to="/login" replace />}
        />

        <Route
          path="/dashboard"
          element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" replace />}
        />


      </Routes>
    </Router>
  );
};

export default AppRoutes;
