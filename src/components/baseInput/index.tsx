import React, { ChangeEventHandler, useState } from 'react'
import './style.css';
import { EyeClose, EyeOpen } from '../../assets/icons/eye';
interface BaseInputProps {
    id?:string;
    label?:string;
    disabled?:boolean;
    placeholder?:string;
    name:string;
    required?:boolean;
    value:any;
    type:"text"|"email"|"number"|"mobile"|"password";
    min?:number;
    max?:number;
    pattern?:string;
    onValueChange:ChangeEventHandler<HTMLInputElement>;
    options?:{value:string;name:string;}[];
}
export default function BaseInput(props:BaseInputProps) {
 const [toggleEye,setToggleEye] = useState(false)
 return (<>
 <div className="mb-3 input-wrapper">
  {props?.label && <label htmlFor={props.name} className="form-label">Email address</label>}
  <input 
  type={props.type === "password"?toggleEye?"text":"password":props.type}
   className="form-control" 
   required={props.required}
   id={props.id} 
   name={props.name} 
  placeholder={props.placeholder}
  onChange={props.onValueChange}
   />
   {props.type === "password" && <span
   onClick={()=>setToggleEye(!toggleEye)} className='input-icon'>
    {!toggleEye?<EyeOpen />:<EyeClose />}
   </span>}
</div>

</>
  )
}

