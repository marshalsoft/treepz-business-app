import { CSSProperties, HTMLAttributes } from 'react';
import './style.css';
import { NavLink } from 'react-router-dom';
interface BaseButtonProps {
children:JSX.Element | any;
loading?:boolean;
onClick:()=>void;
style?:CSSProperties | undefined
}
interface LightYellowButtonProps {
    children:JSX.Element | any;
    to:string;
    style?:CSSProperties | undefined
    }
export const BaseButton = (props:BaseButtonProps)=>{
    return <button 
    onClick={props.onClick}
    className="base-button btn"
    style={props.style}
    >
 {props.loading?<div className="spinner-border spinner-border-sm" role="status">
</div>:props.children}
    </button>
}

export const LightYellowButton = (props:LightYellowButtonProps)=>{
    return <NavLink 
    to={props.to}
    className="light-yellow-button btn"
    >
    {props.children}
    </NavLink>
}