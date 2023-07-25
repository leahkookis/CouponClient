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

function PurchaseCard(props: IPurchaseData) {
    let loginData = useSelector((state: AppState) => state.loginData)

    const navigate = useNavigate();
    let dispatch = useDispatch();
    let coupon = props;
    let customer = useSelector((state: AppState) => state.customerData)
    let timeStamp = "2024-02-02T00:00:00.000+00:00";
    
    
    

    





    return (
        <div className="purchase-card">
           
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
           



        </div>


    )
}

export default PurchaseCard;
