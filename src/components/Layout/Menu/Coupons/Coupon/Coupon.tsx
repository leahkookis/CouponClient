import { useEffect, useState } from "react";
import IUserData from "../../../../../models/IUserData";
import axios from "axios";
import Companies from "../../Companies/Companies";
import { ModifierFlags } from "typescript";
import Modal from 'react-modal';
import { ActionType } from "../../../../../redux/action-types";
import { useDispatch } from "react-redux";

import UpdateModal from "../../../../ConfirmationModals/UpdateModal";
import CustomerDetailsModal from "../../customer-details-modal/CustomerDetailsModal";
import ICouponsData from "../../../../../models/ICouponsData";
import { MDBBtn, MDBIcon, MDBInput, MDBModal, MDBModalBody, MDBModalContent, MDBModalDialog, MDBModalFooter, MDBModalHeader, MDBModalTitle } from "mdb-react-ui-kit";


Modal.setAppElement('#root');

function Coupon(props: ICouponsData) {
  let [pageNumber, setPageNumber] = useState(1);
  let amountOfPage: number = 5;
  const [id, setId] = useState(props.id);
  const [name, setName] = useState(props.name);
  const [price, setPrice] = useState(props.price);
  const [description, setDescription] = useState(props.description);
  const [startDate, setStartDate] = useState(props.startDate);
  const [endDate, setEndDate] = useState(props.endDate);
  const [categoryName, setCategoryName] = useState(props.categoryName);
  const [categotyId, setCategotyId] = useState(props.categotyId);
  const [companyId, setCompanyId] = useState(props.companyId);
  const [amount, setAmount] = useState(props.amount);
  const [url, setUrl] = useState(props.url);
  const [companyName, setCompanyName] = useState(props.companyName);
  const [removeUserModalIsOpen, setRemoveUserModalIsOpen] = useState(false);
  const [customerDetailsModalIsOpen, setCustomerDetailsModalIsOpen] = useState(false);
  const [saveEditDetailsModalIsOpen, setSaveEditDetailsModalIsOpen] = useState(false);
  const [editClicked, setEditClicked] = useState(false);
  let companies: any[] = [];
  const [modalIsOpen, setIsOpen] = useState(false);
  const [text, setText] = useState("");
  let dispatch = useDispatch();
  let [usersList, setUsersList] = useState<IUserData[]>([]);



  async function removeCoupon() {
    
    try {
      let url = `http://localhost:8080/coupons/${id}`;
      let response = await axios.delete(url);
      setRemoveUserModalIsOpen(true);
      dispatch({ type: ActionType.RemoveIndex, payload: { id:id, nameOfList:"coupons" } });
    } catch (e: any) {
      if (e.response?.data?.errorMessage) {
        alert(e.response.data.errorMessage);
      } else {
        alert("Failed to retrieve coupons");
      }
    }

  }

  async function updateCoupons() {
    
    let coupon = { name, price, description, startDate,endDate ,company:{ id:companyId, name:companyName}, category:{id:categotyId , name:categoryName},amount, url };
    try {
      let response = await axios.put("http://localhost:8080/coupons", coupon);
      closeEditMode();
      openSaveEditDetailsModalIsOpen();
    } catch (e: any) {
      if (e.response?.data?.errorMessage) {
        alert(e.response.data.errorMessage);
      } else {
        alert("Failed to update  coupon");
      }
    }

  }

  function closeEditMode(){
    setEditClicked(false);
  }


  function openRemoveCouponModalIsOpen() {
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
      {!editClicked && <td>{name}</td>}
      {!editClicked && <td>{price}</td>}
      {!editClicked && <td>{description}</td>}
      {!editClicked && <td>{startDate}</td>}
      {!editClicked && <td>{endDate}</td>}
      {!editClicked && <td>{categoryName}</td>}
      {!editClicked && <td>{companyName}</td>}
      {!editClicked && <td>{amount}</td>}
      {!editClicked && <td><img className="img-table" src={url} /></td>}
      {editClicked && (
        <td>
          <MDBInput label='Name'
            type="text"
            defaultValue={""+name}
            onChange={(event) => setName(event.target.value)}
          />
        </td>
      )}
      {editClicked && (
        <td>
          <MDBInput label='Price'
            type="number"
            defaultValue={price}
            onChange={(event) => setPrice(+event.target.value)}
          />
        </td>
      )}
      {editClicked && (
        <td>
          <MDBInput label='Description'
            type="text"
            defaultValue={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </td>
      )}
      {editClicked && (
        <td>
          <MDBInput label='start date'
            type="date"
            defaultValue={startDate}
            onChange={(event) => setStartDate(event.target.value)}
          />
        </td>
      )}
      {editClicked && (
        <td>
          <MDBInput label='Expiration Date'
            type="date"
            defaultValue={endDate}
            onChange={(event) => setEndDate(event.target.value)}
          />
        </td>
      )}
      {editClicked && (
        <td>
          <MDBInput label='Category'
            type="text"
            defaultValue={""+categoryName}
            onChange={(event) => setCategoryName(event.target.value)}
          />
        </td>
      )}
      {editClicked &&(<td>{companyName}</td>)}
      {editClicked && (
        <td>
          <MDBInput label='Amount'
            type="text"
            defaultValue={amount}
            onChange={(event) => setAmount(+event.target.value)}
          />
        </td>
      )}
      {editClicked && (
        <td>
          <MDBInput label='Image Url'
            type="text"
            defaultValue={url}
            onChange={(event) => setUrl(event.target.value)}
          />
        </td>
      )}
      <td>
      {editClicked ?(<div className="edit-buttons-container">
            <button className="btbt" onClick={() => updateCoupons()}><MDBIcon  fas icon="paper-plane" />
            </button>

            <button className="btbt"

              onClick={() => setEditClicked(false)}
            >
              <MDBIcon fas icon="ban" />
            </button>
            <MDBModal show={saveEditDetailsModalIsOpen} setShow={setSaveEditDetailsModalIsOpen} tabIndex='-1'>

              <UpdateModal title="Success!!" massage={"Coupon details update successfuly."} closeModel={() => closeSaveEditDetailsModalIsOpen()} />

            </MDBModal>
          </div>
        ) : (
          <div className="edit-buttons-container">
            <button className="btbt" 
              onClick={() => setEditClicked(true)}
            > <MDBIcon far icon="edit" />
            </button>
            <button className="btbt " 
              

              onClick={() => removeCoupon()}
            > <MDBIcon fas icon="trash" />
            </button>
            </div>)}
          <MDBModal
              
              show={removeUserModalIsOpen}
              setShow={setRemoveUserModalIsOpen}
              contentLabel="Save edited details"
            >
               <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Success!!</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={closeRemoveUserModalIsOpen}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>Company removed successfuly.</MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={closeRemoveUserModalIsOpen}>
                Close
              </MDBBtn>
              
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
            </MDBModal>
        
      </td>
       
    </tr>

  );
}


export default Coupon;

