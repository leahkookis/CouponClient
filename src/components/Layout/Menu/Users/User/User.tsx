import { useEffect, useState } from "react";
import IUserData from "../../../../../models/IUserData";
import axios from "axios";
import Companies from "../../Companies/Companies";
import { ModifierFlags } from "typescript";
import Modal from 'react-modal';
import { ActionType } from "../../../../../redux/action-types";
import { useDispatch, useSelector } from "react-redux";
import "./User.css";
import UpdateModal from "../../../../ConfirmationModals/UpdateModal";
import CustomerDetailsModal from "../../customer-details-modal/CustomerDetailsModal";
import { MDBBtn, MDBIcon, MDBInput, MDBModal, MDBModalBody, MDBModalContent, MDBModalDialog, MDBModalFooter, MDBModalHeader, MDBModalTitle } from "mdb-react-ui-kit";
import DeleteModal from "../../../../ConfirmationModals/DeleteModal";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import DetailsModal from "../../../../ConfirmationModals/DetailsModal";
import { MDBBadge, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { AppState } from "../../../../../redux/app-state";
import ICompanyData from "../../../../../models/ICompanyData";



Modal.setAppElement('#root');

function User(props: IUserData) {
  let [pageNumber, setPageNumber] = useState(1);
  let amountOfPage: number = 5;
  const [id, setId] = useState(props.id);
  const [userName, setUserName] = useState(props.userName);
  const [password, setPassword] = useState(props.password);
  const [userType, setUserType] = useState(props.userType);
  const [companyName, setCompanyName] = useState(props.companyName);
  const [companyId, setCompanyId] = useState(props.companyId);
  const [removeUserModalIsOpen, setRemoveUserModalIsOpen] = useState(false);
  const [customerDetailsModalIsOpen, setCustomerDetailsModalIsOpen] = useState(false);
  const [saveEditDetailsModalIsOpen, setSaveEditDetailsModalIsOpen] = useState(false);
  const [editClicked, setEditClicked] = useState(false);
  let companies: ICompanyData[] = useSelector((state: AppState) => state.companiesData)
  const [modalIsOpen, setIsOpen] = useState(false);
  const [text, setText] = useState("");
  let dispatch = useDispatch();
  let [usersList, setUsersList] = useState<IUserData[]>([]);



  async function removeUser() {

    try {
      let url = `http://localhost:8080/users/${id}`;
      let response = await axios.delete(url);
      setRemoveUserModalIsOpen(true);
      dispatch({ type: ActionType.RemoveIndex, payload: { id: id, nameOfList: "users" } });
    } catch (e: any) {
      if (e.response?.data?.errorMessage) {
        alert(e.response.data.errorMessage);
      } else {
        alert("Failed to retrieve user");
      }
    }

  }

  async function updateUser() {

    let user = { id, userName, password, userType };
    try {
      let response = await axios.put("http://localhost:8080/users", user);

      openSaveEditDetailsModalIsOpen();
    } catch (e: any) {
      if (e.response?.data?.errorMessage) {
        alert(e.response.data.errorMessage);
      } else {
        alert("Failed to retrieve user");
      }
    }

  }

  function closeEditMode() {
    setEditClicked(false);
  }


  function openRemoveUserModalIsOpen() {
    setRemoveUserModalIsOpen(!removeUserModalIsOpen);
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
    closeEditMode()
  };


  const handleCompanySelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedCompany = +event.target.value;
    setCompanyId(selectedCompany);
  };

  return (

    <tr >

      {!editClicked && <td>{userName}</td>}
      {!editClicked && <td>{userType}</td>}
      {!editClicked && <td>{companyName}</td>}
      {editClicked && (
        <td>
          <MDBInput label='User Name'
            type="text"
            defaultValue={userName}
            onChange={(event) => setUserName(event.target.value)}
          />
        </td>
      )}
      {editClicked && (
        <td>
          <MDBInput label='Type'
            type="text"
            defaultValue={userType}
            onChange={(event) => setUserType(event.target.value)}
          />
        </td>
      )}
      {editClicked && (
        <td >
          <select aria-labelledby="Default select example" className="form-select sele"
                  id="companies"
                  onChange={handleCompanySelectChange}
                >
                  <option>Select Company</option>
                  {companies.map((comapny, index) => <option value={comapny.id}>{comapny.name}</option>)}
                  <option value="none">none</option>

                </select>
        </td>
      )}
      <td>
        {editClicked ? (
          <div className="edit-buttons-container">
            <button className="btbt" onClick={() => updateUser()}><MDBIcon  fas icon="paper-plane" />
            </button>

            <button className="btbt"

              onClick={() => setEditClicked(false)}
            >
              <MDBIcon fas icon="ban" />
            </button>
            <MDBModal show={saveEditDetailsModalIsOpen} setShow={setSaveEditDetailsModalIsOpen} tabIndex='-1'>

              <UpdateModal title="Success!!" massage={"User details update successfuly."} closeModel={() => closeSaveEditDetailsModalIsOpen()} />

            </MDBModal>
          </div>
        ) : (
          <div className="edit-buttons-container">
            <button className="btbt"
              onClick={() => setEditClicked(true)}
            > <MDBIcon far icon="edit" />
            </button>
            <button className="btbt"
              disabled={userType == "customer"}

              onClick={() => removeUser()}
            > <MDBIcon fas icon="trash" />
            </button>
            <MDBModal show={removeUserModalIsOpen} setShow={setRemoveUserModalIsOpen} tabIndex='-1'>
            <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Success!!</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={closeRemoveUserModalIsOpen}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>User removed successfuly.</MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={closeRemoveUserModalIsOpen}>
                Close
              </MDBBtn>
              
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
              
            </MDBModal>
          </div>
        )}
      </td>

      
    </tr>

  );
}


export default User;

