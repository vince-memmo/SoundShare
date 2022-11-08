import csrfFetch from '../store/csrf';

export const RECEIVEPLAYLISTITEMS = 'playlist_items/RECEIVEPLAYLIST_ITEMS';
export const RECEIVEPLAYLISTITEM = 'playlists/RECEIVEPLAYLIST_ITEM';
export const REMOVEPLAYLISTITEM = 'playlists/RECEMOVEPLAYLIST_ITEM';

const receivePlaylists = playlistItems => ({
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