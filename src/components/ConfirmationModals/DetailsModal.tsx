import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import axios from "axios";
import ICustomerData from "../../models/ICustomerData";
Modal.setAppElement('#root');

interface ICustomerDetailsModal{
  customerId : number;
  closeModel(): void;
  };

function DetailsModal(props:ICustomerDetailsModal) {
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


  const [basicModal, setBasicModal] = useState(true);

  const toggleShow = () => setBasicModal(!basicModal);





return (
  <>
    
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Customer Details</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={props.closeModel}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody><ul>
              <li>Name: {customer.name}</li>
              
              <li>Phone number: {customer.phoneNumber}</li>
              <li>Address: {customer.address}</li>
        </ul></MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={props.closeModel}>
                Close
              </MDBBtn>
              
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      
  </>


    
  );
}
export default DetailsModal;