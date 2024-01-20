import { ChangeEventHandler } from "react"
import { BaseButton, WhiteButton } from "../../../components/buttons"
import { ExportIcon, Searchicon } from "../icon"
import { Menu } from "../sections/HistoryTables/invitations";
interface SearchBarProps {
    onSearch:ChangeEventHandler<HTMLInputElement>;
    onAddPersonnel:()=>void;
    onImportPersonnel:()=>void;
    onExportPersonnel:()=>void;
    page:"data"|"history"
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
    </div>
    <div className="col-7">
    <div className="d-flex align-items-center justify-content-end">
    <WhiteButton
    onClick={props.onExportPersonnel}
    >
<ExportIcon />
<span className="ps-2">Export CSV</span>
    </WhiteButton>
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