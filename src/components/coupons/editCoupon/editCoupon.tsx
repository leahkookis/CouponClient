import { useSelector } from "react-redux";
import ICouponsData from "../../../models/ICouponsData";
import { AppState } from "../../../redux/app-state";
import './editCoupon.css'; 

function EditCoupon(props: ICouponsData){
    let coupons = useSelector((state: AppState)=> state.coupons)
   function updateCoupon(){

   }
    return(
        <div className="edit-coupon">
            <div><input type="text">
                {props.id}
                </input>
            </div>
            <div>
                <input>
                {props.name}
                </input>
            </div>
            <div>
                <input>
                {props.price}
                </input>
            </div>
            <div>
                <input>
                {props.description}
                </input>
            </div>
            <div>
                {props.amount}
            </div>
            <div>
                {props.categoryName}
            </div>
            <div>
                {props.companyName}
            </div>
            <div>
                {props.startDate}
            </div>
            <div>
                {props.endDate}
            </div>
            <div className="edit-button">
        {(<input type="button" value={"edit"} onClick={updateCoupon}/>)}
      </div>
        </div>
    )
}

export default EditCoupon;
    