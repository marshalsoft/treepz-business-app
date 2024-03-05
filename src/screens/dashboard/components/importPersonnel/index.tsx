import React, { useState } from "react";
import Dropzone from 'react-dropzone';
import CloudIcon from "../../../../assets/icons/cloudIcon";
import DotIcon from "../../../../assets/icons/dot";
import { BaseLoader } from "../../../../components/baseloader";
import { PostRequest } from "../../../../includes/functions";

interface ImportPersonnelComponentprops {
onClose:()=>void;
reload?:()=>void;
}


export const ImportPersonnelComponent = (props:ImportPersonnelComponentprops)=>{
 const [loading,setLoading] = useState<boolean>(false);
 const UploadCSVFile = (files:File[])=>{
  setLoading(true);
  PostRequest("admin/import",{
    csvFile:files[0]
  },true,"upload").then((res)=>{
    setLoading(false);
    if(res.success)
    {
      const reloadEvent = new CustomEvent("reloadEmployeeTable", {});
      window.dispatchEvent(reloadEvent);
      props.onClose()
    }
  })
 }
  return  <div className="modal" tabIndex={-1} >
    <div className="modal-dialog">
      <div className="modal-content" style={{borderRadius:20,marginTop:100}}>
        <div className="modal-header">
          <h5 className="modal-title">Upload CSV</h5>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={()=>{
           if(!loading)
           {
            props.onClose()
           }
          }}></button>
        </div>
<div className="modal-body p-3 pb-5">
<p>Upload a CSV to quickly import employee details and create users</p>
<Dropzone 
onDrop={acceptedFiles =>{
  UploadCSVFile(acceptedFiles)
}}
accept={{
  "text/csv": ['.csv']
}
}
>
  {({getRootProps, getInputProps,isDragActive}) => {
  return <div {...getRootProps()} className="card text-center p-5" style={{backgroundColor:isDragActive || loading?"#6efeb266":"#DEE0E3",cursor:"pointer"}} >
   {loading?<div className="d-flex align-items-center justify-content-center" style={{height:80}}>
   <div >
    <BaseLoader  />
    <small className="dx mx-3">Please wait while we upload file.</small>
   </div>
   </div>
   :<> 
          <center>
          <CloudIcon />
          </center>
        <small className="dx">Drag your file here to upload</small>
   <div className="dxx">Browse files <span className="py-5">
    <DotIcon />
    </span> Download sample CSV</div>
    <input {...getInputProps()}  accept=".csv" />
    </>}
    </div> }}
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