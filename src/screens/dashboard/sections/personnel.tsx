import React, { useState } from 'react'
import './../style.css';
import { SearchBar } from '../components/searchBar';
import { useLocation } from 'react-router-dom';
import { AddPersonnelComponent } from '../components/addPersonnel';
import { ImportPersonnelComponent } from '../components/importPersonnel';
import EmployeesTable from './HistoryTables/employees';
import InvitationTable from './HistoryTables/invitations';
export default function PersonnelSection(){
  const location = useLocation();
  const [tab,setTab] = useState<string>("employee")
  const [showAddPersonnel,setShowAddPersonnel] = useState<boolean>(false)
  const [showImportPersonnel,setShowImportPersonnel] = useState<boolean>(false)
return <div className='main-scrollable p-5 pt-0' >
  <div className="heading mb-3">
    <b className='fCap'>{String(location.pathname).replace("/dashboard/","").replace("/","").replace("_"," ")}</b></div>
    <SearchBar 
   onSearch={()=>{

   }}
   page='personnel'
   onAddPersonnel={()=>setShowAddPersonnel(true)}
    onExportPersonnel={()=>{ }}
    onImportPersonnel={()=>setShowImportPersonnel(true)}
   />
<nav className="nav pl-c">
  <span onClick={()=>{
    setTab("employee");
    }} className={`nav-link active btn ${tab == "employee"?"nav-link-active":""}`} aria-current="page" >Employees</span>
  <span onClick={()=>setTab("invited")}  className={`nav-link btn ${tab == "invited"?"nav-link-active":""}`} >Invited members</span>
</nav>
{tab == "employee"?<EmployeesTable />:null}
{tab == "invited"?<InvitationTable />:null}
{showAddPersonnel && <AddPersonnelComponent 
onClose={()=>setShowAddPersonnel(false)}
/>}
{showImportPersonnel && <ImportPersonnelComponent 
onClose={()=>setShowImportPersonnel(false)}
/>}
</div>
}