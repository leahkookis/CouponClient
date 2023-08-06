import axios from "axios";
import { useState } from "react";
import './register.css';
import personplus from "../images/personplus.png"
import { useNavigate } from "react-router-dom";
import { MDBInput, MDBBtn } from "mdb-react-ui-kit";


function Register() {

    const navigate = useNavigate();
    let [userName, setUserName] = useState("");
    let [password, setPassword] = useState("");
    let [name, setName] = useState("");
    let [address, setAddress] = useState("");
    let [phoneNumber, setPhoneNumber] = useState("");
    let userType  ="customer";
    //let company = null;
  
  
    async function register() {
      try {
        
      const response = await axios.post("http://localhost:8080/customer", {user:{userName, password, userType}, name, address, phoneNumber });
      console.log("fff");
      navigate("/login");
        
      } catch (e) { }
    }
    return (
      <div className="login-main">
      <div className="login-sub-main">
        <div>
          <div className="imgs">
            <div className="container-image">
              <img src={personplus} alt="profile" className="profile" />
            </div>
          </div>
              
        <MDBInput label="Name" className="form-label" type="text" onChange={event => setName(event.target.value)} />
        <MDBInput label="Address" className="form-label" type="text" onChange={event => setAddress(event.target.value)} />
        <MDBInput label="Phone Number" className="form-label" type="text" onChange={event => setPhoneNumber(event.target.value)} />
        <MDBInput label="User Name" className="form-label" type="text" onChange={event => setUserName(event.target.value)} />

              <MDBInput label="Password" className="form-label" type="password" onChange={event => setPassword(event.target.value)} />
         
            
              <MDBBtn color='secondary' className='btn-lg'  onClick={register} >Submit</MDBBtn><br />

      </div>
      </div>
      </div>
    );
  }
  export default Register;