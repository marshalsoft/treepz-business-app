import React, { useState } from 'react'
import './../style.css';
import { SearchBar } from '../components/searchBar';
import { useLocation } from 'react-router-dom';
import { AddPersonnelComponent } from '../components/addPersonnel';
import { ImportPersonnelComponent } from '../components/importPersonnel';
import EditIcon from "../../../assets/icons/editIcon";
import TrashIcon from "../../../assets/icons/trashIcon";
import InvitationTable, { Menu } from './HistoryTables/invitations';
import { Pagination } from '../../../components/pagination';
import ThreeVerticalDotsIcon from '../../../assets/icons/threeDots';
export default function TreepzHistorySection(){
  const [showConfirmDailog,setShowConfirmDailog] = useState<boolean>(false);
  const [showEditUser,setShowEditUser] = useState<boolean>(false);
  const [showAddPersonnel,setShowAddPersonnel] = useState<boolean>(false)
  const [showImportPersonnel,setShowImportPersonnel] = useState<boolean>(false)
  const [list,setList] = useState(Array.from({length:12}).map((a,i)=>{
    return {
      id:i,
      
    }
  }))
return <div className='main-scrollable p-5 pt-0' >
  <div className="heading mb-3">
    <b className='fCap'>Treepz history</b></div>
    <SearchBar 
   onSearch={()=>{

   }}
   page='history'
   onAddPersonnel={()=>setShowAddPersonnel(true)}
    onExportPersonnel={()=>{ }}
    onImportPersonnel={()=>setShowImportPersonnel(true)}
   />

<table className="table">
<thead>
<tr>
  <th scope="col">S. No.</th>
  <th scope="col">Employee ID</th>
  <th scope="col">Employee Name</th>
  <th scope="col">Email Address</th>
  <th scope="col">Date</th>
  <th scope="col">Check-In</th>
  <th scope="col">Check-Out</th>
  <th scope="col">Location</th>
  <th scope="col"></th>
</tr>
</thead>
<tbody>
{list.map((a,i)=><tr key={i}>
  <th scope="row">{i+1}</th>
  <td>skskkssks</td>
  <td>Afolabi Oluseyi</td>
  <td>user@maiil.com</td>
  <td>23, October 2023</td>
  <td>05:40:45 PM</td>
  <td>05:40:45 PM</td>
  <td>Lekki</td>
  <td style={{width:50}}>
   <Menu 
   onValue={(value)=>{

   }}
   type='history'
   >
    <ThreeVerticalDotsIcon />
   </Menu>
  </td>
</tr>)}
</tbody>
</table>
<Pagination 
onFilterRow={(d)=>{

}}
onPage={(d)=>{
 
}}
/>
{showAddPersonnel && <AddPersonnelComponent 
onClose={()=>setShowAddPersonnel(false)}
/>}
{showImportPersonnel && <ImportPersonnelComponent 
onClose={()=>setShowImportPersonnel(false)}
/>}
</div>
}