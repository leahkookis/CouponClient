import { useDispatch, useSelector } from "react-redux";
import IUserData from "../../../../models/IUserData";
import { AppState } from "../../../../redux/app-state";
import { useEffect, useState } from "react";
import axios from "axios";
import { ActionType } from "../../../../redux/action-types";
import User from "./User/User";
import "./Users.css";
import Modal from 'react-modal';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import Company from "../Companies/company/Company";
import ICompanyData from "../../../../models/ICompanyData";
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody, MDBModal, MDBModalBody, MDBModalContent, MDBModalDialog, MDBModalFooter, MDBModalHeader, MDBModalTitle, MDBInput } from 'mdb-react-ui-kit';
import UpdateModal from "../../../ConfirmationModals/UpdateModal";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

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

Modal.setAppElement('#root');

function Users() {
  let loginData = useSelector((state: AppState) => state.token)
  let companies: ICompanyData[] = useSelector((state: AppState) => state.companiesData)
  const [id, setId] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyId, setCompanyId] = useState(0);
  let usersList: IUserData[] = useSelector((state: AppState) => state.users)
  let [pageNumber, setPageNumber] = useState(1);

  const [modalIsOpen, setIsOpen] = useState(false);
  const [text, setText] = useState("");
  let dispatch = useDispatch();
  let amountOfPage: number = 5;


  useEffect(() => {
    getAllCompanies(pageNumber, amountOfPage)
  }, [pageNumber]);

  useEffect(() => {
    getUsersByPage(pageNumber);
  }, [pageNumber]);

  async function getUsersByPage(pageNumber: number) {
    try {
      let url = `http://localhost:8080/users?page=${pageNumber}`;
      let response1 = await axios.get(url);
      let response = response1.data;

      dispatch({ type: ActionType.GetUsers, payload: { response } });
    } catch (e) {
      console.error(e);
      alert("Failed to retrieve users");
    }
  }
  async function getAllCompanies(pageNumber: number, amountOfPage: number) {
    try {

      let url = await axios.get(`http://localhost:8080/company?page=${pageNumber}`);
      let response = url.data;
      dispatch({ type: ActionType.GetCompanies, payload: { response } })

    } catch (error) {
      alert("something went wrong");

    }

  }



  async function addUser() {
    let user = {};
    if (userType == "admin") {
      user = { userName, password, userType };
    } else if (userType == "company") {
      user = { userName, password, userType, company: { id: companyId } };
    }
    try {
      const response = await axios.post("http://localhost:8080/users", user)
      closeModal()
      let newUser: IUserData = {
        id: response?.data,
        userName: userName,
        password: password,
        userType: userType

      }
      usersList.push(newUser);
      setAddUserOpen(true);
    }
    catch (e: any) {
      console.error(e);
      if (e.response?.data?.error?.message) {
        alert(e.response.data.error.message)
      } else {
        alert("failed to add user")
      }
    }
  };


  function openUserModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    setText("Enter a user:");
  }

  function closeModal() {
    setIsOpen(false);
  }
  const handleCompanySelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedCompany = +event.target.value;
    setCompanyId(selectedCompany);
  };



  let [addUserOpen, setAddUserOpen] = useState(false);

  function closeAddUserOpen() {
    setAddUserOpen(false);
  }


  return (
    <div>

      <button className="add-user-button" onClick={() => openUserModal()}>
        add user
      </button>
      <MDBModal
        show={modalIsOpen}

        setShow={setIsOpen}


      ><MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Add new user:</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={closeModal}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <div>
                
                <MDBInput label="User name" className="form-label" type="text" onChange={event => setUserName(event.target.value)}></MDBInput>
                <MDBInput label="Password" type="text" onChange={event => setPassword(event.target.value)} ></MDBInput>
              </div>
              
                
                <select aria-labelledby="Default select example" className="form-select sele" placeholder="User Type" id="dropdown" onChange={event => setUserType(event.target.value)}>
                <option>Select User Type</option>
                  <option value="admin">admin</option>
                  <option value="company">company</option>

                </select>
                
              
              
                
                <select aria-labelledby="Default select example" className="form-select sele"
                  id="companies"
                  onChange={handleCompanySelectChange}
                >
                  <option>Select Company</option>
                  {companies.map((comapny, index) => <option value={comapny.id}>{comapny.name}</option>)}
                  <option value="none">none</option>

                </select>
        
              

            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={addUser}>
                Save
              </MDBBtn>

            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>


      </MDBModal>
      <div className="users">
      <table >
  <thead>
            <tr>
              <th scope='col'>User name</th>
              <th scope='col'>User Type</th>
              <th scope='col'>Company</th>
              <th scope='col'>Actions</th>

            </tr>
          </thead >
          <tbody className="table-group-divider table-divider-color" color="none">

            {usersList.map((user, index) => (
              <User id={user.id} password={user.password} userName={user.userName} userType={user.userType} companyName={user.companyName} />
            ))}
          </tbody>
        </table>
      </div>
      <MDBModal
        className="modal"
        show={addUserOpen}
        setShow={setAddUserOpen}
      >
        <UpdateModal title="Success!!" massage={"User added successfully."} closeModel={() => closeAddUserOpen()} />
      </MDBModal>


    </div>
  );
}


export default Users;