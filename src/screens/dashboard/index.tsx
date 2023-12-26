import React, { useState } from 'react'
import { Logo } from '../../components/Logo'
import { LogoDesign } from '../../components/LogoDesign'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { DashboardNavItems } from '../../includes/constant'
import {  DashboardIcon, LogoutIcon, PersonalListIcon, SettingsIcon } from './icon'
import './style.css';
import { BaseLoader } from '../../components/baseloader'

export default function DashboardScreen() {
  const [loading,setLoading] = useState(false);
  const location = useLocation();

  return (<div className='row'>
     <div className='col-3 sidemenu position-relative' >
     <div className='p-5 ' >
        <Logo />
        <ul className='sub Dashboard-items'>
        {DashboardNavItems.map((a,i)=>{
        var active = location.pathname === a.link;
         var icon =  <DashboardIcon color={active?"rgba(248, 176, 43, 1)":"rgba(138, 139, 142, 1)"} />; 
         if(i === 1)
         {
            icon = <PersonalListIcon color={active?"rgba(248, 176, 43, 1)":"rgba(138, 139, 142, 1)"} /> 
         } 
        return <li key={i}><NavLink to={a.link} className={({isActive}) => isActive ? "active" : ''}  >{icon}<span></span>{a.title}</NavLink></li>
        })}
        </ul>
        </div>
        <div className='logo-wrapper' >
        <LogoDesign />
        </div>
     </div>
     <div className='col-9' >
     <div className='' >
     <div className='row p-3' >
        <div className='col-10' >
        <div className="heading mb-5"><b className='fCap'>{String(location.pathname).replace("/dashboard/","").replace("/","").replace("_"," ")}</b></div>
        </div>
        <div className='col-2 d-flex align-Item-end justify-content-end' >
        <span className='btn'>
            <SettingsIcon color='gray' />
        </span>
        <span className='btn'
        onClick={()=>{
            if(!loading)
            {
            setLoading(true);
            setTimeout(()=>{
               localStorage.removeItem("token") 
               window.location.reload();
            },1000)
            }
        }}
        >
        {loading?<BaseLoader />:<LogoutIcon color='gray' />}
        </span>
        </div>
     </div>
     <Outlet />
     </div>
     </div>
    </div>
  )
}