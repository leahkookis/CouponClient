import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Login from "../../login/Login";
import Register from "../../register/Register";
import CouponsContainer from "../couponsContainer/CouponsContainer";
import CartShop from "../../cartShop/cartShop";

function Main() {
    //let navigate = useNavigate();
    return (
        <div>
              <CouponsContainer/>
              
        </div>
    
    );
}
export default Main;