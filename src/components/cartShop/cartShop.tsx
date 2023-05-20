import { useDispatch, useSelector } from "react-redux";
import IPurchaseData from "../../models/IPurchaseData";
import { AppState } from "../../redux/app-state";
import { useEffect, useState } from "react";
import axios from "axios";
import Coupon from "../coupons/couponCard/CouponCard";
import PurchaseCard from "../purchaseCard/PurchaseCard";
import { ActionType } from "../../redux/action-types";

function CartShop(){
    const customer= useSelector((state: AppState)=> state.customerData)
    const cartProductsArray: IPurchaseData[]= useSelector((state: AppState)=> state.purchaseData)
    let dispatch = useDispatch();
    useEffect(()=> {getPurchaseByCustomer()
   }, []);
  
    async function getPurchaseByCustomer() {
       try {

          
           let customerPurchase= await axios.get(`http://localhost:8080/purchase/bycustomer`, {params: {customerid: customer.id } });
           let purchaseData: IPurchaseData[] = customerPurchase.data;
           dispatch({ type: ActionType.GetPurchase, payload: { purchaseData: purchaseData }})
       } catch (error) {
           alert("something...");
           
       }
       
    }
   return(
       <div className="Coupons-container">
           {cartProductsArray.map((coupon, index) => <PurchaseCard key={index} id={coupon.id} userName ={coupon.userName} price={coupon.price} couponName={coupon.couponName}  categoryName={coupon.categoryName} companyName={coupon.companyName} buy={coupon.buy}/>)}
       </div>
   );

}
export default CartShop;