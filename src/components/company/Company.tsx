import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ICouponsData from "../../models/ICouponsData";
import { AppState } from "../../redux/app-state";
import './Company.css';
import Modal from 'react-modal';
import { useState } from "react";

import axios from "axios";
import IPurchaseData from "../../models/IPurchaseData";

import ICustomerData from "../../models/ICustomerData";
import { ActionType } from "../../redux/action-types";
import ICompanyData from "../../models/ICompanyData";



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

function Company(props: ICompanyData) {
    let loginData = useSelector((state: AppState) => state.loginData)
    function editCoupon() {
        setEditAble(true);
    }
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

    //edit coupon
    let[editAble,setEditAble]= useState(false);

    let[name,setName]= useState(""+props.name);
    let[address,setaddress]= useState(""+props.address);
    let[phoneNumber,setPhoneNumber]= useState(""+props.phoneNumber);
   
    



    function saveCoupon(): void {
        throw new Error("Function not implemented.");
    }

    return (
        <div className="company-card">
            
                
                <div className="company-name">
                    {props.name}
                </div>
                <div className="company-name">
                    {props.phoneNumber}
                </div>
                <div className="company-name">
                    {props.address}
                </div>
                
                <button className="button-modal" onClick={event => setEditAble(true)}>Edit</button>
                <button className="button-modal" onClick={event => addToCart(props.id)}>Coupons</button>
                <button className="button-modal" onClick={event => addToCart(props.id)}>Purchases</button>
                
           
           

        </div>
    )
}

export default Company;
