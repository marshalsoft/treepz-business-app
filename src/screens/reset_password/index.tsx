import React, { useEffect, useState } from 'react'
import { Logo } from '../../components/Logo'
import { LogoDesign } from '../../components/LogoDesign'
import { PoweredByComponent } from '../../components/PoweredBy'
import BaseInput from '../../components/baseInput'
import { NavLink} from 'react-router-dom'
import { CONSTANTS } from '../../includes/constant'
import { BaseButton, LightYellowButton } from '../../components/buttons'
import { Formik } from 'formik';
import * as y from 'yup';
import { GoBackIcon } from '../../assets/icons/BackIcon'
import { PostRequest } from '../../includes/functions'
const schema = y.object({
    email:y.string().required().email("A valid email is required.")
    })
export default function ResetPasswordScreen() {
  const [loading,setLoading] = useState(false);
  useEffect(()=>{
    if(localStorage.getItem(CONSTANTS.Routes.ForgotPassword))
    {
      localStorage.removeItem(CONSTANTS.Routes.ForgotPassword)
    }
  },[])
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
 setLoading(true);
 PostRequest("forgot_password",values).then((res)=>{
  setLoading(false);
  if(!res.status)
  {
    localStorage.setItem(CONSTANTS.Routes.ForgotPassword,values.email);
    window.location.href = "/"+CONSTANTS.Routes.Otp;
  }
 })
}}
validationSchema={schema}
initialValues={{
  email:"",
  password:""
}}
>
{({handleSubmit,handleChange,values})=><div className='ps-5' >
       <div className='pb-5'>
        <LightYellowButton
        to={"../"+CONSTANTS.Routes.Login}
        >
      <GoBackIcon
      color="#F8B02B"
      size={15}
      />
       <span className='ps-2'>Go back</span>
        </LightYellowButton>
        </div> 
        <div className="text-start title-text">Forgot password?</div>
        <div className="text-start">Enter your email address and we'll send you a link to reset your password.</div>
        <div className='row p-5 ps-0' >
        <div className='col-8' >
        <BaseInput 
        name='email'
        type='email'
        placeholder='Work email address'
        onValueChange={handleChange("email")}  
         value={values.email}
        required={true}
        />
        <BaseButton 
        onClick={handleSubmit}
        loading={loading}
        style={{marginTop:30}}
        >Reset password</BaseButton>
        <div className='row text-center mb-5 mt-5'>
        <NavLink to={"../"+CONSTANTS.Routes.Login} className={"return-to-login-text"}>
            <span >Return to login</span>
        </NavLink>
        </div>
        
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
