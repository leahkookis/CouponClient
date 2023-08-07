import { useDispatch, useSelector } from "react-redux";
import IPurchaseData from "../../models/IPurchaseData";
import { AppState } from "../../redux/app-state";
import { useEffect, useState } from "react";
import axios from "axios";
import PurchaseCard from "../purchaseCard/PurchaseCard";
import { ActionType } from "../../redux/action-types";
import './cartShop.css';
import ICouponsData from "../../models/ICouponsData";
import ICustomerData from "../../models/ICustomerData";

function CartShop() {
    const customer: ICustomerData = useSelector((state: AppState) => state.customerData)

    
    let dispatch = useDispatch();
    useEffect(() => {
        if (customer && customer.id) {
            getPurchaseByCustomer(customer.id);
        }
    }, [customer]);
    
    async function getPurchaseByCustomer(customerId:number) {
        try {
           debugger
            let url  = `http://localhost:8080/purchase/bycustomer?customerid=${customerId}`;
            let response1 = await axios.get(url);
            let response = response1.data;
            dispatch({ type: ActionType.GetPurchase, payload:{ response } })
        } catch (error) {
            alert("something went wrong");

        }

    }
    const cartProductsArray: IPurchaseData[] = useSelector((state: AppState) => state.purchases)

    

    
    return (
        <div >
            <br></br>
            <h2><strong>Your Coupons </strong><i className="fas fa-gift"></i></h2>
            {(cartProductsArray==null)&&<h3>You haven't bought any coupons yet</h3> };
            {(cartProductsArray!=null)&&
            <div className="purchase-container">
            
                {cartProductsArray.map((coupon, index) => <PurchaseCard key={index} id={coupon.id} name={coupon.name} couponPrice={coupon.couponPrice} couponName={coupon.couponName} categoryName={coupon.categoryName} companyName={coupon.companyName} amount={coupon.amount} timeStamp={coupon.timeStamp}  />)}
             </div>}
            
        </div>

    );

}
export default CartShop;