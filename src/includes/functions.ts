
import { toast} from 'react-toastify';
import { CONSTANTS } from './constant';
import axios,{AxiosRequestConfig, AxiosResponse} from 'axios';
export interface APIResponse {
    success:boolean;
    data?:any;
    message:string;
    statusCode?:string;
}
export const PostRequest = (uri:string,data:any,success?:boolean,fileType:"json"|"upload" = "json")=>{
    return new Promise<APIResponse>((resolve)=>{
    const formdata = new FormData();
    Object.keys(data).forEach((ob,i)=>{
     formdata.append(ob,data[ob])
   })
   var getMethod = "post";
    if(String(uri).includes(":"))
    {
      getMethod = String(uri).split(":")[0];
      uri = String(uri).split(":")[1];
    }
   const token = localStorage.getItem("token");
    const RequestHeaders:any = {
    "Content-Type":fileType === "json"?"application/json":"multipart/form-data",
    "Accept":"application/json",
    "Access-Control-Allow-Origin":"*",
    "Authorization":`Bearer ${token}`
    }
    const options:AxiosRequestConfig = {
      headers:RequestHeaders,
      method:String(getMethod).toLowerCase(),
      data:fileType === "json"?data:formdata,
      url:`${CONSTANTS.BaseURL}${uri}`,
  }
  console.log("RequestHeaders:",
  RequestHeaders)
  axios(options).then((res:AxiosResponse)=>{
  if(res.data.success)
    {
    if(success)
    {
    toast.success(res.data.message, {
        position: toast.POSITION.TOP_RIGHT
      });
    }
    try {
        if(res.data.data.token)
        {
          localStorage.setItem("token",res.data.data.token);
        }  
        if(res.data.data.verifytoken)
        {
          localStorage.setItem("token",res.data.data.verifytoken);
        } 

    } catch (error) {
        
    }
    resolve(res.data)
    }else{
    toast.error(res.data.message, {
      position: toast.POSITION.TOP_RIGHT
     });  
     if(res.data.message.includes("malformed"))
     {
      localStorage.clear()
      window.location.href = "./";
     }
     resolve(res.data)
    }
    }).catch((error)=>{
      // if (error.response) {
      //   console.log("error.response.data:",error.response.data);
      //   console.log("error.response.status:",error.response.status);
      //   console.log("error.response.headers",error.response.headers);
      // }
      console.log("error.response.data:",error.response.data.message);  
  if(success )
  {
    toast.error(error.response.data.message, {
        position: toast.POSITION.TOP_RIGHT
       });
  }
    resolve({
        success:false,
        message:error.response.data.message,
        data:{}
    }) 
  })
})
}
export const GetRequest = (uri:string,data:any,success?:boolean)=>{
    return new Promise<APIResponse>((resolve)=>{
    var params:string[] = [];
    Object.keys(data).forEach((ob,i)=>{
        params.push(`${ob}=${data[ob]}`);
   })
   const token = localStorage.getItem("token");
    const RequestHeaders = {
     "Access-Control-Allow-Origin":"*",
     "Authorization":`Bearer ${token}`
    }
    var options:AxiosRequestConfig = {
        headers:RequestHeaders
    }
  console.log(options)
axios.get(`${CONSTANTS.BaseURL}${uri}${"?"+params.join("&")}`,options).then((res:AxiosResponse)=>{
    if(res.data.success)
    {
    if(success)
    {
    toast.success(res.data.message, {
        position: toast.POSITION.TOP_RIGHT
      });
    }
    try {
        if(res.data.data.token)
        {
          localStorage.setItem("token",res.data.data.token);
        }  
        if(res.data.data.verifytoken)
        {
          localStorage.setItem("token",res.data.data.verifytoken);
        } 

    } catch (error) {
        
    }
    resolve(res.data)
    }else{
    toast.error(res.data.message, {
      position: toast.POSITION.TOP_RIGHT
     });  
     if(res.data.message.includes("jwt"))
     {
      localStorage.clear()
      window.location.href = "./";
     }
     resolve(res.data)
    }
}).catch((error)=>{
    console.log("error.response.data:",error);  
if(success )
{
  toast.error(error?.response?.data?error.response.data.message:error.message, {
      position: toast.POSITION.TOP_RIGHT
     });
}
  resolve({
      success:false,
      message:error?.response?.data?error.response.data.message:error.message,
      data:{}
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
  