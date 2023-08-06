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
import { MDBBtn, MDBInput } from 'mdb-react-ui-kit';

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
      axios.defaults.headers.common['Authorization'] =  token;
      navigate("/");
      let decryptedToken: ISuccessfulLoginData = successfullLoginResponse;
      sessionStorage.setItem("token", token);
      dispatch({
        type: ActionType.SaveDecryptedToken,
        payload: { decryptedToken },
      });

      if(successfullLoginResponse.userType=='customer'){
      const customerDataResponse = await axios.get("http://localhost:8080/customer/" + successfullLoginResponse.id);
      let customerDataRe = customerDataResponse.data;
      console.log(customerDataRe)
      dispatch({ type: ActionType.CustomerData, payload: { customerData: customerDataRe } });

      
      
      }

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
            
            
              
              <MDBInput label="User name" className="form-label" type="text" onChange={event => setUserName(event.target.value)} />
              <MDBInput label="Password" className="form-label" type="password" onChange={event => setPassword(event.target.value)} />
         
            
              <MDBBtn color='secondary' className='btn-lg'  onClick={onButtonClick} >Login</MDBBtn><br />
            


            <div>Not registered yet? <Link to={'/register'}>Sign Up</Link></div>
            


          </div>
        </div>

      </div>
    </div>

  );
}

export default Login;