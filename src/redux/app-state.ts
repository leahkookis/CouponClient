import ICompanyData from "../models/ICompanyData";
import ICouponsData from "../models/ICouponsData";
import ICustomerData from "../models/ICustomerData";
import IPurchaseData from "../models/IPurchaseData";
import ISuccessfulLoginData from "../models/ISuccessfulLoginData";

export class AppState{
 public customerData!: ICustomerData;
 public coupons: any = [];  
 public users: any = []; 
 public loginData: ISuccessfulLoginData | undefined;  
 public sendSearchText: string = "";
 public buyNow: number = 0;
 public addToCart:number = 0;
 public purchases: any = [];
public sendPurchaseToBuy : number[] = [];
public companiesData: any = [];
public categories: any[]=[];
public token:ISuccessfulLoginData = {id: 0, userType: "", companyId: 0}
public removeIndex = {index: 0, nameOfList:""}
}