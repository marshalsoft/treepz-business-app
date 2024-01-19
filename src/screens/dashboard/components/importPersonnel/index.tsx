import React, { } from "react";
import Dropzone from 'react-dropzone';
import CloudIcon from "../../../../assets/icons/cloudIcon";
import DotIcon from "../../../../assets/icons/dot";

interface ImportPersonnelComponentprops {
onClose:()=>void;
}


export const ImportPersonnelComponent = (props:ImportPersonnelComponentprops)=>{
 
  return  <div className="modal" tabIndex={-1} >
    <div className="modal-dialog">
      <div className="modal-content" style={{borderRadius:20,marginTop:100}}>
        <div className="modal-header">
          <h5 className="modal-title">Upload CSV</h5>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={props.onClose}></button>
        </div>
<div className="modal-body p-3 pb-5">
<p>Upload a CSV to quickly import employee details and create users</p>
<Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)} >
  {({getRootProps, getInputProps}) => (<div className="card text-center p-5" style={{backgroundColor:"#DEE0E3"}} >
          <center>
          <CloudIcon />
          </center>
        <small className="dx">Drag your file here to upload</small>
   <div className="dxx">Browse files <span className="py-5">
    <DotIcon />
    </span> Download sample CSV</div>
    </div> )}
</Dropzone>
{/* <Formik
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
     </Formik> */}
        </div>
      </div>
    </div>
  </div>
}