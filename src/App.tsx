import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/login/Login';
import Register from './components/register/Register';
import {BrowserRouter, BrowserRouter as Router , Route , Routes} from 'react-router-dom';
import Customer from './components/customer/Customer';
import Layout from './components/Layout/Layout';
import { useDispatch } from 'react-redux';
import jwt_decode from "jwt-decode";
import ISuccessfulLoginData from './models/ISuccessfulLoginData';
import { ActionType } from './redux/action-types';
import axios from 'axios';

function App() {
  let dispatch = useDispatch();
    

      useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (token!==null) {
          let decodedToken: any = jwt_decode(token);
          let strSuccessfulLoginResponse: string = decodedToken.sub;
          let decryptedToken: ISuccessfulLoginData = JSON.parse(
            strSuccessfulLoginResponse
          );
          dispatch({
            type: ActionType.SaveDecryptedToken,
            payload: { decryptedToken },
          });
          axios.defaults.headers.common["Authorization"] = token;
        }
      }, []);
  return ( 

<div>
<Layout/>


</div> )}

export default App;
