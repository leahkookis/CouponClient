import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Login from "../../login/Login";
import Register from "../../register/Register";
import CouponsContainer from "../couponsContainer/CouponsContainer";
import CartShop from "../../cartShop/cartShop";
import { useSelector } from "react-redux";
import { AppState } from "../../../redux/app-state";
import AdminView from "../adminView/adminView";

function Main() {
    let loginData = useSelector((state: AppState) => state.loginData)
    return (
        <div>
              {loginData?.userType=='admin'&&(<AdminView/>)}
              {loginData?.userType!='admin'&&(<CouponsContainer/>)}
              
        </div>
    
    );
}
export default Main;