import axios from "axios";
import { useState, useEffect } from "react";

import "./CustomerDetailsModal.css";
import ICustomerData from "../../../../../models/ICustomerData";



interface ICustomerDetailsModal{
    customerId : number;
    closeModel(): void;
    };

function CustomerDetailsModal(props:ICustomerDetailsModal) {
    let [customer, setCustomer] = useState<ICustomerData>({
        id: 0,
      name: "" ,
    
        phoneNumber:"",
        address:""
    });


    useEffect(() => {
      getCustomer();
    }, []);
  
    async function getCustomer() {
      try {
        let url = `http://localhost:8080/customer/${props.customerId}`;
        let response = await axios.get(url);
        let customerDto = response.data;
        setCustomer(customerDto);
      } catch (e) {
        console.error(e);
        alert("Failed to retrieve coupons");
      }
    }

  return (
    <div className="customer-details">
        <div className="buttons">
            <button onClick={() => props.closeModel()}>X</button>
        </div>
        <ul>
              <li>Name: {customer.name}</li>
              
              <li>Phone number: {customer.phoneNumber}</li>
              <li>Address: {customer.address}</li>
        </ul>
    </div>
  )
}

export default CustomerDetailsModal