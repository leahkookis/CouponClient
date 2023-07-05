import { useState } from 'react';
import Modal from 'react-modal';
Modal.setAppElement('#root');

function ConfirmationModal() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const openModal = () => {
        setModalIsOpen(true);
      };
    
      const closeModal = () => {
        setModalIsOpen(false);
      };
    
    
    return (
        <div>
  <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // צבע הרקע של המודל
            zIndex: 1000 // מיקום המודל מעל אלמנטים אחרים בדף
          },
          content: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '300px',
            height: '200px',
            margin: 'auto',
            backgroundColor: 'white', // צבע הרקע של תיבת ההודעה
            borderRadius: '8px'
          }
        }}
      >
        <p> user created Successfully  </p>
        <button onClick={closeModal}>close</button>
      </Modal>
        </div>
    );
    }
export default ConfirmationModal;