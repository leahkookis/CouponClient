import { useDispatch, useSelector } from "react-redux";
import IPurchaseData from "../../models/IPurchaseData";
import { AppState } from "../../redux/app-state";
import { useEffect, useState } from "react";
import axios from "axios";
import Coupon from "../coupons/CouponCard";
import PurchaseCard from "../purchaseCard/PurchaseCard";
import { ActionType } from "../../redux/action-types";

import ICouponsData from "../../models/ICouponsData";
import { Link } from "react-router-dom";

function SuccessBuyCoupon(props: ICouponsData) {
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
            <div className="title-buy">Hey</div>
            <div className="message-buy">Your coupon has been successfully purchased.</div>
            <div className="details-buy">
                Coupon details:</div>
            <div className="coupon-name-buy">{props.name}</div>
            <div className="fields">
                <strong>Price:</strong>{props.price} ILS
            </div><div className="fields">
                <strong>About:</strong>  {props.description}
            </div>
            <Link to="cart" className="link go-to-purchases">View your purchases</Link>
            <Link to="/" className="link go-to-purchases">Continue shopping</Link>




        </div>

    );

}
export default SuccessBuyCoupon;