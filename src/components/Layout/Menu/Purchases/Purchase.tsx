import { useEffect, useState } from "react";
import axios from "axios";
import { ModifierFlags } from "typescript";
import Modal from 'react-modal';
import { useDispatch, useSelector } from "react-redux";
import "./Purchase.css";
import IPurchaseData from "../../../../models/IPurchaseData";
import ConfirmationModal from "../../../ConfirmationModal/ConfirmationModal";
import ICouponsData from "../../../../models/ICouponsData";
import { AppState } from "../../../../redux/app-state";
import ICustomerData from "../../../../models/ICustomerData";
import { ActionType } from "../../../../redux/action-types";


Modal.setAppElement('#root');

function User(props: IPurchaseData) {
  let [pageNumber, setPageNumber] = useState(1);
  let amountOfPage: number = 5;
  const [id, setId] = useState(props.id);
  const [name, setName] = useState(props.name);
  const [couponName, setCouponName] = useState(props.couponName);
  const [categoryName, setCategoryName] = useState(props.categoryName);
  const [companyName, setCompanyName] = useState(props.companyName);
  const [couponPrice, setCouponPrice] = useState(props.couponPrice);
  const [companyId, setCompanyId] = useState(1);
  const [categoryId, setCategoryId] = useState(1);
  const [amount, setAmount] = useState(props.amount);
  const [timeStamp, setTimeStamp] = useState(props.timeStamp);
  const [removeUserModalIsOpen, setRemoveUserModalIsOpen] = useState(false);
  const [customerDetailsModalIsOpen, setCustomerDetailsModalIsOpen] = useState(false);
  const [saveEditDetailsModalIsOpen, setSaveEditDetailsModalIsOpen] = useState(false);
  const [editClicked, setEditClicked] = useState(false);
  let companies: any[] = [];
  const [modalIsOpen, setIsOpen] = useState(false);
  const [text, setText] = useState("");
  let dispatch = useDispatch();
  let [purchasesList, setPurchasesList] = useState<IPurchaseData[]>([]);
  let couponList: ICouponsData[] = useSelector((state: AppState)=> state.coupons)




  async function removePurchase() {
    try {
      let url = `http://localhost:8080/purchase/${id}`;
      let response = await axios.delete(url);
     
      dispatch({ type: ActionType.RemoveIndex, payload: { id:id, nameOfList:"purchases" } });

    } catch (e: any) {
      if (e.response?.data?.errorMessage) {
        alert(e.response.data.errorMessage);
      } else {
        alert("Failed to delete purchase");
      }
    }

  }

  
  function closeEditMode() {
    setEditClicked(false);
  }


  function openRemoveUserModalIsOpen() {
    setRemoveUserModalIsOpen(true);
  }

  const closeRemoveUserModalIsOpen = () => {
    setRemoveUserModalIsOpen(false);
  };

  function openCustomerDetailsModalIsOpen() {
    setCustomerDetailsModalIsOpen(true);
  }

  const closeCustomerDetailsModalIsOpen = () => {
    setCustomerDetailsModalIsOpen(false);
  };

  function openSaveEditDetailsModalIsOpen() {
    setSaveEditDetailsModalIsOpen(true);
  }

  const closeSaveEditDetailsModalIsOpen = () => {
    setSaveEditDetailsModalIsOpen(false);
  };


  return (

    <tr >
      <td>{props.name}</td>
      <td>{props.couponPrice}</td>
        <td>{props.couponName}</td>
      <td>{props.categoryName}</td>
       <td>{props.companyName}</td>
      <td>{props.amount}</td>
      <td>{props.timeStamp}</td>
      
    

      <td>
        <div className="edit-buttons-container">
          <button
            className="edit-button"
            onClick={() => removePurchase()}
          > remove
          </button>

        </div>
      </td>
     
    </tr>

  );

}
export default User;

