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
import axios from 'axios';
import Companies from '../Companies/Companies';


function Header() {
    let navigate = useNavigate();
    let loginData = useSelector((state: AppState) => state.loginData)
    let customer = useSelector((state: AppState) => state.customerData)
    let dispatch = useDispatch();
    let adminMode= loginData?.userType=='admin'?true:false;
    
    function sendSearchText(subText: string) {
        dispatch({ type: ActionType.SendSearchText, payload: { subText } });
    }
    let countOfCartProduct = useSelector((state: AppState) => state.addToCart);
    let countOfBuyProduct = useSelector((state: AppState) => state.buyNow);
    
    async function getCouponsByCategory(category: number) {
        try {
           
            let url= await axios.get(`http://localhost:8080/coupons/bycategory?categoryid=${category}`);
            let response = url.data;
            dispatch({type: ActionType.GetCoupons, payload: {response}})

        } catch (error) {
            alert("something...");
            
        }
    }

    return (
        <div>
            <div className='header-page'>My coupons site</div>
            <div className='header-navigation'>
                <input className='header-nav search' type="text" placeholder='Search' onChange={event => sendSearchText(event.target.value)} />
                {!adminMode && (
                <><Link to="/"><button onClick={() => getCouponsByCategory(1)} className='header-nav'>Travels</button></Link>
                <Link to="/"><button onClick={() => getCouponsByCategory(2)} className='header-nav'>Food</button></Link>
                <Link to="/"><button onClick={() => getCouponsByCategory(3)} className='header-nav'>Hotels</button></Link>
                <Link to="/"><button onClick={() => getCouponsByCategory(4)} className='header-nav'>Games</button></Link>
                <Link to="/"><button onClick={() => getCouponsByCategory(5)} className='header-nav'>Kids</button></Link></>)}

                {adminMode && (
                <><Link to="/companies"><button onClick={() => <Companies/>} className='header-nav'>Companies</button></Link>
                <Link to="/"><button onClick={() => getCouponsByCategory(2)} className='header-nav'>Coupons</button></Link>
                <Link to="/"><button onClick={() => getCouponsByCategory(3)} className='header-nav'>Customers</button></Link>
                <Link to="/"><button onClick={() => getCouponsByCategory(4)} className='header-nav'>Purchases</button></Link>
                </>)}


                {loginData == null && (
                    <Link to="/login"><button className='header-nav signin-btn'>Sign In</button></Link>)}
                {loginData != null && (
                    <div className='customer-data signin-btn'>
                        {customer==null&&(<div className='header-nav'>Hello Admin</div>)}
                        {customer!=null&&(<><div className='header-nav'>Hello {customer.name}</div>
                        <Link to="/cart"><button className='header-nav customer-name'><img src={cart} alt="cart" className="cart" />{countOfCartProduct} </button></Link></>)}
                        <Link to="/logout">Log out</Link>

                    </div>)}
            </div>
        </div>

    );
}
export default Header;


