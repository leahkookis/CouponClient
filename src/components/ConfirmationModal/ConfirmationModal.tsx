import { useEffect, useState } from 'react';
import Modal from 'react-modal';
Modal.setAppElement('#root');

interface IConfirmModal {
  title: string, massage: string, closeModel(): void;
}

function ConfirmationModal(props: IConfirmModal) {



  return (
    <div className='confirmation'>
      <button className="button-close" onClick={() => props.closeModel()}>X</button>
      <div className='title'>{props.title}</div>
      <div className='massage'>{props.massage}</div>



    </div>
  );
}
export default ConfirmationModal;