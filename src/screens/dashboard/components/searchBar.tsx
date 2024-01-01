import { ChangeEventHandler } from "react"
import { BaseButton } from "../../../components/buttons"
import { ExportIcon, FilterIcon, Searchicon } from "../icon"
interface SearchBarProps {
    onSearch:ChangeEventHandler<HTMLInputElement>;
    onAddPersonnel:()=>void;
    onImportPersonnel:()=>void;
    onExportPersonnel:()=>void;
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
    <div className="col-4">
    <BaseButton
    onClick={props.onAddPersonnel}
    style={{paddingLeft:5,paddingRight:5,width:150}}
    >
<ExportIcon />
<span className="ps-2">Add Personnel</span>
    </BaseButton>
    </div>
    <div className="col-4">
    <BaseButton
    onClick={props.onImportPersonnel}
    style={{paddingLeft:5,paddingRight:5,width:160}}
    >
<ExportIcon />
<span className="ps-2">Import Personnel</span>
    </BaseButton>  
    </div>
    <div className="col-4">
    <BaseButton
    onClick={props.onExportPersonnel}
    >
<ExportIcon />
<span className="ps-2">Export CSV</span>
    </BaseButton>
    </div>
    </div>
    </div>
    </div>
}