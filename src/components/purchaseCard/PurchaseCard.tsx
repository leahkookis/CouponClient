import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import './PurchaseCard.css';
import Modal from 'react-modal';
import { useState } from "react";

import axios from "axios";
import IPurchaseData from "../../models/IPurchaseData";
import EditCoupon from "../coupons/editCoupon/editCoupon";
import { AppState } from "../../redux/app-state";
import { ActionType } from "../../redux/action-types";




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

function Coupon(props: IPurchaseData) {
    let loginData = useSelector((state: AppState) => state.loginData)
  
    const navigate = useNavigate();
    let dispatch = useDispatch();
    let coupon = props;
    let customer = useSelector((state: AppState) => state.customerData)
    let timeStamp = "2024-02-02T00:00:00.000+00:00";
    let countOfCartProduct = useSelector((state: AppState) => state.addToCart)+1;
    let countOfBuyProduct = useSelector((state: AppState) => state.buyNow)+1;
    async function buyNow(id: number) {
        if (loginData == null) {
            navigate("/login")
            return;
        }
        try {
            const response = await axios.post("http://localhost:8080/purchase", { timeStamp, customer, coupon,isBuy: true });
            dispatch({ type: ActionType.BuyNow, payload: {countOfBuyProduct} });
            closeModal();
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

    async function addToCart(id: number) {
        if (loginData == null) {
            navigate("/login")
            return;
        }
        try {

            const response = await axios.post("http://localhost:8080/purchase", { timeStamp, customer, coupon,isBuy: false });
            dispatch({ type: ActionType.AddToCartCount, payload: {countOfCartProduct} });
            closeModal();
        }
        catch (e: any) {
            console.error(e);
            if (e.response?.data?.error?.message) {
                alert(e.response.data.error.message)
            } else {
                alert("failed to add to cart")
            }
        }
    }


    const [modalIsOpen, setIsOpen] = useState(false);
    const [text, setText] = useState("");
    console.log("Rendered");
    console.log("Text = " + text);


    function openCouponModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        setText("Hello!");
    }

    function closeModal() {
        setIsOpen(false);
    }



    return (
        <div className="coupon-card">

                <img className="img-coupon" src="https://www.photo-art.co.il/wp-content/uploads/2017/09/IMG_9006.jpg"></img>
                <div className="coupon-name">
                    {props.companyName}
                </div>
                <div>
                    {props.price} ILS
                </div>
                <div >
                    {props.categoryName}
                </div>
                <button className="button-modal" onClick={event => buyNow(props.id)}>buy now</button>

               
            
            
                
                    </div>
        

    )
}

export default Coupon;
