import React, { useState } from 'react';
import logo from './logo.svg';
import './login.css';
import axios from 'axios';
import profile from "../images/person.png"
import email from "../images/email.png"
import lock from "../images/lock.png"
import jwt_decode from 'jwt-decode';
import { json } from 'stream/consumers';
import ISuccessfulLoginData from '../../models/ISuccessfulLoginData';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ActionType } from '../../redux/action-types';
import IPurchaseData from '../../models/IPurchaseData';

function Login() {
  const navigate = useNavigate();
  let [userName, setUserName] = useState("");
  let [password, setPassword] = useState("");
  let dispatch = useDispatch();
  async function onButtonClick() {
    try {
      const response = await axios.post("http://localhost:8080/users/login", { userName, password });
      let token = response.data;
      let decodedToken: any = jwt_decode(token)
      let strSuccessfullLoginResponse: string = decodedToken.sub
      let successfullLoginResponse: ISuccessfulLoginData = JSON.parse(strSuccessfullLoginResponse);
      dispatch({ type: ActionType.LoginData, payload: { loginData: successfullLoginResponse } });
      console.log(" Decoded: ", successfullLoginResponse)
      axios.defaults.headers.common['Authorization'] = "Bearer " + token;
      navigate("/");

      const customerDataResponse = await axios.get("http://localhost:8080/customer/" + successfullLoginResponse.id);
      let customerDataRe = customerDataResponse.data;
      console.log(customerDataRe)
      dispatch({ type: ActionType.CustomerData, payload: { customerData: customerDataRe } });

      const customerPurchase = await axios.get(`http://localhost:8080/purchase/bycustomer`, { params: { customerid: successfullLoginResponse.id } });
      let purchaseData: IPurchaseData[] = customerPurchase.data;
      let countOfCartProduct = purchaseData.filter(purchase => purchase.buy === false).length;
      let countOfBuyProduct = purchaseData.filter(purchase => purchase.buy === true).length;
      debugger;
      dispatch({ type: ActionType.BuyNow, payload: {countOfBuyProduct} });
      dispatch({ type: ActionType.AddToCartCount, payload: {countOfCartProduct} });

    } catch (e: any) {
      console.error(e);
      if (e.response?.data?.error?.message) {
        alert(e.response.data.error.message)
      } else {
        alert("Login invalid, try later")
      }
    }

  }
  function onSignUpClick() {
    navigate("/register")
  }
  function onForgotPasswordClick() {
    navigate("/forgotPassword");
  }
  return (
    <div className="login-main">
      <div className="login-sub-main">
        <div>
          <div className="imgs">
            <div className="container-image">
              <img src={profile} alt="profile" className="profile" />
            </div>
          </div>
          <div>
            <h1>Login</h1>
            <div >
              <img src={email} alt="email" className="email" />
              <input type="text" className="name input-login" placeholder='User Name' onChange={event => setUserName(event.target.value)} /><br />
            </div>
            <div >
              <img src={lock} alt="lock" className="email" />
              <input type="password" className="name input-login" placeholder='Password' onChange={event => setPassword(event.target.value)} /><br />
            </div>
            <div >
              <input type="button" className="login-button input-login" value="Login" onClick={onButtonClick} /><br />
            </div>


            <input type="button" className="forgotPassword input-login" value="Forgot password" onClick={onForgotPasswordClick} />
            <input type="button" className="signUp input-login" value="sign up" onClick={onSignUpClick} /><br />


          </div>
        </div>

      </div>
    </div>

  );
}

export default Login;