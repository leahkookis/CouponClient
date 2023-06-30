import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ICouponsData from "../../../models/ICouponsData";
import { ActionType } from "../../../redux/action-types";
import { AppState } from "../../../redux/app-state";
import Coupon from "../../coupons/CouponCard";

import './adminView.css';

function AdminView(){
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
            
        </div>
    );

}
export default AdminView;