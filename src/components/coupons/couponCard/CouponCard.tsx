import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ICouponsData from "../../../models/ICouponsData";
import { AppState } from "../../../redux/app-state";
import EditCoupon from "../editCoupon/editCoupon";
import './couponCard.css'; 

function Coupon(props: ICouponsData){
    let loginData = useSelector((state: AppState)=> state.loginData)
    function editCoupon(){
      <EditCoupon id={props.id} name={props.name} price={props.price} description={props.description} startDate={props.startDate} endDate={props.endDate} categoryName={props.categoryName} companyName={props.companyName} amount={props.amount}/>
    }
    return(
        <div className="coupon-card">
    
            <img className="img-coupon" src="https://www.photo-art.co.il/wp-content/uploads/2017/09/IMG_9006.jpg"></img>
            <div className="coupon-name">
                {props.name}
            </div>
            <div>
                {props.price} ILS
            </div>
            <div>
                {props.description}
            </div>
            <div className="edit-button">
        {loginData?.userType=="admin" && (<input type="button" value={"edit"} onClick={editCoupon}/>)}
      </div>
        </div>
    )
}

export default Coupon;
    