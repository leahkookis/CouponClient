import { useDispatch, useSelector } from "react-redux";
import IPurchaseData from "../../models/IPurchaseData";
import { AppState } from "../../redux/app-state";
import { useEffect, useState } from "react";
import axios from "axios";
import Coupon from "../coupons/CouponCard";
import PurchaseCard from "../purchaseCard/PurchaseCard";
import { ActionType } from "../../redux/action-types";

import ICouponsData from "../../models/ICouponsData";
import { Link, useNavigate } from "react-router-dom";
import { MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBBtn, MDBModalBody, MDBModalFooter } from "mdb-react-ui-kit";
import ICustomerData from "../../models/ICustomerData";

function SuccessBuyCoupon(props: ICouponsData) {
    const customer:ICustomerData = useSelector((state: AppState) => state.customerData)
    const getSelectedCouponsIds = useSelector((state: AppState) => state.sendPurchaseToBuy)
    const cartProductsArray: IPurchaseData[] = useSelector((state: AppState) => state.purchases)
    // const [customerId, setcustomerId] = useState();
    let dispatch = useDispatch();
    useEffect(() => {
      if (customer && customer.id) {
          getPurchaseByCustomer(customer.id);
      }
  }, [customer]);
    let navigate = useNavigate()


    async function getPurchaseByCustomer(customerId:number) {
        try {
          debugger
            let url = `http://localhost:8080/purchase/bycustomer?customerid=${customerId}`;
            let customerPurchase = await axios.get(url);
            let purchaseData = customerPurchase.data;
            dispatch({ type: ActionType.GetPurchase, payload: { purchaseData: purchaseData } })
        } catch (error) {
            alert("something went wrong");

        }

    }

    function goToHome(){
        navigate("/");
    }


    function goToMyPurcheses(){
        navigate("/cart");
    }

    return (
        <MDBModalDialog className="modal-lg">
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle ><div className="gift"><i className="fas fa-gift icon-gift"></i> </div>
              </MDBModalTitle>
              {/* <MDBBtn className='btn-close' color='none' ></MDBBtn> */}
            </MDBModalHeader>
            <MDBModalBody>
                 <h2 className="card-title"><strong>Your coupon has been successfully purchased.</strong></h2><br></br>
                 <strong>Name: </strong>{props.name}
    <div className="card-text"><strong>Price: </strong>{props.price} ILS</div>
    <div className="card-text"><strong>Description: </strong>{props.description}</div></MDBModalBody>

            <MDBModalFooter>
              <MDBBtn className="right" color='secondary' onClick={()=>goToMyPurcheses()}>
              View your purchases
              </MDBBtn>
              <MDBBtn color='secondary' onClick={()=>goToHome()}>
              Continue shopping
              
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
        
        
           




        

    );

}
export default SuccessBuyCoupon;