import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import { CONSTANTS } from './includes/constant';
import LoginScreen from './screens/login';
import ResetPasswordScreen from './screens/reset_password';
import OTPScreen from './screens/otp';
import DashboardScreen from './screens/dashboard';
import DashboardSection from './screens/dashboard/sections/dashboard';
import PersonnelSection from './screens/dashboard/sections/personnel';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (<BrowserRouter>
    <Routes>
    {localStorage.getItem("token")?<>
    <Route path={CONSTANTS.Routes.Dashboard} element={<DashboardScreen />} >
    <Route path={CONSTANTS.Routes.Personnel} element={<PersonnelSection />} />
    <Route path={""} element={<DashboardSection />} />
    <Route path={"*"} element={<DashboardSection />} />
    </Route>
    </>:<>
    <Route path={CONSTANTS.Routes.Login} element={<LoginScreen />} />
    <Route path={CONSTANTS.Routes.ForgotPassword} element={<ResetPasswordScreen />} />
    {localStorage.getItem(CONSTANTS.Routes.ForgotPassword) && <>
    <Route path={CONSTANTS.Routes.Otp} element={<OTPScreen />} />
    </>}
    </>}
    <Route path={"*"} element={<LoginScreen />} />
    </Routes>
    <ToastContainer />
    </BrowserRouter>);
}
   
export default App;
