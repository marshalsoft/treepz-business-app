import React, { ChangeEventHandler, useState } from "react"
import { BaseButton } from "../../../../components/buttons";
import { PostRequest } from '../../../../includes/functions';

interface ConfirmDialogComponentProps {
onClose:()=>void;
confirm:()=>void;
}
export const ConfirmDialogComponent = (props:ConfirmDialogComponentProps)=>{
  const [loading,setLoading] = useState<boolean>(false)
  return  <div className="modal" tabIndex={-1} >
    <div className="modal-dialog" >
      <div className="modal-content" style={{borderRadius:20,marginTop:100}}>
        <div className="modal-header">
          <h5 className="modal-title">Confirm to delete</h5>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={props.onClose}></button>
        </div>
<div className="modal-body p-3">
  <div >This action is irreversible! Are you sure you want to delete this user? </div>
</div> 
<div className="modal-footer">
        <button type="button" onClick={props.onClose} className="btn btn-inactive" >Cancel</button>
        <BaseButton
        style={{minWidth:130}}
        onClick={props.confirm}
        >Confirm</BaseButton>
</div>
</div>
</div>
</div>
}