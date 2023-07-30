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

import SuccessBuyCoupon from "../SuccessBuyCoupon/SuccessBuyCoupon";



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
    let loginData = useSelector((state: AppState) => state.token)
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
    let categories: any[] = [];


    let massage: string = "";
    let title: string = "";

    let [isSuccessPurchase, setIsSuccessPurchase] = useState(false);
    function closeConirmationModal() {
        setIsSuccessPurchase(false);
    }

    function openIsSuccessPurchase() {
        setIsSuccessPurchase(true);
    }





    async function buyNow(id: number) {
        if (loginData == null) {
            navigate("/login")
            return;
        }
        try {
            const response = await axios.post("http://localhost:8080/purchase", { timeStamp, customer, coupon, amount });
            dispatch({ type: ActionType.BuyNow, payload: { countOfBuyProduct } });
            closeModal();
            debugger;
            title = "success";
            massage = "Successffuly purchase {coupon.name}";
            openIsSuccessPurchase();

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




    let [amount, setAmount] = useState(1);

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
     <div className="card">
  <div className="bg-image hover-overlay ripple image-container" data-mdb-ripple-color="light">
    <img src={props.url} className="img-fluid"/>
    <a href="#!">
      <div className="mask maskstyle"></div>
    </a>
  </div>
  <div className="card-body">
    <h5 className="card-title">{props.name}</h5>
    <div className="card-text">{props.price} ILS</div>
    <div className="card-text">{props.description}</div>
    <div className="counter">
                    <button className="counter-btn" onClick={incrementCount}><i className="fas fa-circle-plus"></i></button>
                    <div>{amount}</div>
                    <button disabled={amount <= 0} className="counter-btn" onClick={decrementCount}><i className="fas fa-circle-minus"></i></button>
                </div>
                <button disabled={amount <= 0} title="Buy Now" className="btn btn-lg button-icon-bg" onClick={event => buyNow(props.id)}><i className="button-icon far fa-credit-card"></i></button>
                <button className="btn btn-lg  button-icon-bg" title="More Details" onClick={event => openCouponModal()}><i className="fas fa-align-justify button-icon"></i></button>


            
  </div>
</div>
       {/*} <div className="coupon-card">
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
                <button disabled={amount <= 0} title="Buy Now" className=" button-icon" onClick={event => buyNow(props.id)}><img src={cart} alt="Buy now" className="cart" /></button>
                <button className=" button-icon" title="More Details" onClick={event => openCouponModal()}><img src={details} alt="Buy now" className="cart" /></button>


            </button>
    */}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >

<div className="card mb-3" >
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={props.url}
              alt="Trendy Pants and Shoes"
              className="img-fluid rounded-start"
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
            <h3 className="card-title"><strong>{props.name}</strong></h3>
    <div className="card-text"><strong>Price: </strong>{props.price} ILS</div>
    <div className="card-text"><strong>Description: </strong>{props.description}</div>
    <div className="card-text"><strong>Category: </strong>{props.categoryName}</div>
    <div className="counter">
                    <button className="counter-btn" onClick={incrementCount}><i className="fas fa-circle-plus"></i></button>
                    <div>{amount}</div>
                    <button disabled={amount <= 0} className="counter-btn" onClick={decrementCount}><i className="fas fa-circle-minus"></i></button>
                </div>
                <button disabled={amount <= 0} title="Buy Now" className="btn btn-lg button-icon-bg" onClick={event => buyNow(props.id)}><div className="button-icon">Buy Now</div></button>
                


              
            </div>
          </div>
        </div>
      </div>

            </Modal>
            <Modal
                className="modal"
                isOpen={isSuccessPurchase}
                onRequestClose={closeConirmationModal}
            >
                <SuccessBuyCoupon id={id} name={name} price={props.price} description={description} startDate={startDate} endDate={endDate} categoryName={props.categoryName} categotyId={category} companyName={props.companyName} companyId={company} amount={amount} url={url} />
            </Modal>


        </div>
        
    )
}

export default Coupon;
