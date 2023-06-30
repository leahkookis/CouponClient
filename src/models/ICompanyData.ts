import ICouponsData from "./ICouponsData";
import IPurchaseData from "./IPurchaseData";

export default interface ICompanyData{
    id: number;
    name : String;
    address: String;
    phoneNumber: string;
    coupons?: ICouponsData[];
    purchases?: IPurchaseData[];
    
 
}