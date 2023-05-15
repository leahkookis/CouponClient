import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Link, Route, Routes, useNavigate } from 'react-router-dom';
import { ActionType } from '../../../redux/action-types';
import Login from '../../login/Login';
import Register from '../../register/Register';
import './header.css';

function Header() {
    let dispatch = useDispatch();
    function sendSearchText(subText: string) {
        dispatch({type: ActionType.SendSearchText, payload: {subText}});
    }
    return (
        <div>
        <div className='header-page'>My coupons site</div>
        <div className='header-navigation'>
        <input className='header-nav search' type="text" placeholder='Search' onChange={event=> sendSearchText(event.target.value)}/>

        <Link to="/"><button className='header-nav'>Flights</button></Link> 
        <Link to="/"><button className='header-nav'>Food</button></Link> 
        <Link to="/"><button className='header-nav'>Hotels</button></Link> 
        <Link to="/"><button className='header-nav'>Games</button></Link> 
        <Link to="/login"><button className='header-nav signin-btn'>Sign In</button></Link>
        </div>
        </div>

    );
}
export default Header;