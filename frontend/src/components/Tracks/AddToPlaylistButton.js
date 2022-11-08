// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from 'react-redux';
// import * as sessionActions from '../../store/sessionReducer';
// import { Link } from "react-router-dom";
// import { Redirect } from "react-router-dom";
// import  './AddToPlaylistButton.css'
// import { useHistory } from "react-router-dom";
// import PlaylistModal from "../Playlist/PlaylistModal";


// function AddToPlaylistButton() {
//   const history = useHistory()
//   const dispatch = useDispatch();
//   const [showMenu, setShowMenu] = useState(false);
//   const sessionUser = useSelector(state => state.session.user);
//   const user_id = sessionUser.id
  
//   const openMenu = () => {
//     if (showMenu) return;
//     setShowMenu(true);
//   };
  
//   useEffect(() => {
//     if (!showMenu) return;

//     const closeMenu = () => {
//       setShowMenu(false);   
//     };
//     document.addEventListener('click', closeMenu);
    
//     return () => document.removeEventListener("click", closeMenu);
//     }, [showMenu]);

//     const goToPlaylists = () => {
//         console.log('add to playlist')
//     }

//   return (
//     <div className="menu-container">
//       <div className="three-dots-button" onClick={openMenu}>
//       {showMenu && (
//           <div>
//             <PlaylistModal />
//           </div>
//       )}
//       </div>
//     </div>
//   );
// }

// export default AddToPlaylistButton;