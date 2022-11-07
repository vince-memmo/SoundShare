import React, { useState } from 'react';
import { Modal } from '../../context/LoginModal';
import Playlists from '.';
import '../LoginFormModal'

function PlaylistModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="login-button" onClick={() => setShowModal(true)}>Add To Playlist</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <Playlists />
        </Modal>
      )}
    </>
  )
}

export default PlaylistModal;