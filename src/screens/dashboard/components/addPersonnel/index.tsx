import React, { useState } from "react"
import BaseInput from "../../../../components/baseInput";
import { BaseButton } from "../../../../components/buttons";
import { Formik} from 'formik';
import * as y from 'yup';
import { PostRequest } from '../../../../includes/functions';
const schema = y.object({
  username:y.string().required("Username is required;"),
  email:y.string().required("Employee email is required.").email("A valid email address is required."),
  employeeId:y.string().required("Employee ID is required."),
    })
interface AddPersonnelComponentprops {
onClose:()=>void;
}
export const AddPersonnelComponent = (props:AddPersonnelComponentprops)=>{
  const [loading,setLoading] = useState<boolean>(false)
  return  <div className="modal" tabIndex={-1} >
    <div className="modal-dialog" >
      <div className="modal-content" style={{borderRadius:20}}>
        <div className="modal-header">
          <h5 className="modal-title">Invite employee</h5>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={props.onClose}></button>
        </div>
<div className="modal-body p-3">
  <div style={{fontSize:14}}>New members will have access to their own personal dashboard</div>
<Formik
onSubmit={(values)=>{
  setLoading(true);
  PostRequest("admin/invite",values,true).then((res)=>{
    setLoading(false);
    if(res.success)
    {
      if(props.onClose)
      {
        props.onClose()
      }
    }
  })
}}
validationSchema={schema}
initialValues={{
  email:"",
  username:"",
  employeeId:""
}}

>
{({handleSubmit,setFieldValue,handleChange,errors,touched,values})=><div className='' >
      <div className="pt-3" >
        <BaseInput 
        label="Username"
        name='username'
        type='text'
        max={20}
        placeholder="Enter username"
        onValueChange={handleChange("username")}  
         value={String(values.username).replace(/[ ]/g,'').trim()}
        required={true}
        error={touched.username && errors.username}
        />
        <BaseInput 
        label="Employee's email"
        name='employeeEmail'
        type='email'
        max={50}
        placeholder="Employee's email"
        onValueChange={handleChange("email")}  
         value={String(values.email).replace(/[ ]/g,'').trim()}
        required={true}
        error={touched.email && errors.email}
        />
        <BaseInput 
        label="Employee's ID"
        name='employeeId'
        type='text'
        max={20}
        placeholder="Employee's ID"
        onValueChange={handleChange("employeeId")}  
        value={String(values.employeeId).replace(/[ ]/g,'').trim()}
        required={true}
        error={touched.employeeId && errors.employeeId}
        />
        </div>
         <div className="modal-footer">
        <button type="button" 
        onClick={props.onClose} 
        className="btn btn-inactive" 
        >Close</button>
        <BaseButton
        loading={loading}
        style={{minWidth:130}}
        onClick={handleSubmit}
        >Send invite</BaseButton>
      </div>
        </div>
       }
     </Formik>
        </div>
      </div>
    </div>
  </div>
}