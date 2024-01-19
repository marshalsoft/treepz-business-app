import React from "react";
import { BaseButton } from "../../../../components/buttons";
import BaseInput from "../../../../components/baseInput";
import { Formik} from 'formik';
import * as y from 'yup';
const schema = y.object({
    email:y.string().required().email("A valid email is required."),
    password:y.string().required()
    })
interface ConfirmDialogComponentProps {
onClose:()=>void;
onValue:()=>void;
}
export const EditUserComponent = (props:ConfirmDialogComponentProps)=>{

return  <div className="modal" tabIndex={-1} >
    <div className="modal-dialog" >
      <div className="modal-content" style={{borderRadius:20,marginTop:100}}>
        <div className="modal-header">
          <h5 className="modal-title">Edit user details</h5>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={props.onClose}></button>
        </div>
<div className="modal-body p-3">
  <Formik
onSubmit={(values)=>{
// UserLogin(values)
}}
validationSchema={schema}
initialValues={{
    employeeId:"",
    fullname:"",
    email:"",
    location:""
}}
>
{({handleSubmit,handleChange,values})=><div className="" >
  <BaseInput 
  label="Employee's ID"
        name='employeeId'
        type='text'
        placeholder='2345464IG'
        onValueChange={handleChange("employeeId")}  
         value={values.employeeId}
        required={true}
        />
        <BaseInput 
        label="Full name"
        name='fullname'
        type='text'
        placeholder='John Paul'
        onValueChange={handleChange("fullname")}  
         value={values.fullname}
        required={true}
        />
        <BaseInput 
        label="Employee's work email"
        name='email'
        type='email'
        placeholder="Employee's work email"
        onValueChange={handleChange("email")}  
         value={values.email}
        required={true}
        />
        <BaseInput 
        label='Location'
        name='location'
        type='text'
        placeholder='Address'
        onValueChange={handleChange("location")}  
         value={values.location}
        required={true}
        />
        </div>}
        </Formik>
</div> 
<div className="p-5">
 <BaseButton
 onClick={props.onValue}
>Update user information</BaseButton>
</div>
</div>
</div>
</div>
}