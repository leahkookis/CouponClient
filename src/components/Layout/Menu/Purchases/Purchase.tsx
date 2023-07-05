import { useEffect, useState } from "react";
import axios from "axios";
import { ModifierFlags } from "typescript";
import Modal from 'react-modal';
import { useDispatch } from "react-redux";
import "./Purchase.css";
import IPurchaseData from "../../../../models/IPurchaseData";


Modal.setAppElement('#root');

function User(props: IPurchaseData) {
    let[pageNumber, setPageNumber]  = useState(1);
    let amountOfPage: number = 5;
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [couponName, setCouponName] = useState('');
    const [categoryName, setCategoryName] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [companyId, setCompanyId] = useState(1);
    const [categoryId, setCategoryId] = useState(1);
    const [amount, setAmount] = useState(0);
    const [timeStamp, setTimeStamp] = useState('');
    const [removeUserModalIsOpen, setRemoveUserModalIsOpen] = useState(false);
    const [customerDetailsModalIsOpen, setCustomerDetailsModalIsOpen] = useState(false);
    const [saveEditDetailsModalIsOpen, setSaveEditDetailsModalIsOpen] = useState(false);
    const [editClicked, setEditClicked] = useState(false);
    let companies: any[] = [];
    const [modalIsOpen, setIsOpen] = useState(false);
    const [text, setText] = useState("");
    let dispatch = useDispatch();
    let [purchasesList, setPurchasesList] = useState<IPurchaseData[]>([]);



    async function removePurchase() {
        try {
            let url = `http://localhost:8080/purchase/${id}`;
            let response = await axios.delete(url);
        } catch (e: any) {
            if (e.response?.data?.errorMessage) {
                alert(e.response.data.errorMessage);
            } else {
                alert("Failed to delete purchase");
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
                    {!editClicked && <td>{name}</td>}
                    {!editClicked && <td>{couponName}</td>}
                    {!editClicked && <td>{categoryName}</td>}  
                    {!editClicked && <td>{companyName}</td>}                  
                    {!editClicked && <td>{amount}</td>}                  
                    {!editClicked && <td>{timeStamp}</td>}                  
                    {editClicked && (
        <td>
          <input
            type="text"
            defaultValue={name}
            onChange={(event) => setName(event.target.value)}
          />
        </td>
      )}
      {editClicked && (
        <td>
          <input
            type="text"
            defaultValue={couponName}
            onChange={(event) => setCouponName(event.target.value)}
          />
        </td>
      )}
      {editClicked && (
        <td>
          <input
            type="text"
            defaultValue={categoryName}
            onChange={(event) => setCategoryName(event.target.value)}
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
          <input
            type="text"
            defaultValue={amount}
            onChange={(event) => setAmount(+event.target.value)}
          />
        </td>
          <td>
          <input
            type="date"
            defaultValue={timeStamp}
            onChange={(event) => setTimeStamp(event.target.value)}
          />
        </td>
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
            onClick={() =>removePurchase()}
          > remove
          </button>
          
        </div>
      </td>
      <td>
        {companyName == "CUSTOMER" && (
          <div className="edit-buttons-container">
            <button
              className="edit-button"
              onClick={openCustomerDetailsModalIsOpen}
            >
              {/* <TbListDetails className="icon" /> */}
            </button>
            <Modal
                className="modal"
                isOpen={customerDetailsModalIsOpen}
                onRequestClose={closeCustomerDetailsModalIsOpen}
                contentLabel="Customer details"
              >
                {/* <CustomerDetailsModal customerId={id} closeModel={() => closeCustomerDetailsModalIsOpen()}/> */}
              </Modal>
          </div>
        )}
      </td>
    </tr>
                
);
    
            }
                export default User;

