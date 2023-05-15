import axios from "axios";
import { useState } from "react";
import './register.css';
import personplus from "../images/personplus.png"


function App() {

    let [userName, setUserName] = useState("");
    let [password, setPassword] = useState("");
    let [name, setName] = useState("");
    let [address, setAddress] = useState("");
    let [phoneNumber, setPhoneNumber] = useState("");
    let userType  ="customer";
    //let company = null;
  
  
    async function register() {
      try {
        const response = await axios.post("http://localhost:8080/customer", {user:{userName, password}, name, address, phoneNumber });
        console.error(response);
      } catch (e) { }
    }
    return (
        <div className="main">
        <div className="sub-main-reg">
            

        <div className='registerForm'>
        <div>
        <div className="imgs-reg">
        <div className="container-image-reg">
              <img src={personplus} alt="personplus" className="personplus" />
    
            </div>
        
            </div>
        <h2>Sign Up</h2>
        </div>
        <div className="all-inputs">
        <input className='input-reg' type="text" placeholder="Name" onChange={event => setName(event.target.value)} /><br />
        <input className='input-reg'type="text" placeholder="Adress" onChange={event => setAddress(event.target.value)} /><br />
        <input className='input-reg'type="text" placeholder="Phone Number" onChange={event => setPhoneNumber(event.target.value)} /><br />
        <input className='input-reg'type="text" placeholder="User name" onChange={event => setUserName(event.target.value)} /><br />
        <input className='input-reg'type="password" placeholder="Password" onChange={event => setPassword(event.target.value)} /><br />
        <input className='sumbit'type="button" value="Submit" onClick={register} />
        </div>
        </div>
      </div>
      </div>
    );
  }
  export default App;