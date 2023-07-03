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

function Layout() {
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