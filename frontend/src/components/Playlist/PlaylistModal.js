import React, { useState } from 'react';
import { Modal } from '../../context/LoginModal';
import Playlists from '.';
import './PlaylistModal.css'

function PlaylistModal({trackId}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className=".three-dots-button" onClick={() => setShowModal(true)}></button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <Playlists trackId={trackId}/>
        </Modal>
      )}
    </>
  )
}

export default PlaylistModal;