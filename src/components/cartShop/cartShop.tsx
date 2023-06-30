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
    const cartProductsArray: IPurchaseData[] = useSelector((state: AppState) => state.purchaseData)
    let dispatch = useDispatch();
    useEffect(() => {
        getPurchaseByCustomer()
    }, []);

    async function getPurchaseByCustomer() {
        try {

            
            let customerPurchase = await axios.get(`http://localhost:8080/purchase/bycustomer`, { params: { customerid: customer.id } });
            let purchaseData: IPurchaseData[] = customerPurchase.data;
            dispatch({ type: ActionType.GetPurchase, payload: { purchaseData: purchaseData } })
        } catch (error) {
            alert("something...");

        }

    }

    async function updateCouponsToBuy(purchaseIds: number[]) {

        try {
            const response = await axios.post(`http://localhost:8080/purchase/buycoupons`, {purchaseIds: { purchaseIds }})
                
           
        }
        catch (e: any) {
            console.error(e);
            if (e.response?.data?.error?.message) {
                alert(e.response.data.error.message)
            } else {
                alert("failed to buy")
            }
        }
    }

    function buySelectedCoupons() {
        
        if (getSelectedCouponsIds.length == 0) {
            alert("Please select coupons!")
            return;
        }
        updateCouponsToBuy(getSelectedCouponsIds);
    }
    return (
        <div >
            <div className="purchase-container">
                {cartProductsArray.filter((coupon) => coupon.buy == false).map((coupon, index) => <PurchaseCard key={index} id={coupon.id} name={coupon.name} couponPrice={coupon.couponPrice} couponName={coupon.couponName} categoryName={coupon.categoryName} companyName={coupon.companyName} buy={coupon.buy} timeStamp={coupon.timeStamp} />)}
            </div>
            <button className="button-modal" onClick={buySelectedCoupons}>Buy Coupons</button>
        </div>

    );

}
export default CartShop;