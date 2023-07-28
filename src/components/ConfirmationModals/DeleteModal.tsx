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
Modal.setAppElement('#root');

interface IConfirmModal {
  title: string, massage: string, closeModel(): void;
}

function DeleteModal(props: IConfirmModal) {
  const [basicModal, setBasicModal] = useState(true);

  const toggleShow = () => setBasicModal(!basicModal);





return (
  <>
 
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>{props.title}</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={props.closeModel}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>{props.massage}</MDBModalBody>

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
export default DeleteModal;