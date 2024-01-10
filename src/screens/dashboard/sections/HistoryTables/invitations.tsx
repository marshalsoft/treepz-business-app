import React, { useState } from "react"
import ThreeVerticalDotsIcon from "../../../../assets/icons/threeDots";
import ResendIcon from "../../../../assets/icons/resendIcon";
import TrashIcon from "../../../../assets/icons/trashIcon";
const InvitationTable = ()=>{
return <table className="table">
<thead>
<tr>
  <th scope="col">S. No.</th>
  <th scope="col">Employee ID</th>
  <th scope="col"></th>
</tr>
</thead>
<tbody>
{Array.from({length:12}).map((a,i)=><tr key={i}>
  <th scope="row">{i+1}</th>
  <td>Afolabi Oluseyi</td>
  <td style={{width:50}}>
   <Menu 
   onValue={(value)=>{

   }}
   >
    <ThreeVerticalDotsIcon />
   </Menu>
  </td>
</tr>)}
</tbody>
</table>
}
export default InvitationTable;
export interface MenuProps{
children:JSX.Element;
onValue:(d:{value:string;action:string;})=>void;
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
        <li onClick={()=>{
            props.onValue({value:"resend invitation",action:"resend"});
            setShow(false);
        }}><ResendIcon /> <span >Resend invitation</span></li>
        <li onClick={()=>{
            props.onValue({value:"cancel invitation",action:"cancel"});
            setShow(false); 
        }}><TrashIcon /><span>Cancel invite</span></li>
    </ul>}
    </div>
</div>
}
