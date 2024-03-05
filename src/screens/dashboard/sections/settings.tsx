/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import './../style.css';
import { GetRequest, PostRequest } from '../../../includes/functions';
import { BaseButton } from '../../../components/buttons';
import { Formik} from 'formik';
import * as y from 'yup';
import BaseInput from '../../../components/baseInput';
import { UserProps } from '../../../includes/types';

const schema = y.object({
    password:y.string().required("Password is required.")
    })
export default function SettingsSection(){
    const [loading,setLoading] = useState(false);
    const [user,setUser] = useState<UserProps>({});
    const UpdateUser = (values:any)=>{
      setLoading(true);
      PostRequest("patch:admin/reset-password",values,true).then((response)=>{
        setLoading(false);
      })
    }
    const GetUserInfo = ()=>{
        GetRequest("admin",{}).then((response)=>{
          // alert(JSON.stringify(response.data));
          if(response.success)
          {
            setUser(response.data);
          }
        })
      }
    useEffect(()=>{
        GetUserInfo()  
    },[])
return <div className='main-scrollable p-5 pt-0' >
<div className="heading mb-3" >
<b className='fCap'>My Settings</b></div>
<Formik
onSubmit={(values)=>{
UpdateUser({
    email:user.email,
    password:values.password
})
}}
validationSchema={schema}
initialValues={{
    password:""
}}
>
{({handleSubmit,handleChange,values})=><div className='' >
        <div className='row p-5' >
        <div className='col-2' >
        <center >
    <div className='avatar d-flex align-items-center justify-content-center' >
       <span className='fs-2 fw-bold orange-text' >{[String(user.firstname),String(user.lastname)].map((a,i)=>{
            return `${a[0]}`
        }).join("")}
        </span>
    </div>
    </center>
        </div>
        <div className='col-8' >
        <div>
            <small >Full name</small>
        </div>
        <BaseInput
        disabled={true}
        name='full_name'
        type='text'
        placeholder='Full name'
        max={30}
        onValueChange={()=>{ }} 
         value={user.firstname+" "+user.lastname}
        required={true}
        />
        <div>
            <small >Email address</small>
        </div>
         <BaseInput 
         disabled
        name='email'
        type='email'
        placeholder='Email address'
        max={50}
        onValueChange={()=>{ }} 
         value={user.email}
        required={true}
        />
         <div>
            <small >Role in organization</small>
        </div>
         <BaseInput 
        name='role'
        type='text'
        disabled
        placeholder='Human resources manager'
        max={50}
        onValueChange={()=>{ }} 
         value={user.type}
        required={true}
        />
         <div>
            <small >Change password</small>
        </div>
         <BaseInput 
        name='password'
        type='password'
        placeholder='Enter new password'
        max={50}
        onValueChange={handleChange("password")} 
         value={values.password}
        required={true}
        />
        <div className='row'>
        <div className='col-12 mb-5'>
        </div>
        </div>
        <div className='row p-2 pe-3' >
        <BaseButton 
        onClick={handleSubmit}
        loading={loading}
        >Save changes</BaseButton>
        </div>
        </div>
        <div className='col-2' ></div>
        </div>
        </div>}
     </Formik>
</div>
}