import { useEffect, useState } from 'react';
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
import Companies from '../Menu/Companies/Companies';
import ICompanyData from '../../../models/ICompanyData';
import Company from '../Menu/Companies/company/Company';
import ICategory from '../../../models/ICategory';


function Header() {
    let navigate = useNavigate();
    let loginData = useSelector((state: AppState) => state.token)
    
    let company:ICompanyData[] = useSelector((state: AppState) => state.companiesData)
    let customer = useSelector((state: AppState) => state.customerData)
    let coupons = useSelector((state: AppState) => state.coupons)
    let dispatch = useDispatch();
    let adminMode = loginData?.userType == 'admin' ? true : false;
    let companyAdminMode = loginData?.userType == 'company' ? true : false;
    let customerMode = loginData?.userType == 'customer' ? true : false;

    let [showAccountOptions, setShowAccountOptions] = useState(false);
    let[pageNumber, setPageNumber]  = useState(1);
    let amountOfPage: number = 7;
    let companyName = 0;



    function logout() {
        sessionStorage.removeItem("token");
        dispatch({ type: ActionType.RemoveDecryptedToken });
        navigate("/");
        window.location.reload();
       
        getAllCoupons(1,amountOfPage)
    }

    function sendSearchText(subText: string) {
        dispatch({ type: ActionType.SendSearchText, payload: { subText } });
    }
    let countOfCartProduct = useSelector((state: AppState) => state.addToCart);
    let countOfBuyProduct = useSelector((state: AppState) => state.buyNow);

    async function getCouponsByCategory(category: number) {
        try {

            let url = await axios.get(`http://localhost:8080/coupons/bycategory?categoryid=${category}`);
            let response = url.data;
            dispatch({ type: ActionType.GetCoupons, payload: { response } })

        } catch (error) {
            alert("something went wrong");

        }
    }
        async function getAllCoupons(pageNumber: number, amountOfPage: number) {
            try {
    
                let url = await axios.get(`http://localhost:8080/coupons?page=${pageNumber}`);
                let response = url.data;
                dispatch({ type: ActionType.GetCoupons, payload: { response } })
    
            } catch (error) {
                alert("something went wrong ");
    
            }
        }
    
        async function getCouponsBycompanyId(companyId:number, pageNumber: number) {
            try {
              let url = `http://localhost:8080/coupons/bycompany?companyId=${companyId}&page=${pageNumber}`;
              let response1 = await axios.get(url);
              let response = response1.data;
        
              dispatch({ type: ActionType.GetCoupons, payload: { response } });
            } catch (e) {
              console.error(e);
              alert("Failed to retrieve coupons");
            }
          }


    return (
        <div>
            <div className='header-page'>My coupons site</div>
            <div className=' header-wrapper'>
                <input className='header-nav search' type="text" placeholder='Search' onChange={event => sendSearchText(event.target.value)} />
                <div className='header-navigation'><Link className='cate' to="/"><button onClick={() => getAllCoupons(pageNumber,amountOfPage) } className='header-nav'>Home</button></Link>
                <Link to="/"><button onClick={() => getCouponsByCategory(1)} className='header-nav'>Massage</button></Link>
                <Link to="/"><button onClick={() => getCouponsByCategory(2)} className='header-nav'>Food</button></Link>
                <Link to="/"><button onClick={() => getCouponsByCategory(3)} className='header-nav'>Hotels</button></Link>
                <Link to="/"><button onClick={() => getCouponsByCategory(4)} className='header-nav'>Movies</button></Link>
                <Link to="/"><button onClick={() => getCouponsByCategory(5)} className='header-nav'>Flights</button></Link>
                </div>
                {loginData == null && (
                    <Link to="/login"><button className='header-nav signin-btn'>Sign In</button></Link>)}
                {loginData != null && (
                    <div className='signin-btn'>
                        
                        {adminMode && (<div className='header-nav signin-btn' onMouseEnter={() => setShowAccountOptions(true)} onMouseLeave={() => setShowAccountOptions(false)}>Hello Admin</div>)}
                        {companyAdminMode && (<div className='header-nav signin-btn' onMouseEnter={() => setShowAccountOptions(true)} onMouseLeave={() => setShowAccountOptions(false)}>Hello</div>)}
                        {customerMode && (<div className='header-nav signin-btn' onMouseEnter={() => setShowAccountOptions(true)} onMouseLeave={() => setShowAccountOptions(false)}>Hello {customer?.name}</div>)}

                        <div className={showAccountOptions ? "account-options" : "account-options-active"}
                                onMouseEnter={() => setShowAccountOptions(true)}
                                onMouseLeave={() => setShowAccountOptions(false)}>    
                           
                            {adminMode && (
                                <><Link className="header-menu-links" to="/admin/users">
                                    <button
                                        className="header-menu-links-button"
                                        onClick={() => setShowAccountOptions(!showAccountOptions)}
                                    >
                                        Users
                                    </button></Link><Link className="header-menu-links" to="/admin/companies">
                                        <button
                                            className="header-menu-links-button"
                                            onClick={() => setShowAccountOptions(!showAccountOptions)}
                                        >
                                            Companies
                                        </button>
                                    </Link><Link className="header-menu-links" to="/admin/purchases">
                                        <button
                                            className="header-menu-links-button"
                                            onClick={() => setShowAccountOptions(!showAccountOptions)}
                                        >
                                            Purchases
                                        </button>
                                    </Link></>

                            )}
                            {loginData.userType == 'customer' && (
                                <Link className="header-menu-links" to="/cart">
                                    <button
                                        className="header-menu-links-button"
                                        onClick={() => setShowAccountOptions(!showAccountOptions)}
                                    >
                                        My Purchases
                                    </button>

                                </Link>

                            )}
                            {companyAdminMode && (
                                <><Link className="header-menu-links" to="/company/coupons/bycompany"  onClick={() => getCouponsBycompanyId(loginData?.companyId || 0,pageNumber)}>
                                    <button
                                        className="header-menu-links-button"
                                        onClick={() => setShowAccountOptions(!showAccountOptions)}
                                    >
                                        Coupons
                                    </button>
                                </Link><Link className="header-menu-links" to="/company/purchases">
                                        <button
                                            className="header-menu-links-button"
                                            onClick={() => setShowAccountOptions(!showAccountOptions)}
                                        >
                                            Purchases
                                        </button>
                                    </Link></>
                            )}
                            <Link className="header-menu-links" to="/">
                                <button
                                    className="header-menu-links-button"
                                    onClick={() => logout()}
                                >
                                    Logout
                                </button>
                            </Link></div>

                    </div>)}
            </div>
        </div>




    )
}


export default Header;


