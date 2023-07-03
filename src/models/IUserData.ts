export default interface IUserData{
    id: number;
    userName:string;
    password:string;
    userType: string;
    companyName?:string;
    companyId?:number;
  }