import React, { useState } from 'react'
import { Logo } from '../../components/Logo'
import { LogoDesign } from '../../components/LogoDesign'
import { PoweredByComponent } from '../../components/PoweredBy'
import BaseInput from '../../components/baseInput'
import { NavLink } from 'react-router-dom'
import { CONSTANTS } from '../../includes/constant'
import { BaseButton } from '../../components/buttons'
import { Formik, FormikHelpers, FormikValues } from 'formik';
import * as y from 'yup';
import { PostRequest } from '../../includes/functions';
import { ToastContainer, toast } from 'react-toastify';
const schema = y.object({
    email:y.string().required().email("A valid email is required."),
    password:y.string().required()
    })
export default function LoginScreen() {
  const [loading,setLoading] = useState(false);
  
  const UserLogin = (values:any)=>{
    setLoading(true);
    PostRequest("login",values).then((response)=>{
      setLoading(false);
      if(!response.status)
      {
        localStorage.setItem("token","k");
        window.location.href = "/"+CONSTANTS.Routes.Dashboard
      }
    })
  }

  return (<div className='row'>
     <div className='col-3 sidemenu position-relative' >
     <div className='p-5 ' >
        <Logo />
        <div className='sub'>
        Dare to move,<br/>keep the record
        </div>
        </div>
        <div className='logo-wrapper' >
        <LogoDesign />
        </div>
     </div>
     <div className='col-9 p-5' >
     <Formik
onSubmit={(values)=>{
UserLogin(values)
}}
validationSchema={schema}
initialValues={{
  email:"",
  password:""
}}
>
{({handleSubmit,handleChange,values})=><div className='' >
        <div className="text-center title-text">Welcome back 😊</div>
        <div className="text-center">Let's pick things up from where you left it</div>
        <div className='row p-5' >
        <div className='col-2' ></div>
        <div className='col-8' >
        <BaseInput 
        name='email'
        type='email'
        placeholder='Work email address'
        onValueChange={handleChange("email")}  
         value={values.email}
        required={true}
        />
         <BaseInput 
        name='password'
        type='password'
        placeholder='Password'
        onValueChange={handleChange("password")} 
         value={values.password}
        required={true}
        />
        <div className='row'>
        <div className='col-12 mb-5'>
        <NavLink to={"../"+CONSTANTS.Routes.ForgotPassword} className={"recovery-text"}>
            <span >Forgot password? <b>Recover</b></span>
        </NavLink>
        </div>
        </div>
        <BaseButton 
        onClick={handleSubmit}
        loading={loading}
        >Login</BaseButton>
        </div>
        <div className='col-2' ></div>
        </div>
        </div>}
     </Formik>
        <span className='poweredby'>
            <PoweredByComponent />
        </span>
     
     </div>
    </div>
  )
}