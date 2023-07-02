import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ICouponsData from "../../models/ICouponsData";
import { AppState } from "../../redux/app-state";
import './couponCard.css';
import Modal from 'react-modal';
import { useState } from "react";

import axios from "axios";
import IPurchaseData from "../../models/IPurchaseData";

import ICustomerData from "../../models/ICustomerData";
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

function Coupon(props: ICouponsData) {
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
   
    async function addToPurchase(id: number) {
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
    let[price,setPrice]= useState(""+props.price);
    let[description,setDescription]= useState(""+props.description);
    let[endDate,setEndDate]= useState(""+props.endDate);
    



    function saveCoupon(): void {
        throw new Error("Function not implemented.");
    }

    return (
        <div className="coupon-card">
            <button className="enter-coupon" onClick={openCouponModal}>
                <img className="img-coupon" src="https://www.photo-art.co.il/wp-content/uploads/2017/09/IMG_9006.jpg"></img>
                <div className="coupon-name">
                    {props.name}
                </div>
                <div>
                    {props.price} ILS
                </div>
                
            </button>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >

                <button className="button-close" onClick={closeModal}>X</button>
                <div className="coupon-card-modal">
                    <div className="name-and-price">

                        <img className="img-coupon-modal" src="https://www.photo-art.co.il/wp-content/uploads/2017/09/IMG_9006.jpg"></img>
                        
                        {editAble==false&&(<div className="coupon-name-modal">
                         {props.name}
                        </div>)}
                        {editAble==true && (<input type="text" onChange={event => setName(event.target.value)} value={name}></input>)}
                        {editAble==false&&(<div className="fields">
                            Price:{props.price} ILS
                        </div>)}

                        {editAble==false&&(<div className="fields">
                            About:  {props.description}
                        </div>)}
                        <div className="fields">
                            Category:{props.categoryName}
                        </div>
                        {editAble==false&&(<div className="fields">
                            Expiration Date:  {props.endDate}
                        </div>)}
                    </div>
                    {loginData?.userType != "admin"&&( <div className="button-section">
                        <button className="button-modal" onClick={event => addToPurchase(props.id)}>Add to cart</button>
                        <button className="button-modal" onClick={event => buyNow(props.id)}>buy now</button>
                    </div>)}

                    {loginData?.userType == "admin"&&( <div className="button-section">
                        <button className="button-modal" onClick={e=>setEditAble(true)}>Edit</button>
                        <button className="button-modal" onClick={saveCoupon}>Save</button>
                    </div>)}
                </div>
            </Modal>

        </div>
    )
}

export default Coupon;
