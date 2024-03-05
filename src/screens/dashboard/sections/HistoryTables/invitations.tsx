/* eslint-disable react-hooks/exhaustive-deps */
import React, { RefObject, useEffect, useRef, useState } from "react"
import ThreeVerticalDotsIcon from "../../../../assets/icons/threeDots";
import ResendIcon from "../../../../assets/icons/resendIcon";
import TrashIcon from "../../../../assets/icons/trashIcon";
import { Pagination } from "../../../../components/pagination";
import UserIcon from "../../../../assets/icons/UserIcon";
import { EmployeeProps } from "../../../../includes/types";
import { GetRequest, PostRequest } from "../../../../includes/functions";
import { BaseLoader } from "../../../../components/baseloader";
import moment from "moment";
interface InvitationTableProps {
  searchText?:string;
}
const InvitationTable = (props:InvitationTableProps)=>{
    const [loadingItem,setLoadingItem] = useState<string>("");
    const [pageSize,setPageSize] = useState<number>(50);
    const [listOfEmployees,setListOfemployees] = useState<EmployeeProps[]>([])
    const [startDate,setStartDate] = useState<string>(moment().subtract(3,"M").toISOString());
    const [endDate,setEndDate] = useState<string>(moment().toISOString());
    const [fetching,setFetching] = useState(false);
   
    const GetInvitatedEmployees = (page:number)=>{
      setFetching(true);
    GetRequest("admin/invites",{
      page:page,
      pageSize:pageSize,
      startDate:moment(startDate).format("YYYY-MM-DD"),
      endDate:moment(endDate).format("YYYY-MM-DD")
    },false).then((res)=>{
      setFetching(false);
      if(res.success)
      {
        setListOfemployees(res.data.users);
      }
    })
        }
  const ResendInvitation = (v:EmployeeProps)=>{
    setLoadingItem(v.email);
    PostRequest(`admin/invite/resend`,{
      email:v.email
    },true).then((res)=>{
      setLoadingItem("");
    })
  }
  const CancelInvitation = (v:EmployeeProps)=>{
    setLoadingItem(v.email);
    PostRequest(`admin/invite/cancel`,{
      email:v.email
    },true).then((res)=>{
      setLoadingItem("");
      GetInvitatedEmployees(pageSize);
    })
  }
 useEffect(()=>{
          GetInvitatedEmployees(pageSize);
          window.addEventListener("reloadinvitedTable", (event:any) => {
            if(event.detail)
            {
              setEndDate(event.detail.endDate);
              setStartDate(event.detail.startDate);
              setTimeout(()=>{
                GetInvitatedEmployees(pageSize);
              },1000)
            }
          });
  },[])
const Alldata = listOfEmployees.filter((a,i)=>String(a.name).toLowerCase().includes(String(props.searchText).toLowerCase()) || String(a.employeeId).toLowerCase().includes(String(props.searchText).toLowerCase())  || String(a.email).toLowerCase().includes(String(props.searchText).toLowerCase()))
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
{fetching && <tr >
  <td colSpan={10}>
    <BaseLoader /> <small className='fs-small'>Fetching...</small>
  </td>
</tr>}
{Alldata.map((a,i)=><tr key={i}>
  <th scope="row">{i+1}</th>
  <td>{a.employeeId}</td>
  <td>{a.username}</td>
  <td>{a.email}</td>
  <td style={{width:50}}>
  <div style={{width:50}} className="d-flex align-items-center justify-content-center">
   {loadingItem === a.email ?<BaseLoader />:<Menu 
   onValue={(value)=>{
    if(value.action === "resend")
    {
      ResendInvitation(a)
    }
    if(value.action === "cancel")
    {
      CancelInvitation(a)
    }
   }}
   type="data"
   >
    <ThreeVerticalDotsIcon />
   </Menu>}
   </div>
  </td>
</tr>)}
</tbody>
</table>
<Pagination 
onFilterRow={(d)=>{
setPageSize(d)
}}
onPage={(d)=>{
  GetInvitatedEmployees(d);
}}
/>
</>
}
export default InvitationTable;
export interface MenuProps{
children:JSX.Element;
onValue:(d:{value:string;action:string;})=>void;
type:"history"|"data"|"new"
list?:ItemProps[]
}
export interface ItemProps {
  title:string;
  value:string;
  icon?:JSX.Element;
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
        }}><ResendIcon /> <span >View details</span></li>
         <li onClick={()=>{
            props.onValue({value:"delete",action:"delete"});
            setShow(false);
        }}><TrashIcon /> <span >Delete</span></li>
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
