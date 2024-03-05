import React, { useEffect, useState } from 'react';
import moment from 'moment';

import Calendar from 'react-calendar';
import { BaseButton, WhiteButton } from '../buttons';
import { CaretDownIcon } from '../../screens/dashboard/icon';
interface CalendarComponentProps {
    onValue:(value:{startDate:string;endDate:string;})=>void;
    loading?:boolean;
    startDate?:string;
    endDate?:string;
    title?:string;
    onClose:()=>void;
}
export const CalendarComponent = (props:CalendarComponentProps)=>{
    const [startDate,setStartDate] = useState<string>("")
    const [endDate,setEndDate] = useState<string>("")
    const [focused,setFocused] = useState<boolean>(true);
    useEffect(()=>{
      // alert(props.startDate)
    },[])
    return  <div className='calendar-card' >
      <div className='row' >
      <div className='col-12 pb-2'  style={{fontWeight:500}}>{props.title?props.title:"Filter by time range"}</div>
    <div  className='col-12'>
  <div className='d-flex justify-content-start align-items-center mb-3'>
  <div className='p-2 fw-normal' style={{width:50}}>
    From
  </div>
 <div className='card mx-1 btn'
  style={{backgroundColor:focused?"#ffe0b2":"white"}}
  onClick={()=>{
    setFocused(true)
    // setStartDate(startDate === ""?moment().toISOString():moment(props.startDate).toISOString())
  }}
  >
{startDate === ""?moment(props.startDate).format("DD"):moment(startDate).format("DD")}<CaretDownIcon />
</div>
<div className='card mx-1 btn'
  style={{backgroundColor:focused?"#ffe0b2":"white"}}
  onClick={()=>{
    setFocused(true)
    // setStartDate(startDate === ""?moment(props.startDate).format("YYYY"):moment(props.startDate).toISOString())
  }}
  >
{startDate === ""?moment(props.startDate).format("MMMM"):moment(startDate).format("MMMM")}<CaretDownIcon />
</div>
<div className='card mx-1 btn'
  style={{backgroundColor:focused?"#ffe0b2":"white"}}
  onClick={()=>{
    setFocused(true)
    // setStartDate(startDate === ""?moment(props.startDate).format("YYYY"):moment(props.startDate).toISOString())
  }}
  >
{startDate === ""?moment(props.startDate).format("YYYY"):moment(startDate).format("YYYY")}<CaretDownIcon />
</div>
</div>
</div>
<div  className='col-12'>
  <div className='d-flex justify-content-start align-items-center mb-3'>
<div className='p-2 fw-normal'  style={{width:50}}>
    To
  </div>
<div className='card mx-1 btn' 
style={{backgroundColor:!focused?"#ffe0b2":"white"}}
onClick={()=>{
    setFocused(false)
  //  setEndDate(endDate === ""?moment().toISOString():moment(endDate).toISOString())
  }}
>
{endDate === ""?moment().format("DD"):moment(endDate).format("DD")}<CaretDownIcon />
</div>
<div className='card mx-1 btn' 
style={{backgroundColor:!focused?"#ffe0b2":"white"}}
onClick={()=>{
    setFocused(false)
  //  setEndDate(endDate === ""?moment().toISOString():moment(endDate).toISOString())
  }}
>
{endDate === ""?moment().format("MMMM"):moment(endDate).format("MMMM")}<CaretDownIcon />
</div>
<div className='card mx-1 btn ' 
style={{backgroundColor:!focused?"#ffe0b2":"white"}}
onClick={()=>{
    setFocused(false)
  //  setEndDate(endDate === ""?moment().toISOString():moment(endDate).toISOString())
  }}
>
{endDate === ""?moment().format("YYYY"):moment(endDate).format("YYYY")}
<CaretDownIcon />
</div>
</div>
</div>
<div  className='col-12'>
  <div style={{height:280}}>
  <Calendar
    minDate={focused?new Date(String(props.startDate)):new Date(String(startDate))}
    maxDate={focused?new Date(moment().subtract(1,"day").toISOString()):new Date()}
    onChange={(d) => {
        if(focused)
        {
            setStartDate(moment(String(d)).toISOString())
        }else{
            setEndDate(moment(String(d)).toISOString())
        }
     
    }} 
  />
  </div>
  <div className='mt-3 d-flex justify-content-end align-items-center'>
    <WhiteButton 
    style={{minWidth:35,borderWidth:0}}
    onClick={()=>{
        props.onClose()
    }}
    >Cancel</WhiteButton>
    {startDate !== "" && endDate !== "" ?<BaseButton 
    loading={props.loading}
    style={{minWidth:35}}
    right={true}
    onClick={()=>{
        props.onValue({startDate:startDate,endDate:endDate})
    }}
    >Confirm</BaseButton>:null}
  </div>
  </div>
  </div>
  </div>
  
}