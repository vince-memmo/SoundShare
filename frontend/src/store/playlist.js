import csrfFetch from '../store/csrf';

export const RECEIVE_PLAYLISTS = 'playlists/RECEIVE_PLAYLISTS';
export const RECEIVE_PLAYLIST = 'playlists/RECEIVE_PLAYLIST';
export const REMOVE_PLAYLIST = 'playlists/REMOVE_PLAYLIST';

const receivePlaylists = playlists => ({
    type: RECEIVE_PLAYLISTS,
    playlists
});
  
  const receivePlaylist = playlist => ({
    type: RECEIVE_PLAYLIST,
    playlist
  });
  
  const removePlaylist = playlistId => ({
    type: REMOVE_PLAYLIST,
    playlistId
  });

export const getPlaylists = state => {
  if (state.playlists) {
    return Object.values(state.playlists)
  } else {
    return []
  }
}

export const get5Playlists = state => {
  if (state.playlists) {
    return Object.values(state.playlists).slice(0,5)
  } else {
    return []
  }
}

export const getPlaylist = playlistId => state => {
  if (state.playlists[playlistId] )
  if (state.playlists) {
    return state.playlists[playlistId]
  } else {
    return null
  }
}

export const fetchPlaylists = () => async (dispatch) => {
    const response = await csrfFetch('/api/playlists');
    if (response.ok) {
      const playlists = await response.json();
      dispatch(receivePlaylists(playlists));
    }
}

export const fetchPlaylist = (playlistId) => async dispatch => {
  const response = await fetch(`/api/playlists/${playlistId}`)
  if (response.ok) {
      const playlist = await response.json()
      dispatch(receivePlaylist(playlist))
  }
}

export const fetchUserPlaylists = (playlistId) => async (dispatch) => {
  const response = await csrfFetch(`/api/users/${playlistId}/playlists`);
  if (response.ok) {
    const playlists = await response.json();
    dispatch(receivePlaylists(playlists));
  }
}

export const createPlaylist = playlist => async (dispatch) => { 
  const response = await csrfFetch(`/api/playlists/`, {
    method: 'POST',
    body: playlist
  });

  if (response.ok) {
    const newPlaylist = await response.json();
    dispatch(receivePlaylist(newPlaylist));
    return newPlaylist
  }
};

export const deletePlaylist = (playlistId) => async dispatch => {
  const response = await csrfFetch(`/api/playlists/${playlistId}`, {method: 'DELETE'})
  if (response.ok) {
    dispatch(removePlaylist(playlistId));
  }
}

const playlistsReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_PLAYLISTS:
      return { ...action.playlists };
    case RECEIVE_PLAYLIST:
      return { ...state, [action.playlist.id]: action.playlist };
    case REMOVE_PLAYLIST:
      const newState = { ...state };
      delete newState[action.playlistId];
      return newState;
    default:
      return state;
  }
}

export default playlistsReducer