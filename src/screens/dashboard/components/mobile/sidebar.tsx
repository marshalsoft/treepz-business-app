import React from "react";
import { Logo } from "../../../../components/Logo";
import { DashboardNavItems } from "../../../../includes/constant";
import { LogoDesign } from "../../../../components/LogoDesign";
import { DashboardIcon, EmployeeDataIcon, TreepzHistoryIcon } from "../../icon";
import { NavLink } from "react-router-dom";
interface  NavBtnProps {
    id?:number
    link:string;
    title:string;
    }
export const SideBar = ()=>{
    return  <div className='float-sidebar'>
    <div className='inner' >
    <div className='p-3 ' >
        <Logo 
        size={80}
        />
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
   </div>
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
       ><span>{icon}</span>
       <span>{props.title}</span>
       </NavLink></li>
    }