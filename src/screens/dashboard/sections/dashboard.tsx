import React, { useState } from 'react'
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
import { ChartDataProps } from '../../../includes/types';
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
  const [showAddPersonnel,setShowAddPersonnel] = useState<boolean>(false)
  const [showImportPersonnel,setShowImportPersonnel] = useState<boolean>(false)
    const tabs = [
        {class:"yellow-card",title:"Total Employees",amount:"2000"},
        {class:"black-card",title:"Total Check-ins",amount:"1000"},
        {class:"gray-card",title:"Total Check-outs",amount:"3000"}
      ];
    const  chartData:ChartDataProps = {
      labels:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug"],
      data:[100,200,300,400,500,600,700,800]
    }
    const [selectedTab,setSelectedTab] = useState<string>(tableFilter[0])
    return <div className='main-scrollable p-5 pt-0' >
    <div className='row' >
    <div className='col-8' >
    <div className="title-text">Welcome back 😊</div>
    <div className="">Let's pick things up from where you left it</div>
    </div>
    <div className='col-4' >
    <div className='bx' >
    <CalendarIcon /> 
    <span  className='tx'>Jan 1, 2022 - Jul 31, 2023</span>
    <span className='caret'>
        <CaretDownIcon />
    </span>
    </div>    
    </div>
    </div>
    <div className='row pt-5 pb-3' >
      <div className='col-8' >
      <div className='card' style={{minHeight:370,position:'relative'}} >
      <div className='row p-3'>
      <div className='col-4' >
        <div className='chart-title'>TREEPZ HISTORY</div>
        <div className='chart-date'>Jan 1, 2022 - Jul 31, 2023</div>
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
      <div style={{height:"100%"}}>
        <Bar
        data={{
          labels:chartData.labels,
          datasets:[
            {
              label:"",
              data:chartData.data,
              backgroundColor:"#F8B02B",
              maxBarThickness:30
            }
          ]
        }}
        color="red"
        />
      </div>
      <div style={{position:'absolute',left:40,top:-18,width:580,height:370}}>
        <Bar
        options= {
          {scales: {
            x: {
              display: false,
           },
           y: {
              display: false,
           }
          }
        }}
        data={{
          labels:chartData.labels,
          datasets:[
            {
              label:"",
              data:chartData.data,
              backgroundColor:"#3B6FE9",
              maxBarThickness:20,
            }
          ]
        }}
        color="red"
        />
      </div>
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
   {tabs.map((a,i)=>
  <div className={`card dx-card mb-3 ${a.class}`} >
    <div className='row ps-3'>
    <div className='col-8 p-3'>
    <div className='t1' >{a.title}</div>
    <div className='t2' >{a.amount}</div>
    <div  className='d-flex'>
    <span className='gt'>
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 12L12 4M12 4H6.66667M12 4V9.33333" stroke="#3CC13B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
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
    <div className="d-flex align-items-center mb-3">
      <span  className='table-title'>Treepz History</span>
      <span className='bx ms-3 d-flex align-items-center justify-content-center'
       style={{width:90,height:30}} 
       ><span 
       style={{fontSize:14}} 
       >View all</span></span>
    </div>
   <table className="table">
<thead>
<tr>
  <th scope="col">S. No.</th>
  <th scope="col">Employee ID</th>
  <th scope="col">Employee Name</th>
  <th scope="col">Email Address</th>
  <th scope="col">Date</th>
  <th scope="col">Check-In</th>
  <th scope="col">Check-Out</th>
  <th scope="col">Location</th>
</tr>
</thead>
<tbody>
{Array.from({length:12}).map((a,i)=><tr key={i}>
  <th scope="row">{i+1}</th>
  <td>234563IJ</td>
  <td>Afolabi Oluseyi</td>
  <td>afolabioluseyi@wakanow.com</td>
  <td>23, October 2023</td>
  <td>23, October 2023</td>
  <td>23, October 2023</td>
  <td>Lagos</td>
</tr>)}
</tbody>
</table>
{showAddPersonnel && <AddPersonnelComponent 
onClose={()=>setShowAddPersonnel(false)}
/>}
{showImportPersonnel && <ImportPersonnelComponent 
onClose={()=>setShowImportPersonnel(false)}
/>}
</div>
}