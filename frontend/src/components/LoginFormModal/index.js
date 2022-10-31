import React, { useState } from 'react';
import { Modal } from '../../context/LoginModal';
import LoginForm from './LoginForm';
import './LoginForm.css';

function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="login-button" onClick={() => setShowModal(true)}>Sign In</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm />
        </Modal>
      )}
    </>
  )
}

export default LoginFormModal;