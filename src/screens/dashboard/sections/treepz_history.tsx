/* eslint-disable react-hooks/exhaustive-deps */
import { RefObject, useEffect, useRef, useState } from 'react'
import './../style.css';
import { SearchBar } from '../components/searchBar';
import { AddPersonnelComponent } from '../components/addPersonnel';
import { ImportPersonnelComponent } from '../components/importPersonnel';
import { Menu } from './HistoryTables/invitations';
import { Pagination } from '../../../components/pagination';
import ThreeVerticalDotsIcon from '../../../assets/icons/threeDots';
import { GetRequest, PostRequest } from '../../../includes/functions';
import { EmployeeProps, HistoryProps } from '../../../includes/types';
import moment from 'moment';
import {DownloadIcon } from '../../../assets/icons/DownloadBtn';
import { BaseLoader } from '../../../components/baseloader';
export default function TreepzHistorySection(){
  const [processing,setProcessing] = useState<boolean>(false)
  const [loading,setLoading] = useState<boolean>(false)
  const [showAddPersonnel,setShowAddPersonnel] = useState<boolean>(false)
  const [employeeDetails,setEmployeeDetails] = useState<HistoryProps | null>(null)
  const [filterString,setFilterString] = useState<string>("");
  const [showImportPersonnel,setShowImportPersonnel] = useState<boolean>(false)
  const [historyList,setHistoryList] = useState<HistoryProps[]>([]);
  const [startDate,setStartDate] = useState<string>(moment().subtract(3,"M").toISOString());
  const [endDate,setEndDate] = useState<string>(moment().toISOString());
  const [pageSize,setPageSize] = useState<number>(50);
  
  const handleExport = ()=>{
    setProcessing(true);
    GetRequest("admin/export",{
      startDate : moment(startDate).format("YYYY-MM-DD"),
      endDate :moment(endDate).format("YYYY-MM-DD")
    },true).then((res)=>{
    setProcessing(false);
    })
}
const GetEmployeesHistory = (page:number)=>{
  setLoading(true);
  GetRequest("admin/attendence/history",{
    page:page,
    pageSize:pageSize,
    startDate : moment(startDate).format("YYYY-MM-DD"),
    endDate :moment(endDate).format("YYYY-MM-DD")
  },false).then((res)=>{
  setLoading(false);
    if(res.success)
    {
      setHistoryList(res.data);
    }
  })
}
const DeleteUser = (id:string)=>{
 PostRequest("delete:admin/user",{
  id:id
}).then((res)=>{
  if(res.success)
  {
    setHistoryList(historyList.filter((a,i)=>a.employeeId !== id));
  }
 })
}
const printedSection = useRef() as RefObject<HTMLDivElement>;
useEffect(()=>{
  GetEmployeesHistory(1);
},[])
const PrintInfo =()=>{
  if(printedSection.current)
  {
  var openWindow = window.open("", "title", "attributes");
  openWindow?.document.write(printedSection.current?.innerHTML);
  openWindow?.document.close();
  openWindow?.focus();
  openWindow?.print();
  openWindow?.close();
  }
}
const AllItems:HistoryProps[] = historyList.filter((a,i)=>a.employeeName.includes(filterString));
return <div style={{position:"relative"}}>
<div className='main-scrollable p-5 pt-0' >
  <div className="heading mb-3">
    <b className='fCap'>Treepz history</b></div>
    <SearchBar 
   onSearch={(d)=>{
    setFilterString(d);
   }}
   page='history'
   onAddPersonnel={()=>setShowAddPersonnel(true)}
   processing={processing}
   onExportPersonnel={()=>{
      handleExport()
   }}
    onImportPersonnel={()=>setShowImportPersonnel(true)}
    showFilter={true}
    onFilterValue={({startDate,endDate})=>{
      setStartDate(startDate)
      setEndDate(endDate)
    }}
   />

<table className="table table-responsive">
<thead>
<tr>
  <th scope="col">S. No.</th>
  <th scope="col">Employee ID</th>
  <th scope="col">Employee Name</th>
  <th scope="col">Email Address</th>
  <th scope="col">Check-In</th>
  <th scope="col">Check-Out</th>
  <th scope="col">Vehicle Name</th>
  <th scope="col">Vehicle Number</th>
  <th scope="col">Vehicle tag</th>
  <th scope="col"></th>
</tr>
</thead>
<tbody>
{loading && <tr >
  <td colSpan={10}>
    <BaseLoader /> <small className='fs-small'>Fetching...</small>
  </td>
</tr>}
{AllItems.map((a,i)=><tr key={i}>
  <td>{i+1}</td>
  <td>{a.employeeId}</td>
  <td>{a.employeeName}</td>
  <td>{a.email}</td>
  <td>{a.checkIn}</td>
  <td>{a.checkOut}</td>
  <td>{a.vehicleName}</td>
  <td>{a.vehicleNumber}</td>
  <td>{a.vehicleTag}</td>
  <td style={{width:50}}>
   <Menu 
   onValue={(value)=>{
    if(value.action === "delete")
    {
      DeleteUser(a.employeeId)
    }
    if(value.action === "view")
    {
      setEmployeeDetails(a)
    }
   }}
   type='history'
   >
    <ThreeVerticalDotsIcon />
   </Menu>
  </td>
</tr>)} 
</tbody>
</table>
<Pagination 
onFilterRow={(d)=>{
  setPageSize(d);
}}
onPage={(d)=>{
  GetEmployeesHistory(d);
}}
/>
{showAddPersonnel && <AddPersonnelComponent 
onClose={()=>setShowAddPersonnel(false)}
/>}
{showImportPersonnel && <ImportPersonnelComponent 
onClose={()=>setShowImportPersonnel(false)}
/>}
</div>
{employeeDetails && <div className='main-scrollable p-5 pt-3' style={{position:"absolute",top:0,left:0,background:"white",height:"100%",width:"100%"}} >
<div style={{width:200,paddingTop:20,paddingLeft:10,height:60,position:"fixed",top:0,left:360,backgroundColor:"white"}} >
  <b className='fCap'>Trip details</b>
</div>
<div className='row' >
<div className='col-9' ref={printedSection}  >
<div className='row pb-3' >
<div className='col-4' >Employee ID</div>  
<div className='col-4' >{employeeDetails.employeeId}</div>  
</div>

<div className='row pb-3' >
<div className='col-4' >Employee Name</div>  
<div className='col-4' >{employeeDetails.employeeName}</div>  
<div className='col-4' ></div>  
</div>
<div className='row pb-3' >
<div className='col-4' >Email Address</div>  
<div className='col-4' >{employeeDetails.email}</div>  
</div>
<div className='row pb-3' >
<div className='col-4' >Check-In</div>  
<div className='col-4' >{employeeDetails.checkIn}</div>  
</div>
<div className='row pb-3' >
<div className='col-4' >Check-Out</div>  
<div className='col-4' >{employeeDetails.checkOut}</div>  
</div>
<div className='row pb-2' >
<div className='col-4' >Vehicle Name</div>  
<div className='col-4' >{employeeDetails.vehicleName}</div>  
</div>
<div className='row pb-2' >
<div className='col-4' >Vehicle Number</div>  
<div className='col-4' >{employeeDetails.vehicleNumber}</div>  
</div>
<div className='row pb-2' >
<div className='col-4' >Vehicle Tag</div>  
<div className='col-4' >{employeeDetails.vehicleTag}</div>  
</div>
</div>
<div className='col-3' >
<button className='gray-card btn'
onClick={()=>{
  PrintInfo()
}}
>
  <DownloadIcon />
    <span className='px-2 fw-bold fs-6' >Download receipt</span>
  </button>
  </div>  
</div>
</div>}
</div>
}