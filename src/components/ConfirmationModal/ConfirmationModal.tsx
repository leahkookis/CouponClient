import { useEffect, useState } from 'react';
import Modal from 'react-modal';
Modal.setAppElement('#root');

interface IConfirmModal{
  title:string, massage:string, closeModel(): void;
}

function ConfirmationModal(props: IConfirmModal) {
   
    
    
    return (
        <div className='confirmation'>

        <div className='title'>{props.title}</div>
        <div className='massage'>{props.massage}</div>
        <button className='close' onClick={() => props.closeModel()}>close</button>
      
        </div>
    );
    }
export default ConfirmationModal;