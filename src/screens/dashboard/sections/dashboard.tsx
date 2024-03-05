import React, { RefObject, useEffect, useRef, useState } from 'react'
import { CalendarIcon, CaretDownIcon, LockIcon,PersonIcon,UnLockIcon } from '../icon'
import './../style.css';
import { AddPersonnelComponent } from '../components/addPersonnel';
import { ImportPersonnelComponent } from '../components/importPersonnel';
import {Chart as ChartJS,CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,} from 'chart.js/auto';
import {Bar} from 'react-chartjs-2';
import { ChartDataProps, EmployeeProps } from '../../../includes/types';
import { GetRequest, PostRequest } from '../../../includes/functions';
import moment from 'moment';
import { NavLink } from 'react-router-dom';
import { CONSTANTS } from '../../../includes/constant';

import { BaseButton } from '../../../components/buttons';
import { CalendarComponent } from '../../../components/Calender';
import { BaseLoader } from '../../../components/baseloader';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)
export default function DashboardSection(){
  const tableFilter:string[] = ["Combined","Check-Ins","Check-Outs"];
  const [showCalendar,setShowCalendar] = useState<boolean>(false)
  const [searching,setSearching] = useState<boolean>(false)
  const [startDate,setStartDate] = useState<string>(moment().subtract(3,"M").toISOString());
  const [endDate,setEndDate] = useState<string>(moment().toISOString());
  const [showAddPersonnel,setShowAddPersonnel] = useState<boolean>(false);
  const [showImportPersonnel,setShowImportPersonnel] = useState<boolean>(false);
  const [totalEmployees,setTotalEmmployees] = useState<number>(0);
  const [totalCheckIn,setTotalCheckIn] = useState<number>(0);
  const [totalCheckOut,setTotalCheckOut] = useState<number>(0);
    const tabs = [
        {class:"yellow-card",title:"Total Employees",amount:totalEmployees},
        {class:"black-card",title:"Total Check-ins",amount:totalCheckIn},
        {class:"gray-card",title:"Total Check-outs",amount:totalCheckOut}
      ];
      const  [chartCheckInData,setchartCheckInData] = useState<ChartDataProps>(
        {
           data:[],
          labels:[]
        }
      )
      const  [chartCheckOutData,setchartCheckOutData] = useState<ChartDataProps>(
        {
           data:[],
          labels:[]
        }
      )

   const [selectedTab,setSelectedTab] = useState<string>(tableFilter[0])
   const AllCheckInCheckOut = ()=>{
    GetRequest("admin/attendence/count",{},false).then((res)=>{
      if(res.success && res.data.length !== 0)
      {
        setTotalCheckIn(res.data[0].checkIns);
        setTotalCheckOut(res.data[0].checkouts);
      }
    })
   }
   const AllEmployees = ()=>{
    GetRequest("admin/users?page=1&pageSize=500",{},false).then((res)=>{
      // alert(JSON.stringify(res));
      if(res.success && res.data.users)
      {
        setTotalEmmployees(res.data.users.length)
      }
    })
   }
   const AllChartData = ()=>{
    setSearching(true)
    GetRequest("admin/attendence/report",{
      startDate : startDate === null?moment().subtract(1,"M").format("YYYY-MM-DDD"):startDate,
      endDate : startDate === null?moment().format("YYYY-MM-DDD"):startDate
    },false,false).then((res)=>{
      setSearching(false)
    if(res.success)
    {
        var selectMonths:string[] = [];
        var countIntervalsCheckIn:number[] = [];
        var countIntervalsCheckOut:number[] = [];
        res.data.forEach((a:any,i:number)=>{
          const month = moment(a.checkIns[0]).format("MMM");
          selectMonths.push(month);
          countIntervalsCheckIn.push(a.checkIns.length);
          countIntervalsCheckIn.push(100);
          countIntervalsCheckOut.push(a.checkOuts.length);
          countIntervalsCheckOut.push(100);
        })
        setchartCheckInData({
          data:countIntervalsCheckIn,
          labels:selectMonths
        })
        setchartCheckOutData({
          data:countIntervalsCheckOut,
          labels:selectMonths
        })
      }
  })
}
   const handleSelect = (date: Date)=>{
    console.log(date); // native Date object
  }
  useEffect(()=>{

  },[])
   useEffect(()=>{
    AllCheckInCheckOut();
    AllChartData();
    AllEmployees();
    thisView.current?.addEventListener("mouseleave",()=>{
      setShowCalendar(false);
    })
   },[startDate,endDate])
  const thisView = useRef() as RefObject<HTMLDivElement>
 
   return <div className='main-scrollable p-5 pt-0' >
    <div className='row' >
    <div className='col-8' >
    <div className="title-text">Welcome back 😊</div>
    <div className="">Let's pick things up from where you left it</div>
    </div>
    <div className='col-4' >
    <div
    ref={thisView}
    className='position-relative'>
    <div 
   className='cursor-pointer'
    onClick={()=>{
      setShowCalendar(!showCalendar);
    }}
    >
    <div className='bx'
    
    >
    {searching ?<BaseLoader  />:<CalendarIcon />} 
    <span  className='tx'>{moment(startDate).format("MMM DD, YYYY")} - {moment(endDate).format("MMM DD, YYYY")}</span>
    <span className='caret'
    >
    <CaretDownIcon />
    </span>
    </div> 
    </div>
    {showCalendar && <CalendarComponent 
    onClose={()=>{
      setShowCalendar(false)
    }}
    startDate={moment().subtract(3,"M").format("MM-DD-YYYY")}
    onValue={({startDate,endDate})=>{
        setEndDate(endDate)
        setStartDate(startDate)
        setShowCalendar(false)
        setTimeout(()=>{
        AllChartData()
      },1000)
      }}
      />} 
    </div>  
    </div>
    </div>
    <div className='row pt-5 pb-3' >
      <div className='col-8' >
      <div className='card' style={{minHeight:370,position:'relative'}} >
      <div className='row p-3'>
      <div className='col-4' >
        <div className='chart-title'>TREEPZ HISTORY</div>
        <div className='chart-date'>{moment(startDate).format("MMM DD, YYYY")} - {moment(endDate).format("MMM DD, YYYY")}</div>
      </div>
      <div className='col-8 pe-3' >
        <div className='chart-tabs-container row'>
          {tableFilter.map((a,i)=><div key={i}
          onClick={()=>{
            setSelectedTab(a);
          }}
          className={`col-4 ${selectedTab === a?"chart-tabs-active":""}`}>{a}</div>)}
        </div>
      </div>
      </div>
      <div className='px-3' style={{position:'relative',height:360,overflow:"hidden"}} >
      {selectedTab === "Check-Ins" || selectedTab === "Combined" ?<div style={{height:"100%"}}>
        <Bar
        data={{
          labels:chartCheckInData.labels,
          datasets:[
            {
              label:"",
              data:chartCheckInData.data,
              backgroundColor:"#F8B02B",
              maxBarThickness:30
            }
          ]
        }}
        color="red"
        />
      </div>:null}
      {selectedTab === "Check-Outs" || selectedTab === "Combined" ?<div style={{position:'absolute',left:40,top:-18,width:580,height:370}}>
        <Bar
        options= {
          {scales: {
            x: {
              display: selectedTab === "Check-Outs"?true:false,
           },
           y: {
              display: selectedTab === "Check-Outs"?true:false,
           }
          }
        }}
        data={{
          labels:chartCheckOutData.labels,
          datasets:[
            {
              label:"",
              data:chartCheckOutData.data,
              backgroundColor:"#3B6FE9",
              maxBarThickness:20,
            }
          ]
        }}
        color="red"
        />
      </div>:null}
      </div>
      <div className='d-flex align-items-center justify-content-end' style={{position:"absolute",bottom:10,left:0,zIndex:999999,width:"100%"}}>
        <div className='c-box-checkin'></div> 
        <span className='px-2 cb-txt'>Check-ins</span>
        <div className='c-box-checkout'></div>
        <span className='px-2 cb-txt'>Check-outs</span>
      </div>
      </div>
      </div>
      <div className='col-4' >
   {tabs.map((a,i)=><div key={i} className={`card dx-card mb-3 ${a.class}`} >
    <div className='row ps-3'>
    <div className='col-8 p-3'>
    <div className='t1' >{a.title}</div>
    <div className='t2' >{a.amount}</div>
    <div  className='d-flex'>
    <span className='gt'>
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 12L12 4M12 4H6.66667M12 4V9.33333" stroke="#3CC13B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
    66%
    </span>
    <span className='ps-2 text-2'>From last month</span>
    </div>
    </div>
    <div className='col-4 p-3 position-relative'>
    <div className='circle'>
    {i === 0 && <PersonIcon />}
    {i === 1 && <LockIcon />}
    {i === 2 && <UnLockIcon />}
    </div>    
    </div>
    </div>
    </div>)}
    </div>
    </div>
<TableSection />
{showAddPersonnel && <AddPersonnelComponent 
onClose={()=>setShowAddPersonnel(false)}
/>}
{showImportPersonnel && <ImportPersonnelComponent 
onClose={()=>setShowImportPersonnel(false)}
/>}
</div>
}

const TableSection = ()=>{
  const [listOfEmployees,setListOfemployees] = useState<EmployeeProps[]>([])
  const GetEmployees = ()=>{
    GetRequest("admin/users",{},false).then((res)=>{
      if(res.success)
      {
        setListOfemployees(res.data.users);
      }
    })
        }
        useEffect(()=>{
          GetEmployees();
        },[])
  return <>
   <div className="d-flex align-items-center mb-3">
      <span  className='table-title'>Treepz History</span>
      <span className='bx ms-3 d-flex align-items-center justify-content-center'
       style={{width:90,height:30}} 
       ><span 
       style={{fontSize:14}} 
       ><NavLink to={CONSTANTS.Routes.TreepzHistory}>View all</NavLink></span></span>
    </div>
   <table className="table">
<thead>
<tr>
  <th scope="col">S. No.</th>
  <th scope="col">Employee ID</th>
  <th scope="col">Employee Name</th>
  <th scope="col">Email Address</th>
  <th scope="col">Date</th>
  {/* <th scope="col">Check-In</th> */}
  {/* <th scope="col">Check-Out</th> */}
  <th scope="col">Location</th>
</tr>
</thead>
<tbody>
{listOfEmployees.map((a,i)=><tr key={i}>
  <th scope="row">{i+1}</th>
  <td>{a.employeeId}</td>
  <td>{a.name}</td>
  <td>{a.email}</td>
  <td>{moment(a.createdAt).format("Do, MMM YYYY")}</td>
  {/* <td>23, October 2023</td> */}
  {/* <td>23, October 2023</td> */}
  <td>{a.location}</td>
</tr>)}
</tbody>
</table></>
}