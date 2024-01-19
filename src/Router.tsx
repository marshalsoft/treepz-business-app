import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { CONSTANTS } from './includes/constant';
import LoginScreen from './screens/login';
import ResetPasswordScreen from './screens/reset_password';
import OTPScreen from './screens/otp';
import DashboardScreen from './screens/dashboard';
import DashboardSection from './screens/dashboard/sections/dashboard';
import TreepzHistorySection from './screens/dashboard/sections/treepz_history';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EmplyeeDataSection from './screens/dashboard/sections/employee_data';

function App() {
  return (<BrowserRouter>
    <Routes>
    <Route path={CONSTANTS.Routes.Dashboard} element={<DashboardScreen />} >
    <Route path={CONSTANTS.Routes.TreepzHistory} element={<TreepzHistorySection />} />
    <Route path={CONSTANTS.Routes.EmployeeData} element={<EmplyeeDataSection />} />
    <Route path={""} element={<DashboardSection />} />
    <Route path={"*"} element={<DashboardSection />} />
    </Route>
    <Route path={CONSTANTS.Routes.Login} element={<LoginScreen />} />
    <Route path={CONSTANTS.Routes.ForgotPassword} element={<ResetPasswordScreen />} />
    {localStorage.getItem(CONSTANTS.Routes.ForgotPassword) && <>
    <Route path={CONSTANTS.Routes.Otp} element={<OTPScreen />} />
    </>}
    <Route path={"*"} element={<LoginScreen />} />
    </Routes>
    <ToastContainer />
    </BrowserRouter>);
}
   
export default App;
