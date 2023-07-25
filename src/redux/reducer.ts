import Users from "../components/Layout/Menu/Users/Users";
import ICompanyData from "../models/ICompanyData";
import ICouponsData from "../models/ICouponsData";
import IPurchaseData from "../models/IPurchaseData";
import IUserData from "../models/IUserData";
import { Action } from "./action";
import { ActionType } from "./action-types";
import { AppState } from "./app-state";

export function reduce(oldAppState: AppState = new AppState(), action: Action): AppState {

    const newAppState = { ...oldAppState };

    switch (action.type) {
        case ActionType.GetCoupons:
            newAppState.coupons = action.payload.response;
            break;
        case ActionType.GetCompanies:
            newAppState.companiesData = action.payload.response;
            break;
        case ActionType.LoginData:
            newAppState.token = action.payload.loginData;
            break;
        case ActionType.SendSearchText:
            newAppState.sendSearchText = action.payload.subText;
            break;
        case ActionType.CustomerData:
            newAppState.customerData = action.payload.customerData;
            break;
        case ActionType.AddToCartCount:
            newAppState.addToCart = action.payload.countOfCartProduct;
            break;
        case ActionType.BuyNow:
            newAppState.buyNow = action.payload.countOfBuyProduct;
            break;
        case ActionType.GetPurchase:
            newAppState.purchases = action.payload.response;
            break;
        case ActionType.SendPurchaseToBuy:
            newAppState.sendPurchaseToBuy.push(action.payload.purchaseId);
            break;
            case ActionType.AddCompanies:
            newAppState.companiesData.push(action.payload.newCompany);
            break;
        case ActionType.GetUsers:
            newAppState.users = action.payload.response;
            break;

        case ActionType.GetCategories:
            newAppState.categories = action.payload.response;
            break;
            case ActionType.SaveDecryptedToken:
                newAppState.token = action.payload.decryptedToken;
                break;
            case ActionType.RemoveDecryptedToken:
                newAppState.token = undefined;
                break;
        case
            ActionType.RemoveIndex:
            
            if (action.payload.nameOfList == "users") {
                const idToRemove = action.payload.id;
                const updatedList = oldAppState.users.filter((element: IUserData) => element.id !== idToRemove);
                newAppState.users = updatedList;
            }
            if (action.payload.nameOfList == "company") {
                const idToRemove = action.payload.id;
                const updatedList = oldAppState.companiesData.filter((element: ICompanyData) => element.id !== idToRemove);
                newAppState.companiesData = updatedList;
            }
            if (action.payload.nameOfList == "purchases") {
                const idToRemove = action.payload.id;
                const updatedList = oldAppState.purchases.filter((element: IPurchaseData) => element.id !== idToRemove);
                newAppState.purchases = updatedList;
            }
            if (action.payload.nameOfList == "coupons") {
                const idToRemove = action.payload.id;
                const updatedList = oldAppState.coupons.filter((element: ICouponsData) => element.id !== idToRemove);
                newAppState.coupons = updatedList;
            }
            break;







    }

    return newAppState;
}


