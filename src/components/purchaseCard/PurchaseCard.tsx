import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import './PurchaseCard.css';
import Modal from 'react-modal';
import { useState } from "react";

import axios from "axios";
import IPurchaseData from "../../models/IPurchaseData";

import { AppState } from "../../redux/app-state";
import { ActionType } from "../../redux/action-types";
import { choices } from "yargs";




const customStyles = {
    content: {
        top: '60%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',


    },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

function Purchase(props: IPurchaseData) {
    let loginData = useSelector((state: AppState) => state.loginData)

    const navigate = useNavigate();
    let dispatch = useDispatch();
    let coupon = props;
    let customer = useSelector((state: AppState) => state.customerData)
    let timeStamp = "2024-02-02T00:00:00.000+00:00";
    let countOfCartProduct = useSelector((state: AppState) => state.addToCart) + 1;
    let countOfBuyProduct = useSelector((state: AppState) => state.buyNow) + 1;
    
    async function buyNow(id: number) {
        if (loginData == null) {
            navigate("/login")
            return;
        }
        try {
            const response = await axios.post("http://localhost:8080/purchase", { timeStamp, customer, coupon, isBuy: true });
            dispatch({ type: ActionType.BuyNow, payload: { countOfBuyProduct } });

        }
        catch (e: any) {
            console.error(e);
            if (e.response?.data?.error?.message) {
                alert(e.response.data.error.message)
            } else {
                alert("failed to buy now")
            }
        }
    }

    function addToBuy() {
        debugger;
        let purchaseId = props.id;
        
        
        dispatch({ type: ActionType.SendPurchaseToBuy, payload: { purchaseId } });
    }






    return (
        <div className="purchase-card">
            <input className="checkbox" type="checkbox" onClick={addToBuy}></input>
            <img className="img-purchase" src="https://www.photo-art.co.il/wp-content/uploads/2017/09/IMG_9006.jpg"></img>
            <div className="details-pur">
                <div className="purchase-name">
                    {props.companyName}
                </div>
                <div>
                    {props.couponPrice} ILS
                </div>
                <div >
                    {props.categoryName}
                </div>
            </div>
            <div className="button-purchase">
                <button className="button-modal" onClick={event => buyNow(props.id)}>buy now</button>
                <button className="button-modal" onClick={event => buyNow(props.id)}>Remove</button>

            </div>



        </div>


    )
}

export default Purchase;
