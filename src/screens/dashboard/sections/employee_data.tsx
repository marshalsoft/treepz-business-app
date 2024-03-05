import React, { useState } from 'react'
import './../style.css';
import { SearchBar } from '../components/searchBar';
import { AddPersonnelComponent } from '../components/addPersonnel';
import { ImportPersonnelComponent } from '../components/importPersonnel';
import EmployeesTable from './HistoryTables/employees';
import InvitationTable from './HistoryTables/invitations';
export default function EmplyeeDataSection(){
  const [tab,setTab] = useState<string>("employee")
  const [showAddPersonnel,setShowAddPersonnel] = useState<boolean>(false)
  const [showImportPersonnel,setShowImportPersonnel] = useState<boolean>(false);
  const [searchText,setSearchText] = useState<string>("");
  
return <div className='main-scrollable p-5 pt-0' >
  <div className="heading mb-3" >
    <b className='fCap'>Treepz history</b></div>
    <SearchBar 
   onSearch={(d)=>{
    setSearchText(d)
   }}
   page='data'
   onAddPersonnel={()=>setShowAddPersonnel(true)}
    onExportPersonnel={()=>{ 
    }}
    onImportPersonnel={()=>setShowImportPersonnel(true)}
    showFilter={true}
    onFilterValue={({startDate,endDate})=>{
      const sendData = {startDate,endDate}
      const reloadEvent = new CustomEvent(tab === "employee"?"reloadEmployeeTable":"reloadinvitedTable", {detail:sendData});
      window.dispatchEvent(reloadEvent);
    }}
   />
<nav className="nav pl-c">
  <span onClick={()=>{
    setTab("employee");
    setSearchText("")
    }} 
    className={`nav-link active btn p-2 mb-2 ${tab === "employee"?"fw-bold selected-tab":"fw-normal"}`} aria-current="page" >Employees</span>
  <span
   onClick={()=>{
    setSearchText("")
    setTab("invited")
   }} 
    className={`nav-link btn p-2 mb-2 ${tab === "invited"?"fw-bold selected-tab":"fw-normal"}`} >Invited members</span>
</nav>
{tab === "employee"?<EmployeesTable 
searchText={searchText}
/>:null}
{tab === "invited"?<InvitationTable 
searchText={searchText}
/>:null}
{showAddPersonnel && <AddPersonnelComponent 
onClose={()=>setShowAddPersonnel(false)}
/>}
{showImportPersonnel && <ImportPersonnelComponent 
onClose={()=>setShowImportPersonnel(false)}
/>}
</div>
}