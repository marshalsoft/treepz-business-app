import React, { useState } from 'react'
import { Logo } from '../../components/Logo'
import { LogoDesign } from '../../components/LogoDesign'
import { PoweredByComponent } from '../../components/PoweredBy'
import BaseInput from '../../components/baseInput'
import { NavLink, useNavigate } from 'react-router-dom'
import { CONSTANTS } from '../../includes/constant'
import { BaseButton } from '../../components/buttons'
import { Formik} from 'formik';
import * as y from 'yup';
import { PostRequest } from '../../includes/functions';

const schema = y.object({
    email:y.string().required().email("A valid email is required."),
    password:y.string().required()
    })
export default function LoginScreen() {
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate()
  const UserLogin = (values:any)=>{
    setLoading(true);
    PostRequest("admin/login",values).then((response)=>{
      setLoading(false);
      if(response.success)
      {
       navigate("/"+CONSTANTS.Routes.Dashboard);
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
  email:"marshall@treepz.com",
  password:"Mekene83"
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
        max={100}
        onValueChange={handleChange("email")}  
         value={values.email}
        required={true}
        />
         <BaseInput 
        name='password'
        type='password'
        placeholder='Password'
        max={50}
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
        <div className='row p-2 pe-3' >
        <BaseButton 
        onClick={handleSubmit}
        loading={loading}
        >Login</BaseButton>
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