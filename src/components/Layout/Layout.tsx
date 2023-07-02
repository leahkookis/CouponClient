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