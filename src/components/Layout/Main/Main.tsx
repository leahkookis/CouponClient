import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Login from "../../login/Login";
import Register from "../../register/Register";
import CouponsContainer from "../couponsContainer/CouponsContainer";
import { useSelector } from "react-redux";
import { AppState } from "../../../redux/app-state";
import Menu from "../Menu/Menu";


function Main() {
    let loginData = useSelector((state: AppState) => state.loginData)
    return (
        <div>
              
           <CouponsContainer/>
             
        </div>
    
    );
}
export default Main;