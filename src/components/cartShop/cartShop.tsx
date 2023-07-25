import { useDispatch, useSelector } from "react-redux";
import IPurchaseData from "../../models/IPurchaseData";
import { AppState } from "../../redux/app-state";
import { useEffect, useState } from "react";
import axios from "axios";
import Coupon from "../coupons/CouponCard";
import PurchaseCard from "../purchaseCard/PurchaseCard";
import { ActionType } from "../../redux/action-types";
import './cartShop.css';
import ICouponsData from "../../models/ICouponsData";

function CartShop() {
    const customer = useSelector((state: AppState) => state.customerData)
    const getSelectedCouponsIds = useSelector((state: AppState) => state.sendPurchaseToBuy)
    const cartProductsArray: IPurchaseData[] = useSelector((state: AppState) => state.purchases)
    let dispatch = useDispatch();
    useEffect(() => {
        getPurchaseByCustomer()
    }, [1]);

    
    async function getPurchaseByCustomer() {
        try {
            let url = `http://localhost:8080/purchase/bycustomer?customerid=${customer.id}`;
            let customerPurchase = await axios.get(url);
            let purchaseData = customerPurchase.data;
            dispatch({ type: ActionType.GetPurchase, payload: { purchaseData: purchaseData } })
        } catch (error) {
            alert("something...");

        }

    }

    

    
    return (
        <div >
            <div className="purchase-container">
                {cartProductsArray.map((coupon, index) => <PurchaseCard key={index} id={coupon.id} name={coupon.name} couponPrice={coupon.couponPrice} couponName={coupon.couponName} categoryName={coupon.categoryName} companyName={coupon.companyName} amount={coupon.amount} timeStamp={coupon.timeStamp} />)}
            </div>
            
        </div>

    );

}
export default CartShop;