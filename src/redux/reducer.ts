import Users from "../components/Layout/Menu/Users/Users";
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
            newAppState.loginData = action.payload.loginData;
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
            newAppState.purchaseData = action.payload.purchaseData;
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
        case ActionType.RemoveDecryptedToken:
            newAppState.token = { id: 0, userType: "", companyId: 0 };
            break;
        case ActionType.SaveDecryptedToken:
            newAppState.token = action.payload.decodedToken;
            break;
        case
            ActionType.RemoveIndex:
            debugger
            if(action.payload.nameOfList==("users")) {
            const idToRemove = action.payload.id;
            const updatedUsers = oldAppState.users.filter((element: IUserData) => element.id !== idToRemove);
            newAppState.users = updatedUsers;}
            
            break;
        





    }

    return newAppState;
}


