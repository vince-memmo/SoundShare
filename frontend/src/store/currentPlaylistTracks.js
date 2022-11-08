import csrfFetch from './csrf';

export const RECEIVE_CURRENTPLAYLISTTRACKS = 'playlists/RECEIVE_CURRENTPLAYLISTTRACKS';
export const RECEIVE_CURRENTPLAYLISTTRACK = 'playlists/RECEIVE_CURRENTPLAYLISTTRACK';
export const REMOVE_CURRENTPLAYLISTTRACKS = 'playlists/REMOVE_CURRENTPLAYLISTTRACKS';

export const receiveCurrentPlaylistTracks = tracks => ({
    type: RECEIVE_CURRENTPLAYLISTTRACKS,
    tracks
});
  
export const receiveCurrentPlaylistTrack = track => ({
  type: RECEIVE_CURRENTPLAYLISTTRACK,
  track
});
  
export const removeCurrentPlaylistTrack = () => ({
  type: REMOVE_CURRENTPLAYLISTTRACKS
});

const currentPlaylistTracksReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_CURRENTPLAYLISTTRACKS:
      return { ...action.playlists };
    case RECEIVE_CURRENTPLAYLISTTRACK:
      return { ...state, [action.track.id]: action.track };
    case REMOVE_CURRENTPLAYLISTTRACKS:
      const newState = { ...state };
      return newState;
    default:
      return state;
  }
}

export default currentPlaylistTracksReducer