import React, { useEffect } from "react";
import { BaseButton } from "../../../../components/buttons";
import BaseInput from "../../../../components/baseInput";
import { Formik} from 'formik';
import * as y from 'yup';
import { EmployeeProps } from "../../../../includes/types";
const schema = y.object({
    email:y.string().required().email("A valid email is required.").max(150,"Location is too long."),
    employeeId:y.string().required("Employee Id is required."),
    fullname:y.string().required("Full name is required.").max(25,"Full name is too long."),
    location:y.string().required("Location is required.").max(30,"Location is too long.")
    })
interface ConfirmDialogComponentProps {
onClose:()=>void;
onValue:(v:any)=>void;
employeeData:EmployeeProps | null;
loading?:boolean;
}
export const EditUserComponent = (props:ConfirmDialogComponentProps)=>{
useEffect(()=>{
})

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
props.onValue(values)
}}
validationSchema={schema}
initialValues={{
    employeeId:props.employeeData?.employeeId,
    fullname:props.employeeData?.name,
    email:props.employeeData?.email,
    location:""
}}
>
{({handleSubmit,handleChange,errors,touched,values})=><div className="" >
  <BaseInput 
  label="Employee's ID"
  disabled={true}
        name='employeeId'
        type='text'
        placeholder='2345464IG'
        onValueChange={handleChange("employeeId")}  
         value={values.employeeId}
        required={true}
        error={touched.employeeId && errors.email}
        />
        <BaseInput 
        label="Full name"
        name='fullname'
        type='text'
        placeholder='John Paul'
        onValueChange={handleChange("fullname")}  
         value={values.fullname}
        required={true}
        error={touched.fullname && errors.fullname}
        />
        <BaseInput 
        label="Employee's work email"
        name='email'
        type='email'
        placeholder="Employee's work email"
        onValueChange={handleChange("email")}  
        value={values.email}
        required={true}
        error={touched.email && errors.email}
        />
        <BaseInput 
        label='Location'
        name='location'
        type='text'
        placeholder='Address'
        onValueChange={handleChange("location")}  
         value={values.location}
        required={true}
        error={touched.location && errors.location}
        />
        <div className="p-3 row" style={{paddingRight:30}}>
 <BaseButton
 loading={props.loading}
 onClick={handleSubmit}
>Update user information</BaseButton>
</div>
        </div>}
        </Formik>
</div> 

</div>
</div>
</div>
}