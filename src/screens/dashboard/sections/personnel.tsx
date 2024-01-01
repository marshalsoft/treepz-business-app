import React, { useState } from 'react'
import './../style.css';
import { SearchBar } from '../components/searchBar';
import { useLocation } from 'react-router-dom';
import { AddPersonnelComponent } from '../components/addPersonnel';
import { ImportPersonnelComponent } from '../components/importPersonnel';
export default function PersonnelSection(){
  const location = useLocation();
  const [showAddPersonnel,setShowAddPersonnel] = useState<boolean>(false)
  const [showImportPersonnel,setShowImportPersonnel] = useState<boolean>(false)
return <div className='main-scrollable p-5 pt-0' >
  <div className="heading mb-3">
    <b className='fCap'>{String(location.pathname).replace("/dashboard/","").replace("/","").replace("_"," ")}</b></div>
    <SearchBar 
   onSearch={()=>{

   }}
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
  <td>23, October 2023</td>
</tr>)}
</tbody>
</table>
{showAddPersonnel && <AddPersonnelComponent 
onClose={()=>setShowAddPersonnel(false)}
/>}
{showImportPersonnel && <ImportPersonnelComponent 
onClose={()=>setShowImportPersonnel(false)}
/>}
</div>
}