import { ChangeEventHandler } from "react"
import { BaseButton } from "../../../components/buttons"
import { AddEmployeeIcon, ExportIcon, FilterIcon, Searchicon } from "../icon"
interface SearchBarProps {
    onSearch:ChangeEventHandler<HTMLInputElement>;
    onAddPersonnel:()=>void;
    onImportPersonnel:()=>void;
    onExportPersonnel:()=>void;
    page:"dashboard"|"personnel"
}
export const SearchBar = (props:SearchBarProps)=>{
    return  <div className='row pb-3' >
    <div className="d-flex col-5 searchbar-container" >
     <input className="form-control"
     placeholder="Search with employee ID, name..."
     onChange={props.onSearch}
     />
     <span className="searchbar-icon" >
     <Searchicon />
     </span>
     <span 
     className="bx ms-3 btn"
     >
    <FilterIcon />
    <span className="ms-1">Filter</span>
     </span>
    </div>
    <div className="col-7">
    <div className="row">
    {props.page == "dashboard"?<div className="col-4">
    
    </div>:null}
    {props.page == "dashboard"?<div className="col-4">
   
    </div>:null}  
    <div className="col-4">
    <BaseButton
    onClick={props.onExportPersonnel}
    style={{backgroundColor:props.page == "personnel"?"white":"",borderColor:props.page == "personnel"?"#999":""}}
    >
<ExportIcon />
<span className="ps-2">Export CSV</span>
    </BaseButton>
    </div>
    {props.page == "personnel"?<div className="col-4">
        <BaseButton
    onClick={props.onImportPersonnel}
    style={{paddingLeft:5,paddingRight:5,width:160}}
    >
<ExportIcon />
<span className="ps-2">Import Personnel</span>
    </BaseButton>
    </div>:null}
    {props.page == "personnel"?<div className="col-4">
    <BaseButton
    onClick={props.onAddPersonnel}
    style={{paddingLeft:5,paddingRight:5,width:150}}
    >
    <AddEmployeeIcon />
    <span className="ps-2">Add employee</span>
    </BaseButton>
    </div>:null}
    </div>
    </div>
    </div>
}