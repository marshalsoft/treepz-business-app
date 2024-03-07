import React, { useEffect, useState } from 'react'
import { Logo } from '../../components/Logo'
import { LogoDesign } from '../../components/LogoDesign'
import { NavLink, Navigate, Outlet, useLocation } from 'react-router-dom'
import { CONSTANTS, DashboardNavItems } from '../../includes/constant'
import {  DashboardIcon, EmployeeDataIcon, LogoutIcon, SettingsIcon, TreepzHistoryIcon } from './icon'
import './style.css';
import { BaseLoader } from '../../components/baseloader'
import { GetRequest } from '../../includes/functions'
import { SideBar } from './components/mobile/sidebar'

export default function DashboardScreen() {
  
  const [loading,setLoading] = useState(false);

  const location = useLocation();
  const GetUserInfo = ()=>{
   GetRequest("admin",{}).then((response)=>{
     if(response.success)
     {
      localStorage.setItem("userdata",JSON.stringify(response.data))
     }
   })
 }
 useEffect(()=>{
   GetUserInfo();
 },[])
  if(!localStorage.getItem("token"))
  {
   return <Navigate to={"/"+CONSTANTS.Routes.Login} />
  }

  return (<div className='row'>
     <div className='col-3 sidemenu position-relative .d-none' >
     <div className='p-5 ' >
        <Logo />
        <ul className='sub Dashboard-items'>
        {DashboardNavItems.map((a,i)=>{
         return <NavBtn title={a.title} id={i} link={a.link} key={i} />
        })}
        </ul>
        </div>
        <div className='logo-wrapper' >
        <LogoDesign />
        </div>
     </div>
     <div className='col-9 mmain' >
     <div className='' >
     <div className='row p-3' >
        <div className='col-10' >
        <div className='lg-hide' >
        <Logo />
        </div>
        <div className="heading mb-5 m-hide lg-show"><b className='fCap'>{String(location.pathname).replace("/dashboard/","").replace("/personnel","Treepz history").replace(/[- /]/g," ")}</b></div>
        </div>
        <div className='col-2 d-flex align-Item-end justify-content-end' >
        <span className='btn'>
         <NavLink to={"/dashboard/"+CONSTANTS.Routes.Settings} >
            <SettingsIcon color='gray' />
            </NavLink>
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
    {/* <SideBar /> */}
    </div>
  )
}
interface  NavBtnProps {
id?:number
link:string;
title:string;
}
const NavBtn = (props:NavBtnProps)=>{
 
 const path = window.location.pathname
 const link = props.link;
 const ActiveTab = path === link;
 var icon =  <DashboardIcon color={ActiveTab?"rgba(248, 176, 43, 1)":"rgba(138, 139, 142, 1)"} />; 
 if(props.id === 0)
 {
    icon = <DashboardIcon color={ActiveTab?"rgba(248, 176, 43, 1)":"rgba(138, 139, 142, 1)"} />; 
 }
 if(props.id === 1)
   {
      icon = <TreepzHistoryIcon color={ActiveTab?"rgba(248, 176, 43, 1)":"rgba(138, 139, 142, 1)"} /> 
   } 
   if(props.id === 2)
   {
      icon = <EmployeeDataIcon color={ActiveTab?"rgba(248, 176, 43, 1)":"rgba(138, 139, 142, 1)"} /> 
   }
  return <li >
   <NavLink to={props.link} 
  className={ActiveTab?"active" : 'inactive'} 
   ><span>{icon}</span><span >{props.title}</span></NavLink></li>
}
