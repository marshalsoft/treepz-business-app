import React, { ChangeEventHandler, useState } from "react"
import BaseInput from "../../../../components/baseInput";
import { BaseButton } from "../../../../components/buttons";
import { Formik} from 'formik';
import * as y from 'yup';
import { PostRequest } from '../../../../includes/functions';
import { CSVFileIcon, TrashIcon } from "../../icon";
const schema = y.object({
    firstname:y.string().required("First name is required."),
    lastname:y.string().required("Last name is required.")
    })
interface ImportPersonnelComponentprops {
onClose:()=>void;
}
export const ImportPersonnelComponent = (props:ImportPersonnelComponentprops)=>{
    const [loading,setLoading] = useState<boolean>(false)
    const [uploading,setUpLoading] = useState<boolean>(false)
  return  <div className="modal" tabIndex={-1} >
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Import Personnel</h5>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={props.onClose}></button>
        </div>
<div className="modal-body p-5">
<p>Select a CVS file to import personnel list</p>

    <div className="alert alert-success" role="alert" >
        <div className="row" >
        <div className="col-2 filePickerContainer" >
        <CSVFileIcon />
        <input
        className="filePicker"
        type="file"
        accept="text/csv"
        />
        </div>
        <div className="col-10" >
        <small>Click the icon to select a CVS file</small>
        </div>
        </div>
        
    </div>
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
      
      <table className="table table-responsive table-bordered">
        <tr >
            <td>
        <BaseInput 
        name='firstname'
        type='text'
        placeholder='First name'
        onValueChange={handleChange("firstname")}  
         value={values.firstname}
        required={true}
        />
        </td>
        <td>
         <BaseInput 
        name='lastname'
        type='text'
        placeholder='Last name'
        onValueChange={handleChange("lastname")} 
         value={values.lastname}
        required={true}
        />
        </td>
        <td>
          <TrashIcon />  
        </td>
        </tr>
        </table>
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