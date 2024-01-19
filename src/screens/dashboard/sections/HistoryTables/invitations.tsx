import React, { useState } from "react"
import ThreeVerticalDotsIcon from "../../../../assets/icons/threeDots";
import ResendIcon from "../../../../assets/icons/resendIcon";
import TrashIcon from "../../../../assets/icons/trashIcon";
import { Pagination } from "../../../../components/pagination";
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
type:"history"|"data"
}
export const Menu = (props:MenuProps)=>{
    const [show,setShow] = useState<boolean>(false);
    return  <div className="dropdown-wrp" >
     <button 
    className="btn"
    onClick={()=>{
        setShow(!show)  
    }}
    >
     {props.children}  
    </button>
        <div className="card dropdown-cnt" >
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
        </>:<>
        <li onClick={()=>{
            props.onValue({value:"view",action:"view"});
            setShow(false);
        }}><ResendIcon /> <span >View</span></li>
        
        </>}
    </ul>}
    </div>
</div>
}
