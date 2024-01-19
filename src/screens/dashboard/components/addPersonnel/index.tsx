import React, { ChangeEventHandler, useState } from "react"
import BaseInput from "../../../../components/baseInput";
import { BaseButton } from "../../../../components/buttons";
import { Formik} from 'formik';
import * as y from 'yup';
import { PostRequest } from '../../../../includes/functions';
const schema = y.object({
  employeeFullName:y.string().required("Employee fullname is required;"),
  employeeEmail:y.string().required("Employee email is required.").email("A valid email address is required."),
  employeeId:y.string().required("Employee ID is required."),
    // email:y.mixed()
    // .oneOf([y.string().required("A valid email address is required.")])
    // .nullable()
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
  PostRequest("edd",values).then((res)=>{
    setLoading(false);
  })
}}
validationSchema={schema}
initialValues={{
  email:[],
  emailList:"",
  employeeFullName:"",
  employeeEmail:"",
  employeeId:"",
}}

>
{({handleSubmit,setFieldValue,handleChange,errors,touched,values})=><div className='' >
      <div className="pt-3" >
        {/* <BaseInput 
        arrayList={true}
        filterValue={(d:string[])=>{
          setFieldValue("emailList",d.join(","));
          setFieldValue("email",d);
        }}
        label="Invite by email"
        name='email'
        type='email'
        placeholder='Email, comma or space separated'
        onValueChange={(d)=>{
          const emailList = String(d.target.value).split(",")
          setFieldValue("emailList",emailList);
          setFieldValue("email",d.target.value);
        }}  
         value={values.email}
        required={true}
        error={touched.email && errors.email}
        /> */}
        <BaseInput 
        label="Employee's full name"
        name='employeeFullName'
        type='text'
        max={50}
        placeholder="Employee's full name"
        onValueChange={handleChange("employeeFullName")}  
         value={values.employeeFullName}
        required={true}
        error={touched.employeeFullName && errors.employeeFullName}
        />
        <BaseInput 
        label="Employee's email"
        name='employeeEmail'
        type='email'
        max={50}
        placeholder="Employee's email"
        onValueChange={handleChange("employeeEmail")}  
         value={values.employeeEmail}
        required={true}
        error={touched.employeeEmail && errors.employeeEmail}
        />
        <BaseInput 
        label="Employee's ID"
        name='employeeId'
        type='text'
        max={50}
        placeholder="Employee's ID"
        onValueChange={handleChange("employeeId")}  
         value={values.employeeId}
        required={true}
        error={touched.employeeId && errors.employeeId}
        />
        </div>
         <div className="modal-footer">
        <button type="button" onClick={props.onClose} className="btn btn-inactive" >Close</button>
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