import csrfFetch from '../store/csrf';

export const RECEIVEPLAYLISTITEMS = 'playlist_items/RECEIVEPLAYLIST_ITEMS';
export const RECEIVEPLAYLISTITEM = 'playlists/RECEIVEPLAYLIST_ITEM';
export const REMOVEPLAYLISTITEM = 'playlists/RECEMOVEPLAYLIST_ITEM';

const receivePlaylistItems = playlistItems => ({
    type: RECEIVEPLAYLISTITEMS,
    playlistItems
});
  
  const receivePlaylist = playlistItem => ({
    type: RECEIVEPLAYLISTITEM,
    playlistItem
  });
  
  const removePlaylist = playlistItemId => ({
    type: REMOVEPLAYLISTITEM,
    playlistItemId
  });

  export const createPlaylistItem = (playlistId, trackId) => async dispatch => {
    let res = await csrfFetch('/api/playlist_items', {
        method: 'POST',
        body: JSON.stringify({
            playlist_item: {
            playlistId,
            trackId
            }
        })
    })
}

export const fetchPlaylistItems = (playlistId) => async dispatch => {
    const response = await fetch(`/api/playlists/${playlistId}/playlist_items`)
    if (response.ok) {
        const playlistItems = await response.json()
        dispatch(receivePlaylistItems(playlistItems))
    }
}

export const fetchPlaylistItemsByTrackId = (trackId) => async dispatch => {
  const response = await fetch(`/api/playlists/na/playlist_items?track_id=${trackId}`)
  if (response.ok) {
      const playlistItems = await response.json()
      dispatch(receivePlaylistItems(playlistItems))
  }
}

export const deletePlaylistItem = (trackId, playlistId) => async dispatch => {
    const response = await csrfFetch(`/api/playlist_items/${trackId}?playlist_id=${playlistId}`, {method: 'DELETE'})
    if (response.ok) {
      dispatch(removePlaylist(trackId));
    }
}

const playlistItemsReducer = (state = {}, action) => {
    switch (action.type) {
      case RECEIVEPLAYLISTITEMS:
        return { ...action.playlistItems };
      case RECEIVEPLAYLISTITEM:
        return { ...state, [action.playlistItem.id]: action.playlistItem };
      case REMOVEPLAYLISTITEM:
        const newState = { ...state };
        delete newState[action.playlistItem];
        return newState;
      default:
        return state;
    }
  }
  
  export default playlistItemsReducer