import React, {useState} from 'react';
import Modal from '@material-ui/core/Modal';
import Styling from '../css/Styling'

const PopupModal = ({askLogin, setAskLogin}) => {

  function rand() {
    return Math.round(Math.random() * 20) - 10;
  }

  function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

  const [modalStyle] = useState(getModalStyle);
  const body = (
    <div style={modalStyle} className={Styling().paper}>
      <h2 id="simple-modal-title">Please Login or Signup</h2>
      <p id="simple-modal-description">
      </p>
    </div>
  );


  const handleClose = () => {
    setAskLogin(false);
  };
    
  return(
      <Modal
        open={askLogin}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
  )
}

export default PopupModal;