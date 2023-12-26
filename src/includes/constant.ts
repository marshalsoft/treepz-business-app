export const CONSTANTS = {
    Routes:{
      Login:"login",
      Otp:"otp",
      ForgotPassword:"forgot_password",
      Dashboard:"dashboard",
      Personnel:"personnel_list",
    }
}

interface ListProps {
icon?:JSX.Element;
title:string;
link:string;
}

export const DashboardNavItems:ListProps[] = [
  {title:"Dashboard",link:"/"+CONSTANTS.Routes.Dashboard},
  {title:"Personnel list",link:"/"+CONSTANTS.Routes.Dashboard+"/"+CONSTANTS.Routes.Personnel}
] 