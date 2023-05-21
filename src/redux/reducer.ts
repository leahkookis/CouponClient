import { Action } from "./action";
import { ActionType } from "./action-types";
import { AppState } from "./app-state";

export function reduce(oldAppState: AppState = new AppState(), action: Action): AppState {

    const newAppState = { ...oldAppState };

    switch (action.type) {
        case ActionType.GetCoupons:
            newAppState.coupons = action.payload.response;
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

    }

    return newAppState;
}