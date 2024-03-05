/* eslint-disable @typescript-eslint/no-unused-vars */
import { ChangeEventHandler, RefObject, useEffect, useRef, useState } from "react"
import { BaseButton, WhiteButton } from "../../../components/buttons"
import { ExportIcon, FilterIcon, Searchicon } from "../icon"
import { Menu } from "../sections/HistoryTables/invitations";
import { CloseButton } from "react-toastify/dist/components";
import { CloseIcon } from "../../../assets/icons/CloseIcon";
import Calendar from 'react-calendar';
import { CalendarComponent } from "../../../components/Calender";
import moment from "moment";

interface SearchBarProps {
    onSearch:(v:string)=>void;
    onAddPersonnel:()=>void;
    onImportPersonnel:()=>void;
    onExportPersonnel:()=>void;
    page:"data"|"history";
    showFilter?:boolean;
    processing?:boolean;
    onFilterValue?:(values:{startDate:string;endDate:string;})=>void;
}
export const SearchBar = (props:SearchBarProps)=>{
    const [showCalendar,setShowCalendar] = useState<boolean>(false)
    const [searchString,setSearchString] = useState<string>("");
    const thisPopUp = useRef(null) as RefObject<HTMLSpanElement>
    useEffect(()=>{
        thisPopUp.current?.addEventListener("mouseleave",()=>{
            setShowCalendar(false);
        })
        return ()=>{

        }
    },[showCalendar])
    return  <div className='row pb-3' >
    <div className="d-flex col-5 searchbar-container align-items-center" >
    <span className="searchbar-icon" >
     <Searchicon />
     </span>
     <input className="form-control"
     placeholder="Search with employee ID, name..."
     value={searchString}
     onChange={(d)=>{
        setSearchString(d.target.value)
        props.onSearch(d.target.value);
     }}
     />
    
     {searchString !== ""?<span 
     onClick={()=>{
        setSearchString("")
        props.onSearch(""); 
     }}
     className="close-btn">
        <CloseIcon 
        size={15}
        />
     </span>:null}
    </div>
    {props.showFilter && <div className="col-2 d-flex align-items-center">
    <span
    ref={thisPopUp}
    className=" position-relative">
    <div className="filter-button-white"
    onClick={()=>{
        setShowCalendar(!showCalendar);
    }}
    >
        <span className="me-2">Filter</span>
        <FilterIcon />
    </div>
    {showCalendar && <CalendarComponent 
    onClose={()=>{ 
        setShowCalendar(false);  
    }}
    startDate={moment().subtract(5,"M").format("DD-MM-YYYY")}
    onValue={({startDate,endDate})=>{
        if(props.onFilterValue)
        {
         props.onFilterValue({startDate,endDate})  
        }
        setShowCalendar(false);
      }}
      />} 
    </span>
    </div>}
    <div className={`col-${props.showFilter?"5":"7"}`}>
    <div className="d-flex align-items-center justify-content-end">
    {props.page === "history"?<WhiteButton
    loading={props.processing}
    onClick={props.onExportPersonnel}
    >
<ExportIcon />
<span className="ps-2">Export CSV</span>
    </WhiteButton>:null}
    {props.page === "data"?<div >
    <Menu 
    type="new"
    onValue={(d)=>{
        if(d.action === "add")
        {
            props.onAddPersonnel()
        }
        if(d.action === "import")
        {
            props.onImportPersonnel()
        }
    }}
    >
    <BaseButton
    onClick={()=>{

    }}
    style={{paddingLeft:5,paddingRight:5,width:150}}
    >
    <span className="ps-2">Add new employee</span>
    </BaseButton>
    </Menu>
    </div>:null}
    </div>
    </div>
    </div>
}