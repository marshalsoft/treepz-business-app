
import { toast} from 'react-toastify';

export interface APIResponse {
    status:boolean;
    result:any;
    data?:any;
    message:string;
    code?:string;
}
export const PostRequest = (uri:string,data:any,success?:boolean)=>{
    return new Promise<APIResponse>((resolve)=>{
    const formdata = new FormData();
    Object.keys(data).forEach((ob,i)=>{
    formdata.append(ob,data[ob]);
   })
    const RequestHeaders = new Headers();
   const token = localStorage.getItem("token");
    if(token)
    {
     RequestHeaders.append("token",token)
    }
    const options:RequestInit = {
        headers:RequestHeaders,
        method:"post",
        body:formdata
    }
fetch(`${process.env.BaseURL}${uri}`,options).then((res)=>res.json()).then((res:APIResponse)=>{
    if(res.status && success)
    {
    toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT
      });
    }else{
    toast.error(res.message, {
      position: toast.POSITION.TOP_RIGHT
     });  
    }
    resolve(res)
}).catch((e)=>{
    toast.error(e.message, {
        position: toast.POSITION.TOP_RIGHT
       });
    resolve({
        status:false,
        message:e.message,
        result:{}
    }) 
})
})
}
export const ValidateEmail = (value:string)=>{
    const valid = value.match(
        /^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    return valid;
  }
  