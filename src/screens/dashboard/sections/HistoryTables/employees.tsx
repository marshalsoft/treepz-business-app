/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react"
import EditIcon from "../../../../assets/icons/editIcon";
import TrashIcon from "../../../../assets/icons/trashIcon";
import { ConfirmDialogComponent } from "../../components/confirmDialog";
import { EditUserComponent } from "../../components/editUser";
import { Pagination } from "../../../../components/pagination";
import { GetRequest, PostRequest } from "../../../../includes/functions";
import { EmployeeProps } from "../../../../includes/types";
import moment from "moment";
import { BaseLoader } from "../../../../components/baseloader";
interface EmployeesTableProps {
  searchText:string;
}
const EmployeesTable = (props:EmployeesTableProps)=>{
  const [currentPage,setCurrentPage] = useState<number>(1);
  const [updating,setUpdating] = useState<boolean>(false);
  const [showConfirmDailog,setShowConfirmDailog] = useState<boolean>(false);
  const [showEditUser,setShowEditUser] = useState<boolean>(false);
  const [listOfEmployees,setListOfemployees] = useState<EmployeeProps[]>([])
  const [startDate,setStartDate] = useState<string>(moment().subtract(3,"M").toISOString());
  const [endDate,setEndDate] = useState<string>(moment().toISOString());
  const [pageSize,setPageSize] = useState<number>(50);
  const [fetching,setFetching] = useState(false);
 
  const GetEmployees = (page:number)=>{
    setFetching(true);
    GetRequest(`admin/users`,{
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
const [selectedEmployee,setSelectedEmployee] = useState<EmployeeProps | null>(null);
        const [loading,setLoading] = useState(false);
        const DeleteUser = (id:any)=>{
          setLoading(true)
          PostRequest("delete:admin/user",{id:id},true).then((response)=>{
            setLoading(false);
            setListOfemployees(listOfEmployees.filter((a,i)=>a.employeeId !== id))
            setShowConfirmDailog(false)
          })
        }

const UpdateUser = (values:any)=>{
  setUpdating(true)
  PostRequest("patch:admin/user",values,true).then((response)=>{
    setUpdating(false);
    if(response.success)
    {
      GetEmployees(currentPage);
      setShowEditUser(false)
    }
  })
}
        useEffect(()=>{
          GetEmployees(currentPage);
          window.addEventListener("reloadEmployeeTable", (event:any) => {
            if(event.detail)
            {
              setEndDate(event.detail.endDate);
              setStartDate(event.detail.startDate);
              setTimeout(()=>{
                GetEmployees(1);
              },1000)
            }
          });
        },[])
const Alldata = listOfEmployees.filter((a,i)=>String(a.name).toLowerCase().includes(String(props.searchText).toLowerCase()) || String(a.employeeId).toLowerCase().includes(String(props.searchText).toLowerCase()))
return <>
<table className="table">
<thead>
<tr>
  <th scope="col">S.No.</th>
  <th scope="col">Employee ID</th>
  <th scope="col">Employee Name</th>
  <th scope="col">Email Address</th>
  <th scope="col">Check-In</th>
  <th scope="col">Check-Out</th>
  <th scope="col">Location</th>
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
  <td>{i+1}</td>
  <td>{a.employeeId}</td>
  <td>{a.name}</td>
  <td>{a.email}</td>
  <td>{moment(a.checkIn).format("Do, MMM YYYY")}</td>
  <td>{moment(a.checkOut).format("Do, MMM YYYY")}</td>
  <td>{a.location}</td>
  <td >
    <div className="row">
    <div className="col-6">
    <button
    className="btn"
    onClick={()=>{
      setSelectedEmployee(a);
      setShowEditUser(true);
    }}
    >
      <EditIcon />
    </button>
    </div>
    <div className="col-6">
    <button 
    onClick={()=>{
      setSelectedEmployee(a);
      setShowConfirmDailog(true);
    }}
    className="btn">
      <TrashIcon />
    </button>
    </div>
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
 GetEmployees(d)
}}
/>
{showConfirmDailog && <ConfirmDialogComponent 
onClose={()=>{
  setShowConfirmDailog(false)
}}
loading={loading}
confirm={()=>{
  DeleteUser(selectedEmployee?.employeeId)
}}
/>}
{showEditUser && <EditUserComponent
loading={updating}
employeeData={selectedEmployee}
onClose={()=>{
  setShowEditUser(false)
}}
onValue={(values)=>{
  UpdateUser(values)
}}
/>}
</>
}
export default EmployeesTable;
