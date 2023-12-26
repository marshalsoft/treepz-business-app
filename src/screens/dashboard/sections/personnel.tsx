import React from 'react'
import './../style.css';
import { SearchBar } from '../components/searchBar';
import { useLocation } from 'react-router-dom';
export default function PersonnelSection(){
  const location = useLocation();
return <div className='main-scrollable p-5 pt-0' >
  <div className="heading mb-3">
    <b className='fCap'>{String(location.pathname).replace("/dashboard/","").replace("/","").replace("_"," ")}</b></div>
<SearchBar />
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
</div>
}