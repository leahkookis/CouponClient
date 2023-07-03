import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import Menu from "./Menu/Menu";
import './layout.css';
import Login from "../login/Login";
import Register from "../register/Register";
import CouponsConrainer from "./couponsContainer/CouponsContainer";
import Main from "./Main/Main";


import Companies from "./Companies/Companies";
import Users from "./Menu/Users/Users";
import CartShop from "../cartShop/cartShop";
import { useEffect } from "react";
import ISuccessfulLoginData from "../../models/ISuccessfulLoginData";
import { useDispatch } from "react-redux";
import { ActionType } from "../../redux/action-types";
import axios from "axios";
import jwt_decode from "jwt-decode";

function Layout() {
    let dispatch = useDispatch();
    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (token != null) {
            let decodedToken: any = jwt_decode(token)
            let strSuccessfullLoginResponse: string = decodedToken.sub
            let successfullLoginResponse: ISuccessfulLoginData = JSON.parse(strSuccessfullLoginResponse);
          dispatch({
            type: ActionType.SaveDecryptedToken,
            payload: { successfullLoginResponse },
          });
          axios.defaults.headers.common["Authorization"] = token;
        }
      }, []);
    
    return (
       
        <section className="layout">
            <BrowserRouter>
            <header className="header">
                <Header/>
            </header>
           
            <main  className="main">
                    <Routes> 
                        <Route path="/login" element={<Login/>} />
                        <Route path="/companies" element={<Companies/>} />
                        <Route path="/register" element={<Register/>} />
                        <Route path="/" element={<Main/>}/>
                        <Route path="/cart" element={<CartShop/>}/>
                        <Route path="/admin/users" element={<Users />} />


                        
                    </Routes>
            </main>
                
          
            <footer className="footer">
                <Footer/>
            </footer>
            </BrowserRouter>
        </section>
        
    );
}
export default Layout;