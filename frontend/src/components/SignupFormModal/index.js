import React, { useState } from 'react';
import { Modal } from '../../context/LoginModal';
import SignupForm from './SignupForm.js'
import './SignupForm';
import './SignupForm.css';


function SignupFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="signup-button" onClick={() => setShowModal(true)}>Create Account</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignupForm />
        </Modal>
      )}
    </>
  );
}

export default SignupFormModal;
