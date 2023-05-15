import ICouponsData from "../models/ICouponsData";
import ISuccessfulLoginData from "../models/ISuccessfulLoginData";

export class AppState{
 public coupons: any = []; 
 public loginData: ISuccessfulLoginData | undefined;  
 public sendSearchText: string = "";
}