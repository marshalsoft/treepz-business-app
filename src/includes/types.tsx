export interface ChartDataProps {
data:number[];
labels:string[];
}

export interface EmployeeProps {
    employeeId:string;
    email:string;
    username:string;
    token?:string;
    used?:boolean;
    isCancelled:boolean;
    createdBy?:string;
    updatedBy?:string;
    _id:string;
    createdAt:string;
    expiry?:string;
    __v:number;
    name:string;
    location?:string;
    image?:string;
    isActive: true;
    updatedAt?:string;
    checkIn?:string;
    checkOut?:string;
    PickUpLocation?:string;
    VehicleLocation?:string;
    VehicleTag?:string;
}

export interface UserProps {
    firstname?:string;
    lastname?:string;
    companyName?:string;
    email?:string;
    type?:string;
    id?:string;
    ait?:string;
    exp?:string;
    companyId?:string;
}