import React, {useState} from 'react';
import Modal from '@material-ui/core/Modal';
import Styling from '../css/Styling'
import { useHistory } from 'react-router-dom';

const PopupModal = ({askLogin, setAskLogin}) => {

  function rand() {
    return Math.round(Math.random() * 20) - 10;
  }
  let history = useHistory();
  function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

  const handleDirectLogin = () => {
    history.push(`/login`)
  }
  const handleDirectSign = () => {
    history.push(`/signup`)
  }
  const [modalStyle] = useState(getModalStyle);
  const body = (
    <div style={modalStyle} className={Styling().paper}>

      <div id="simple-modal-title">
        <p>Please log in or signup to save properties</p>
        <div className="mouse-click" onClick={handleDirectLogin}>Login</div>
        <div className="mouse-click" onClick={handleDirectSign}>Sign up</div>
      </div>
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