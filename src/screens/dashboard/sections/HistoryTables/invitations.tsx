import React, { RefObject, useEffect, useRef, useState } from "react"
import ThreeVerticalDotsIcon from "../../../../assets/icons/threeDots";
import ResendIcon from "../../../../assets/icons/resendIcon";
import TrashIcon from "../../../../assets/icons/trashIcon";
import { Pagination } from "../../../../components/pagination";
import { PersonIcon } from "../../icon";
import UserIcon from "../../../../assets/icons/UserIcon";
const InvitationTable = ()=>{
return <>
<table className="table">
<thead>
<tr>
  <th scope="col">S. No.</th>
  <th scope="col">Employee ID</th>
  <th scope="col">Employee Name</th>
  <th scope="col">Email Address</th>
  <th scope="col"></th>
</tr>
</thead>
<tbody>
{Array.from({length:12}).map((a,i)=><tr key={i}>
  <th scope="row">{i+1}</th>
  <td>skskkssks</td>
  <td>Afolabi Oluseyi</td>
  <td>user@maiil.com</td>
  <td style={{width:50}}>
   <Menu 
   onValue={(value)=>{

   }}
   type="data"
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
</>
}
export default InvitationTable;
export interface MenuProps{
children:JSX.Element;
onValue:(d:{value:string;action:string;})=>void;
type:"history"|"data"|"new"
}
export const Menu = (props:MenuProps)=>{
    const [show,setShow] = useState<boolean>(false);
    const thisDropDown = useRef() as RefObject<HTMLDivElement>;
   useEffect(()=>{
    thisDropDown.current?.addEventListener("mouseleave",()=>{
        setShow(false);
    })
   },[])
   return  <div className="dropdown-wrp" >
     <button 
    className="btn"
    onClick={()=>{
        setShow(!show)  
    }}
    >
     {props.children}  
    </button>
     <div className="card dropdown-cnt" 
     ref={thisDropDown}
     >
    {show && <ul >
        {props.type === "data"?<>
        <li onClick={()=>{
            props.onValue({value:"resend invitation",action:"resend"});
            setShow(false);
        }}><ResendIcon /> <span >Resend invitation</span></li>
        <li onClick={()=>{
            props.onValue({value:"cancel invitation",action:"cancel"});
            setShow(false); 
        }}><TrashIcon /><span>Cancel invite</span></li>
        </>:null}
        {props.type === "history"?<>
        <li onClick={()=>{
            props.onValue({value:"view",action:"view"});
            setShow(false);
        }}><ResendIcon /> <span >View</span></li>
        </>:null}
        {props.type === "new"?<>
        <li onClick={()=>{
            props.onValue({value:"import",action:"import"});
            setShow(false);
        }}><ResendIcon /> <span >Import employee</span></li>
        <li onClick={()=>{
            props.onValue({value:"add",action:"add"});
            setShow(false);
        }}>
            <UserIcon /> 
        <span >Add single employee</span></li>
        </>:null}
    </ul>}
    </div>
</div>
}
