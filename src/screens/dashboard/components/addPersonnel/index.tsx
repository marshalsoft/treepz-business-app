import React, { ChangeEventHandler, useState } from "react"
import BaseInput from "../../../../components/baseInput";
import { BaseButton } from "../../../../components/buttons";
import { Formik} from 'formik';
import * as y from 'yup';
import { PostRequest } from '../../../../includes/functions';
const schema = y.object({
    firstname:y.string().required("First name is required."),
    lastname:y.string().required("Last name is required.")
    })
interface AddPersonnelComponentprops {
onClose:()=>void;
}
export const AddPersonnelComponent = (props:AddPersonnelComponentprops)=>{
  const [loading,setLoading] = useState<boolean>(false)
  return  <div className="modal" tabIndex={-1} >
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Add Personnel</h5>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={props.onClose}></button>
        </div>
<div className="modal-body p-5">
<Formik
onSubmit={(values)=>{

}}
validationSchema={schema}
initialValues={{
    firstname:"",
    lastname:""
}}
>
{({handleSubmit,handleChange,values})=><div className='' >
      
        <BaseInput 
        label="First name"
        name='firstname'
        type='text'
        placeholder='First name'
        onValueChange={handleChange("firstname")}  
         value={values.firstname}
        required={true}
        />
         <BaseInput 
         label="Last name"
        name='lastname'
        type='text'
        placeholder='Last name'
        onValueChange={handleChange("lastname")} 
         value={values.lastname}
        required={true}
        />
        
        <BaseButton 
        onClick={handleSubmit}
        loading={loading}
        >Save</BaseButton>
        </div>
       }
     </Formik>
        </div>
      </div>
    </div>
  </div>
}