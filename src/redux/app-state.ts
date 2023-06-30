import ICompanyData from "../models/ICompanyData";
import ICouponsData from "../models/ICouponsData";
import ICustomerData from "../models/ICustomerData";
import IPurchaseData from "../models/IPurchaseData";
import ISuccessfulLoginData from "../models/ISuccessfulLoginData";

export class AppState{
 public customerData!: ICustomerData;
 public coupons: any = []; 
 public loginData: ISuccessfulLoginData | undefined;  
 public sendSearchText: string = "";
 public buyNow: number = 0;
 public addToCart:number = 0;
 public purchaseData: IPurchaseData[] = [];
public sendPurchaseToBuy : number[] = [];
public companiesData: ICompanyData[] = [];
}