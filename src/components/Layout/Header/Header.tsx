import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Link, Route, Routes, useNavigate } from 'react-router-dom';
import { ActionType } from '../../../redux/action-types';
import Login from '../../login/Login';
import Register from '../../register/Register';
import './header.css';
import { AppState } from '../../../redux/app-state';
import ICustomerData from '../../../models/ICustomerData';
import cart from "../../images/cart.png"


function Header() {
    let navigate = useNavigate();
    let customer = useSelector((state: AppState) => state.customerData)
    let dispatch = useDispatch();
    function sendSearchText(subText: string) {
        dispatch({ type: ActionType.SendSearchText, payload: { subText } });
    }
    let countOfCartProduct = useSelector((state: AppState) => state.addToCart);
    let countOfBuyProduct = useSelector((state: AppState) => state.buyNow);
   

    return (
        <div>
            <div className='header-page'>My coupons site</div>
            <div className='header-navigation'>
                <input className='header-nav search' type="text" placeholder='Search' onChange={event => sendSearchText(event.target.value)} />

                <Link to="/"><button className='header-nav'>Flights</button></Link>
                <Link to="/"><button className='header-nav'>Food</button></Link>
                <Link to="/"><button className='header-nav'>Hotels</button></Link>
                <Link to="/"><button className='header-nav'>Games</button></Link>

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


