import ICouponsData from "./ICouponsData";
import IPurchaseData from "./IPurchaseData";

export default interface ICompanyData{
    id: number;
    name : string;
    address: string;
    phoneNumber: string;
    coupons?: ICouponsData[];
    purchases?: IPurchaseData[];
    
 
}