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

import CompanyUsersDetailsModal from "../Company-users-details-modal/CompanyUsersDetailsModal";
import UpdateModal from "../../../../ConfirmationModals/UpdateModal";
import { MDBBtn, MDBIcon, MDBInput, MDBModal, MDBModalBody, MDBModalContent, MDBModalDialog, MDBModalFooter, MDBModalHeader, MDBModalTitle } from "mdb-react-ui-kit";
import DeleteModal from "../../../../ConfirmationModals/DeleteModal";



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
      setRemoveCompanyModalIsOpen(true);
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
          <MDBInput label='Name'
            type="text"
            defaultValue={""+name}
            onChange={(event) => setName(event.target.value)}
          />
        </td>
      )}
      {editClicked && (
        <td>
          <MDBInput label='Address'
            type="text"
            defaultValue={""+address}
            onChange={(event) => setAddress(event.target.value)}
          />
        </td>
      )}
      {editClicked && (
        <td>
          <MDBInput label='Phone Number'
            type="text"
            defaultValue={""+phoneNumber}
            onChange={(event) => setPhoneNumber(event.target.value)}
          />
        </td>
      )}
      <td>
      {editClicked ?(<div className="edit-buttons-container">
            <button className="btbt" onClick={() => updateCompany()}><MDBIcon  fas icon="paper-plane" />
            </button>

            <button className="btbt"

              onClick={() => setEditClicked(false)}
            >
              <MDBIcon fas icon="ban" />
            </button>
            <MDBModal show={saveEditDetailsModalIsOpen} setShow={setSaveEditDetailsModalIsOpen} tabIndex='-1'>

              <UpdateModal title="Success!!" massage={"Company details update successfuly."} closeModel={() => closeSaveEditDetailsModalIsOpen()} />

            </MDBModal>
          </div>
        ) : (
          <div className="edit-buttons-container">
            <button className="btbt" 
              onClick={() => setEditClicked(true)}
            > <MDBIcon far icon="edit" />
            </button>
            <button className="btbt " 
              

              onClick={() => removeCompany()}
            > <MDBIcon fas icon="trash" />
            </button>
            </div>)}
          <MDBModal
              
              show={removeCompanyModalIsOpen}
              setShow={setRemoveCompanyModalIsOpen}
              tabIndex='-1'
            >
               <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Success!!</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={closeRemoveCompanyModalIsOpen}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>Company removed successfuly.</MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={closeRemoveCompanyModalIsOpen}>
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


export default Company;
