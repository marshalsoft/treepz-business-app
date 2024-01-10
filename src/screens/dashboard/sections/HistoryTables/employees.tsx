import React, { useState } from "react"
import EditIcon from "../../../../assets/icons/editIcon";
import TrashIcon from "../../../../assets/icons/trashIcon";
import { ConfirmDialogComponent } from "../../components/confirmDialog";
import { EditUserComponent } from "../../components/editUser";
const EmployeesTable = ()=>{
  const [showConfirmDailog,setShowConfirmDailog] = useState<boolean>(false);
  const [showEditUser,setShowEditUser] = useState<boolean>(false);
return <>
<table className="table">
<thead>
<tr>
  <th scope="col">S. No.</th>
  <th scope="col">Employee ID</th>
  <th scope="col">Employee Name</th>
  <th scope="col">Email Address</th>
  <th scope="col">Check-In</th>
  <th scope="col">Check-Out</th>
  <th scope="col">Location</th>
  <th scope="col"></th>
</tr>
</thead>
<tbody>
{Array.from({length:12}).map((a,i)=><tr key={i}>
  <th scope="row">{i+1}</th>
  <td>234563IJ</td>
  <td>Afolabi Oluseyi</td>
  <td>afolabioluseyi@wakanow.com</td>
  <td>23, October 2023</td>
  <td>23, October 2023</td>
  <td>Sbury lekki</td>
  <td >
    <div className="row">
    <div className="col-6">
    <button
    className="btn"
    onClick={()=>setShowEditUser(true)}
    >
      <EditIcon />
    </button>
    </div>
    <div className="col-6">
    <button 
    onClick={()=>setShowConfirmDailog(true)}
    className="btn">
      <TrashIcon />
    </button>
    </div>
    </div>
  </td>
</tr>)}
</tbody>
</table>
{showConfirmDailog && <ConfirmDialogComponent 
onClose={()=>{
  setShowConfirmDailog(false)
}}
confirm={()=>{
  setShowConfirmDailog(false)
}}
/>}
{showEditUser && <EditUserComponent
onClose={()=>{
  setShowEditUser(false)
}}
onValue={()=>{
  setShowEditUser(false)
}}
/>}
</>
}
export default EmployeesTable;
