import React, { useState } from 'react'
import { Logo } from '../../../components/Logo'
import { LogoDesign } from '../../../components/LogoDesign'
import { PoweredByComponent } from '../../../components/PoweredBy'
import BaseInput from '../../../components/baseInput'
import { NavLink, useLocation } from 'react-router-dom'
import { CONSTANTS, DashboardNavItems } from '../../../includes/constant'
import { PostRequest } from '../../../includes/functions';
import { ToastContainer, toast } from 'react-toastify';
import { CalendarIcon, CaretDownIcon, DashboardIcon, LockIcon, LogoutIcon, PersonIcon, PersonalListIcon, SettingsIcon, UnLockIcon } from '../icon'
import './../style.css';
import { SearchBar } from '../components/searchBar'
export default function DashboardSection(){
    const tabs = [
        {class:"yellow-card",title:"Total Employees",amount:"2000"},
        {class:"black-card",title:"Total Check-ins",amount:"1000"},
        {class:"gray-card",title:"Total Check-outs",amount:"3000"}
      ]
    return <div className='main-scrollable p-5 pt-0' >
    <div className='row' >
    <div className='col-8' >
    <div className="title-text">Welcome back 😊</div>
    <div className="">Let's pick things up from where you left it</div>
    </div>
    <div className='col-4' >
    <div className='bx' >
    <CalendarIcon /> 
    <span  className='tx'>Jan 1, 2022 - Jul 31, 2023</span>
    <span className='caret'>
        <CaretDownIcon />
    </span>
    </div>    
    </div>
    </div>
    <div className='row pt-5 pb-3' >
   {tabs.map((a,i)=><div 
    key={i} 
    className='col-4' 
    >
  <div className={`card dx-card ${a.class}`} >
    <div className='row ps-3'>
    <div className='col-8 p-3'>
    <div className='t1' >{a.title}</div>
    <div className='t2' >{a.amount}</div>
    <div  className='d-flex'>
    <span className='gt'>
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 12L12 4M12 4H6.66667M12 4V9.33333" stroke="#3CC13B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    66%
    </span>
    <span className='ps-2 text-2'>From last month</span>
    </div>
    </div>
    <div className='col-4 p-3 position-relative'>
    <div className='circle'>
    {i == 0 && <PersonIcon />}
    {i == 1 && <LockIcon />}
    {i == 2 && <UnLockIcon />}
    </div>    
    </div>
    </div>
  </div>
    </div>)}
    </div>
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