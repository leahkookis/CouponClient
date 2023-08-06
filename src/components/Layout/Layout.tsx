import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import Menu from "./Menu/Menu";
import './layout.css';
import Login from "../login/Login";
import Register from "../register/Register";
import CouponsConrainer from "./couponsContainer/CouponsContainer";
import Main from "./Main/Main";


import Companies from "./Menu/Companies/Companies";
import Users from "./Menu/Users/Users";
import CartShop from "../cartShop/cartShop";
import { useEffect } from "react";
import ISuccessfulLoginData from "../../models/ISuccessfulLoginData";
import { useDispatch } from "react-redux";
import { ActionType } from "../../redux/action-types";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Purchases from "./Menu/Purchases/Purchases";
import SuccessBuyCoupon from "../SuccessBuyCoupon/SuccessBuyCoupon";
import Coupons from "./Menu/Coupons/Coupons";

function Layout() {
    let dispatch = useDispatch();
    

      useEffect(() => {
        const token = sessionStorage.getItem("token");
        axios.defaults.headers.common["Authorization"] = token;
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
          if(decryptedToken.userType=='customer'){
            getCustomer(decryptedToken.id);
          }
        }
      }, [1]);

      async function getCustomer(id:number) {
       
            const customerDataResponse = await axios.get("http://localhost:8080/customer/" + id);
            let customerDataRe = customerDataResponse.data;
            console.log(customerDataRe)
            dispatch({ type: ActionType.CustomerData, payload: { customerData: customerDataRe } });
            
        }
    
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
                        <Route path="/admin/purchases" element={<Purchases />} />
                        <Route path="/admin/companies" element={<Companies />} />
                        <Route path="/company/coupons" element={<Coupons />} />

                        

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