import { BaseButton } from "../../../components/buttons"
import { ExportIcon, FilterIcon, Searchicon } from "../icon"

export const SearchBar = ()=>{
    return  <div className='row pb-3' >
    <div className="d-flex col-8 searchbar-container" >
     <input className="form-control"
     placeholder="Search with employee ID, name..."
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
    <div className="col-2"></div>
    <div className="col-2">
    <BaseButton
    onClick={()=>{

    }}
    >
<ExportIcon />
<span className="ps-2">Export CSV</span>
    </BaseButton>
    </div>
    </div>
}