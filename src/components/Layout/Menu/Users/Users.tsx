import { useDispatch, useSelector } from "react-redux";
import IUserData from "../../../../models/IUserData";
import { AppState } from "../../../../redux/app-state";
import { useEffect, useState } from "react";
import axios from "axios";
import { ActionType } from "../../../../redux/action-types";
import User from "./User/User";
import "./Users.css";
import Modal from 'react-modal';
import ConfirmationModal from "../../../ConfirmationModal/ConfirmationModal";
import Company from "../../../company/Company";


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

  let companies= useSelector((state: AppState)=> state.companiesData)
  const [id, setId] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("admin");
  const [companyName, setCompanyName] = useState(companies[0].name);
  const [companyId, setCompanyId] = useState(0);
  let [usersList, setUsersList] = useState<IUserData[]>([]);
  let [pageNumber, setPageNumber] = useState(1);
  
    const [modalIsOpen, setIsOpen] = useState(false);
    const [text, setText] = useState("");
    let dispatch = useDispatch();
    let amountOfPage: number = 5;

  
      useEffect(()=> {
        getAllCompanies(pageNumber,amountOfPage)
    }, [pageNumber]);

  useEffect(() => {
    getUsersByPage(pageNumber);
  }, [pageNumber]);

  async function getUsersByPage(pageNumber: number) {
    try {
      let url = `http://localhost:8080/users?page=${pageNumber}`;
      let response = await axios.get(url);
      let users = response.data;
      setUsersList(users);
    } catch (e) {
      console.error(e);
      alert("Failed to retrieve users");
    }
  }
async function getAllCompanies(pageNumber: number, amountOfPage: number){
        try {
           
            let url= await axios.get(`http://localhost:8080/company?page=${pageNumber}`);
            let response = url.data;
            dispatch({type: ActionType.GetCompanies, payload: {response}})

        } catch (error) {
            alert("something went wrong");
            
        }
        
     }

        
    
    async function addUser() {
      let user = {};
    if (userType == "admin") {
      user = { userName, password, userType};
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



let [addUserOpen, setAddUserOpen]=useState(false);
let [removeUserOpen, setRemoveUserOpen] = useState(false);
let [updateUserOpen, setUpdateUserOpen] = useState(false);
function closeAddUserOpen(){
  setAddUserOpen(false);
}
function closeRemoveUserOpen(){
  setRemoveUserOpen(false);
}
function closeUpdateUserOpen(){
  setUpdateUserOpen(false);
}

  return (
    <div>
  
            <button className= "add-user-button" onClick={() =>openUserModal()}>
                add user
            </button>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
            <div>
                <label>User Name: </label>
                <input type="text" onChange={event => setUserName(event.target.value)}></input>
                <label>Password: </label><input type="text" onChange={event => setPassword(event.target.value)} ></input>
                </div>
                <div>
                    <label htmlFor="dropdown">User Type</label>
                    <select id="dropdown" onChange={event => setUserType(event.target.value)}>
                        <option value="admin">admin</option>
                        <option value="company">company</option>

                    </select>
                </div>
                <div>
                    <label>Compnay: </label>
                    <select
                        id="companies"
                        onChange={handleCompanySelectChange}
                    >
                        {companies.map((comapny, index) => <option value={comapny.id}>{comapny.name}</option>)}
                        <option value="none">none</option>

                    </select>
                    <button onClick={()=> addUser()}>Save</button>

                </div>
                </Modal>
                <div className="users">
      <table>
        <tr>
          <th>User name</th>
          <th>User Type</th>
          <th>Company</th>
          <th>Edit</th>
          <th>Remove</th>
        </tr>
        
        {usersList.map((user) => (
          <User id={user.id} password={user.password} userName={user.userName} userType={user.userType}  companyName={user.companyName}/>
        ))}
       
      </table>
    </div>
    <Modal
                className="modal"
                isOpen={addUserOpen}
                onRequestClose={closeAddUserOpen}
                >
                <ConfirmationModal title="success to buy" massage={"congrutotation!!! success to buy coupon" }  closeModel={() => closeAddUserOpen()}/>
              </Modal>
              <Modal
                className="modal"
                isOpen={updateUserOpen}
                onRequestClose={closeUpdateUserOpen}
                >
                <ConfirmationModal title="success to buy" massage={"congrutotation!!! success to buy coupon" }  closeModel={() => closeUpdateUserOpen()}/>
              </Modal>
              <Modal
                className="modal"
                isOpen={removeUserOpen}
                onRequestClose={closeRemoveUserOpen}
                >
                <ConfirmationModal title="success to buy" massage={"congrutotation!!! success to buy coupon"}  closeModel={() => closeRemoveUserOpen()}/>
              </Modal>
        
    </div>
  );
}


export default Users;