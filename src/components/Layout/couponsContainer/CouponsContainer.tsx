import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ICouponsData from "../../../models/ICouponsData";
import { ActionType } from "../../../redux/action-types";
import { AppState } from "../../../redux/app-state";
import Coupon from "../../coupons/couponCard/CouponCard";

import './CouponsContainer.css';

function CouponsContainer(){
     const couponArray: ICouponsData[]= useSelector((state: AppState)=> state.coupons)
     let[pageNumber, setPageNumber]  = useState(1);
     let amountOfPage: number = 5;
     let dispatch = useDispatch();
     useEffect(()=> {
        getAllCoupons(pageNumber,amountOfPage)
    }, [pageNumber]);
    let subText = useSelector((state:AppState)=>state.sendSearchText);
    let normalizeSubText = subText.toLowerCase().trim();


     async function getAllCoupons(pageNumber: number, amountOfPage: number) {
        try {
           
            let url= await axios.get(`http://localhost:8080/coupons?page=${pageNumber}`);
            let response = url.data;
            dispatch({type: ActionType.GetCoupons, payload: {response}})

        } catch (error) {
            alert("something...");
            
        }
        
     }
    return(
        <div className="Coupons-container">
            {couponArray.filter((coupon)=>{
                    if(normalizeSubText===""){return true}
                    return coupon.name.toLowerCase().trim().includes(normalizeSubText)||coupon.description.toLowerCase().trim().includes(normalizeSubText)||coupon.categoryName.toLowerCase().trim().includes(normalizeSubText);
                })
            .map((coupon, index) => <Coupon key={index} id={coupon.id} name={coupon.name} price={coupon.price} description={coupon.description} startDate={coupon.startDate} endDate={coupon.endDate} categoryName={coupon.categoryName} companyName={coupon.companyName} amount={coupon.amount}/>)}
        </div>
    );

}
export default CouponsContainer;