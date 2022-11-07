import React, { useState } from 'react';
import { Modal } from '../../context/LoginModal';
import SignupForm from './SignupForm.js'
import './SignupForm';
import './SignupForm.css';


function SignupTodayModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="signup-today" onClick={() => setShowModal(true)}>Start Uploading Today</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignupForm />
        </Modal>
      )}
    </>
  );
}

export default SignupTodayModal;