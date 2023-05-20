import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Link, Route, Routes, useNavigate } from 'react-router-dom';
import { ActionType } from '../../../redux/action-types';
import Login from '../../login/Login';
import Register from '../../register/Register';
import './header.css';
import { AppState } from '../../../redux/app-state';
import ICustomerData from '../../../models/ICustomerData';
<<<<<<< HEAD
import cart from "../../images/cart.png"
=======
import axios from 'axios';
>>>>>>> afb0aec2fdf77ba8a5df0f1c41ab644f00ab997b


function Header() {
    let navigate = useNavigate();
    let customer = useSelector((state: AppState) => state.customerData)
    let dispatch = useDispatch();
    function sendSearchText(subText: string) {
        dispatch({ type: ActionType.SendSearchText, payload: { subText } });
    }
    let countOfCartProduct = useSelector((state: AppState) => state.addToCart);
    let countOfBuyProduct = useSelector((state: AppState) => state.buyNow);
<<<<<<< HEAD
   
=======
    
    async function getCouponsByCategory(category: number) {
        try {
           
            let url= await axios.get(`http://localhost:8080/coupons/bycategory?categoryid=${category}`);
            let response = url.data;
            dispatch({type: ActionType.GetCoupons, payload: {response}})

        } catch (error) {
            alert("something...");
            
        }
    }
>>>>>>> afb0aec2fdf77ba8a5df0f1c41ab644f00ab997b

    return (
        <div>
            <div className='header-page'>My coupons site</div>
            <div className='header-navigation'>
                <input className='header-nav search' type="text" placeholder='Search' onChange={event => sendSearchText(event.target.value)} />

<<<<<<< HEAD
                <Link to="/"><button className='header-nav'>Flights</button></Link>
                <Link to="/"><button className='header-nav'>Food</button></Link>
                <Link to="/"><button className='header-nav'>Hotels</button></Link>
                <Link to="/"><button className='header-nav'>Games</button></Link>

=======
                <Link to="/"><button onClick={()=>getCouponsByCategory(1)} className='header-nav'>Travels</button></Link>
                <Link to="/"><button onClick={()=>getCouponsByCategory(2)} className='header-nav'>Food</button></Link>
                <Link to="/"><button onClick={()=>getCouponsByCategory(3)} className='header-nav'>Hotels</button></Link>
                <Link to="/"><button onClick={()=>getCouponsByCategory(4)} className='header-nav'>Games</button></Link>
                <Link to="/"><button onClick={()=>getCouponsByCategory(5)} className='header-nav'>Kids</button></Link>
>>>>>>> afb0aec2fdf77ba8a5df0f1c41ab644f00ab997b
                {customer == null && (
                    <Link to="/login"><button className='header-nav signin-btn'>Sign In</button></Link>)}
                {customer != null && (
                    <div className='customer-data signin-btn'>
                        <div className='header-nav '>Hello {customer?.name}</div>
                        {/* <Link to="/purchase"><button className='header-nav '>My Purchase<div>{countOfBuyProduct}</div></button></Link> */}
                        <Link to="/cart"><button  className='header-nav '><img src={cart} alt="cart" className="cart" />{countOfCartProduct} </button></Link>

                    </div>)}
            </div>
        </div>

    );
}
export default Header;


