import { useEffect, useState } from "react";
import IUserData from "../../../../../models/IUserData";
import axios from "axios";
import Companies from "../../../Companies/Companies";
import { ModifierFlags } from "typescript";
import Modal from 'react-modal';
import { ActionType } from "../../../../../redux/action-types";
import { useDispatch } from "react-redux";
import "./User.css";


Modal.setAppElement('#root');

function User(props: IUserData) {
    let[pageNumber, setPageNumber]  = useState(1);
    let amountOfPage: number = 5;
    const [id, setId] = useState(props.id);
    const [userName, setUserName] = useState(props.userName);
    const [password, setPassword] = useState(props.password);
    const [userType, setUserType] = useState(props.userType);
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



    async function removeUser() {
        if(userType!="customer"){
        try {
            let url = `http://localhost:8080/users/${id}`;
            let response = await axios.delete(url);
        } catch (e: any) {
            if (e.response?.data?.errorMessage) {
                alert(e.response.data.errorMessage);
            } else {
                alert("Failed to retrieve user");
            }
        }
    } else{
        try {
            let url = `http://localhost:8080/customer/${id}`;
            let response = await axios.delete(url);
        } catch (e: any) {
            if (e.response?.data?.errorMessage) {
                alert(e.response.data.errorMessage);
            } else {
                alert("Failed to retrieve customer");
            }
        }

    }
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
                    {!editClicked && <td>{userName}</td>}
                    {!editClicked && <td>{userType}</td>}
                    {!editClicked && <td>{companyName}</td>}                  
                    {editClicked && (
        <td>
          <input
            type="text"
            defaultValue={userName}
            onChange={(event) => setUserName(event.target.value)}
          />
        </td>
      )}
      {editClicked && (
        <td>
          <input
            type="text"
            defaultValue={userType}
            onChange={(event) => setUserType(event.target.value)}
          />
        </td>
      )}
      {editClicked && (
        <td>
          <input
            type="text"
            defaultValue={companyName}
            onChange={(event) => setCompanyName(event.target.value)}
          />
        </td>
      )}
      <td>
        {editClicked ? (
          <div className="edit-buttons-container">
            <button className="save-button" onClick={openSaveEditDetailsModalIsOpen}>cancle
            </button>
            <Modal
                className="modal"
                isOpen={saveEditDetailsModalIsOpen}
                onRequestClose={closeSaveEditDetailsModalIsOpen}
                contentLabel="Save edited details"
              >
                {/* <ConfirmationModal message={"Are you sure you want to save?"} action={() => null} closeModel={() => closeSaveEditDetailsModalIsOpen()}/> */}
              </Modal>
            <button
              className="edit-button"
              onClick={() => setEditClicked(!editClicked)}
            >
              {/* <FaRegWindowClose className="icon" /> */}
            </button>
          </div>
        ) : (
          <div className="edit-buttons-container">
            <button
            
              className="edit-button"
              onClick={() => setEditClicked(!editClicked)}
            > edit
            </button>
          </div>
        )}
      </td>
      <td>
        <div className="edit-buttons-container">
          <button
            className="edit-button"
            onClick={() =>removeUser()}
          > remove
          </button>
          
        </div>
      </td>
      {/* <td>
        {userType == "CUSTOMER" && (
          <div className="edit-buttons-container">
            <button
              className="edit-button"
              onClick={openCustomerDetailsModalIsOpen}
            >
              <TbListDetails className="icon" />
            </button>
            <Modal
                className="modal"
                isOpen={customerDetailsModalIsOpen}
                onRequestClose={closeCustomerDetailsModalIsOpen}
                contentLabel="Customer details"
              >
                <CustomerDetailsModal customerId={id} closeModel={() => closeCustomerDetailsModalIsOpen()}/>
              </Modal>
          </div>
        )}
      </td> */}
    </tr>
                
);
    
            }
                export default User;

