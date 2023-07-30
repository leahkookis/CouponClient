import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import './PurchaseCard.css';
import Modal from 'react-modal';
import { useState } from "react";

import axios from "axios";
import IPurchaseData from "../../models/IPurchaseData";

import { AppState } from "../../redux/app-state";
import { ActionType } from "../../redux/action-types";
import { choices } from "yargs";
import ICouponsData from "../../models/ICouponsData";




const customStyles = {
    content: {
        top: '60%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',


    },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

function PurchaseCard(props: IPurchaseData) {
    let loginData = useSelector((state: AppState) => state.token)
    let coupons:ICouponsData[] = useSelector((state: AppState) => state.coupons)
    const navigate = useNavigate();
    let dispatch = useDispatch();
    let thisCoupon = coupons.filter(c=>c.name == props.couponName)[0];
    
    
    

    





    return (
        <div className="card mb-3" >
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src="https://mdbcdn.b-cdn.net/wp-content/uploads/2020/06/vertical.webp"
              alt="Trendy Pants and Shoes"
              className="img-fluid rounded-start"
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{props.name}</h5>
              <p className="card-text">
                This is a wider card with supporting text below as a natural lead-in to
                additional content. This content is a little bit longer.
              </p>
              <p className="card-text">
                <small className="text-muted">Last updated 3 mins ago</small>
              </p>
            </div>
          </div>
        </div>
      </div>


    )
}

export default PurchaseCard;
