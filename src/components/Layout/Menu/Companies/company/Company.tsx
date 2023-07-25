import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ICouponsData from "../../../../../models/ICouponsData";
import { AppState } from "../../../../../redux/app-state";
import './Company.css';
import Modal from 'react-modal';
import { useState } from "react";

import axios from "axios";
import IPurchaseData from "../../../../../models/IPurchaseData";

import ICustomerData from "../../../../../models/ICustomerData";
import { ActionType } from "../../../../../redux/action-types";
import ICompanyData from "../../../../../models/ICompanyData";
import ConfirmationModal from "../../../../ConfirmationModal/ConfirmationModal";
import CompanyUsersDetailsModal from "../Company-users-details-modal/CompanyUsersDetailsModal";



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

function Company(props: ICompanyData) {
    let loginData = useSelector((state: AppState) => state.token)
    const [id, setId] = useState(props.id);
    const [name, setName] = useState(props.name);
    const [address, setAddress] = useState(props.address);
    const [phoneNumber, setPhoneNumber] = useState(props.phoneNumber);
    const [removeCompanyModalIsOpen, setRemoveCompanyModalIsOpen] = useState(false);
  const [usersDetailsModalIsOpen, setUsersDetailsModalIsOpen] = useState(false);
  const [saveEditDetailsModalIsOpen, setSaveEditDetailsModalIsOpen] = useState(false);
  const [editClicked, setEditClicked] = useState(false);
  let companies: any[] = [];
  const [modalIsOpen, setIsOpen] = useState(false);
  const [text, setText] = useState("");
  let dispatch = useDispatch();
  



  async function removeCompany() {
    
    try {
      let url = `http://localhost:8080/company/${id}`;
      let response = await axios.delete(url);
      openRemoveCompanyModalIsOpen();
      dispatch({ type: ActionType.RemoveIndex, payload: { id:id, nameOfList:"company" } });
    } catch (e: any) {
      if (e.response?.data?.errorMessage) {
        alert(e.response.data.errorMessage);
      } else {
        alert("Failed to retrieve Company");
      }
    }

  }

  async function updateCompany() {
    
    let company = {id, name, address, phoneNumber };
    try {
      let response = await axios.put("http://localhost:8080/company", company);
      
      openSaveEditDetailsModalIsOpen();
      
    } catch (e: any) {
      if (e.response?.data?.errorMessage) {
        alert(e.response.data.errorMessage);
      } else {
        alert("Failed to retrieve Company");
      }
    }

  }

  function closeEditMode(){
    setEditClicked(false);
  }


  function openRemoveCompanyModalIsOpen() {
    setRemoveCompanyModalIsOpen(true);
  }

  const closeRemoveCompanyModalIsOpen = () => {
    setRemoveCompanyModalIsOpen(false);
  };

  function openUsersDetailsModalIsOpen() {
    setUsersDetailsModalIsOpen(true);
  }

  const closeUsersDetailsModalIsOpen = () => {
    setUsersDetailsModalIsOpen(false);
  };

  function openSaveEditDetailsModalIsOpen() {
    
    setSaveEditDetailsModalIsOpen(true);
    
    
  }

  const closeSaveEditDetailsModalIsOpen = () => {
    setSaveEditDetailsModalIsOpen(false);
    closeEditMode()
  };




  return (

    <tr >
      {!editClicked && <td>{name}</td>}
      {!editClicked && <td>{address}</td>}
      {!editClicked && <td>{phoneNumber}</td>}
      {editClicked && (
        <td>
          <input
            type="text"
            defaultValue={""+name}
            onChange={(event) => setName(event.target.value)}
          />
        </td>
      )}
      {editClicked && (
        <td>
          <input
            type="text"
            defaultValue={""+address}
            onChange={(event) => setAddress(event.target.value)}
          />
        </td>
      )}
      {editClicked && (
        <td>
          <input
            type="text"
            defaultValue={""+phoneNumber}
            onChange={(event) => setPhoneNumber(event.target.value)}
          />
        </td>
      )}
      <td>
        {editClicked ? (
          <div className="edit-buttons-container">
            <button className="save-button" onClick={()=>updateCompany()}>Save
            </button>
            <Modal
              className="modal"
              isOpen={saveEditDetailsModalIsOpen}
              onRequestClose={closeSaveEditDetailsModalIsOpen}
              contentLabel="Save edited details"
            >
               <ConfirmationModal title="Success!!" massage={"Company details update successfuly."} closeModel={() => closeSaveEditDetailsModalIsOpen()}/>
            </Modal>
            <button
              className="edit-button"
              onClick={() => closeEditMode()}
            >
              Cancel
            </button>
          </div>
        ) : (
          <div className="edit-buttons-container">
            <button

              className="edit-button"
              onClick={() => setEditClicked(true)}
            > Edit
            </button>
          </div>
        )}
      </td>
      <td>
        <div className="edit-buttons-container">
          <button
            className="edit-button"
            onClick={() => removeCompany()}
          > remove
          </button>
          <Modal
              className="modal"
              isOpen={removeCompanyModalIsOpen}
              onRequestClose={closeRemoveCompanyModalIsOpen}
              contentLabel="Save edited details"
            >
               <ConfirmationModal title="Success!!" massage={"Company removed successfuly."} closeModel={() => closeRemoveCompanyModalIsOpen()}/>
            </Modal>
        </div>
      </td>
      {/*<td>
        
          <div className="edit-buttons-container">
            <button
              className="edit-button"
              onClick={openUsersDetailsModalIsOpen}
            >
              Details
            </button>
            <Modal
                className="modal"
                isOpen={usersDetailsModalIsOpen}
                onRequestClose={closeUsersDetailsModalIsOpen}
                contentLabel="Customer details"
              >
                <CompanyUsersDetailsModal companyId={props.id} closeModel={() => closeUsersDetailsModalIsOpen()}/>
              </Modal>
          </div>
        
        </td> */}
    </tr>

  );
}


export default Company;
