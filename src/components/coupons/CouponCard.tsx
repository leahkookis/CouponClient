import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ICouponsData from "../../models/ICouponsData";
import { AppState } from "../../redux/app-state";
import './couponCard.css';
import Modal from 'react-modal';
import { useEffect, useState } from "react";
import cart from "../images/cart.png"
import details from "../images/menu.png"

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
    let categoriesData = useSelector((state: AppState) => state.categories)
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
            const response = await axios.post("http://localhost:8080/purchase", { timeStamp, customer, coupon, amount });
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
    let [editAble, setEditAble] = useState(false);
    let id = props.id;
    let [name, setName] = useState("" + props.name);
    let [price, setPrice] = useState("" + props.price);
    let [description, setDescription] = useState("" + props.description);
    let [category, setCategory] = useState(props.categotyId);
    let [endDate, setEndDate] = useState("" + props.endDate);
    let company = props.companyId;
    let startDate = endDate;
    let [url, setUrl] = useState("" + props.url);



    let [amount, setAmount] = useState(0);

    function incrementCount() {
        amount = amount + 1;
        setAmount(amount);
    }
    function decrementCount() {
        amount = amount - 1;
        setAmount(amount);
    }

    async function saveCoupon() {
        try {
            const response = await axios.put("http://localhost:8080/coupons", {
                id,
                name,
                price,
                description,
                startDate,
                endDate,
                category: { id: category },
                company: { id: company },
                amount,
                url

            })
        }
        catch (e: any) {
            console.error(e);
            if (e.response?.data?.error?.message) {
                alert(e.response.data.error.message)
            } else {
                alert("failed to update coupon")
            }
        }
    };
    const handleCategorySelectChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const selectedCategory = +event.target.value;
        setCategory(selectedCategory);
    };

    return (
        <div className="coupon-card">
            <button className="enter-coupon">
                <img className="img-coupon" src={props.url}></img>
                <div className="coupon-name">
                    {props.name}
                </div>
                <div>
                    {props.price} ILS
                </div>
                <div className="counter">
                    <button className="counter-btn" onClick={incrementCount}>+</button>
                    <div>{amount}</div>
                    <button disabled={amount <= 0} className="counter-btn" onClick={decrementCount}>-</button>
                </div>
                <button disabled={amount <= 0} title="Buy Now" className=" button-icon"  onClick={event => buyNow(props.id)}><img src={cart} alt="Buy now" className="cart" /></button>
                <button className=" button-icon" title="More Details" onClick={event => openCouponModal()}><img src={details} alt="Buy now" className="cart" /></button>


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

                        <img className="img-coupon-modal" src={props.url}></img>


                        {editAble ? (<><label>Name: </label><input type="text" onChange={event => setName(event.target.value)} value={name}></input>
                            <label>Price: </label><input type="text" onChange={event => setPrice(event.target.value)} value={price}></input>
                            <label>Description: </label><input type="text" onChange={event => setDescription(event.target.value)} value={description}></input>
                            <div className="drop-down-box">
                                <label>Category: </label>
                                <select
                                    id="categories"
                                    defaultValue={"" + props.categoryName}
                                    onChange={handleCategorySelectChange}
                                >
                                    {categoriesData.map((category, index) => <option value={category.id}>{category.name}</option>)}

                                </select>
                            </div>
                            <label>End Date: </label><input type="text" onChange={event => setEndDate(event.target.value)} value={endDate}></input>
                            <label>Image URL </label><input type="text" onChange={event => setUrl(event.target.value)} value={url}></input></>) :


                            (<><div className="coupon-name-modal">{props.name}</div><div className="fields">
                                Price:{props.price} ILS
                            </div><div className="fields">
                                    About:  {props.description}
                                </div><div className="fields">
                                    Category:{props.categoryName}
                                </div><div className="fields">
                                    Expiration Date:  {props.endDate}
                                </div></>)}



                    </div>
                    {loginData?.userType != "admin" && (<div className="button-section">
                        <button className="button-modal" onClick={event => buyNow(props.id)}>Buy Now</button>
                    </div>)}

                    {loginData?.userType == "admin" && (<div className="button-section">
                        <button className="button-modal" onClick={e => setEditAble(true)}>Edit</button>
                        <button className="button-modal" onClick={saveCoupon}>Save</button>
                    </div>)}
                </div>
            </Modal>

        </div>
    )
}

export default Coupon;
