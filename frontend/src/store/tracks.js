import csrfFetch from '../store/csrf';
import { receiveCurrentPlaylistTrack } from './currentPlaylistTracks';

export const RECEIVE_TRACKS = 'tracks/RECEIVE_TRACKS';
export const RECEIVE_TRACK = 'tracks/RECEIVE_TRACK';
export const REMOVE_TRACK = 'tracks/REMOVE_TRACK';

const receiveTracks = tracks => ({
    type: RECEIVE_TRACKS,
    tracks
});
  
  const receiveTrack = track => ({
    type: RECEIVE_TRACK,
    track
  });
  
  const removeTrack = trackId => ({
    type: REMOVE_TRACK,
    trackId
  });

export const getTracks = state => {
  if (state.tracks) {
    return Object.values(state.tracks)
  } else {
    return []
  }
}

export const get8Tracks = state => {
  if (state.tracks) {
    return Object.values(state.tracks).slice(0,8)
  } else {
    return []
  }
}

export const getTrack = trackId => state => {
  if (state.tracks[trackId] )
  if (state.tracks) {
    return state.tracks[trackId]
  } else {
    return null
  }
}

export const fetchTracks = () => async (dispatch) => {
    const response = await csrfFetch('/api/tracks');
    if (response.ok) {
      const tracks = await response.json();
      dispatch(receiveTracks(tracks));
    }
}

export const fetchTrack = (trackId) => async dispatch => {
  const response = await fetch(`/api/tracks/${trackId}`)
  if (response.ok) {
      const track = await response.json()
      dispatch(receiveTrack(track))
  }
}

export const fetchTrackForPlaylist = (trackId, playlistItemId) => async dispatch => {
  const response = await fetch(`/api/tracks/${trackId}`)
  if (response.ok) {
    const track = await response.json()
      dispatch(receiveCurrentPlaylistTrack(track, playlistItemId))
  }
}

export const fetchUserTracks = (userId) => async (dispatch) => {
  const response = await csrfFetch(`/api/users/${userId}/tracks`);
  if (response.ok) {
    const tracks = await response.json();
    dispatch(receiveTracks(tracks));
  }
}

export const createTrack = track => async (dispatch) => { 
  const response = await csrfFetch(`/api/tracks/`, {
    method: 'POST',
    body: track
  });

  if (response.ok) {
    const newTrack = await response.json();
    dispatch(receiveTrack(newTrack));
    return newTrack
  }
};

export const updateTrack = (track, trackId) => async (dispatch) => { 
  const response = await csrfFetch(`/api/tracks/${trackId}`, {
    method: 'PATCH',
    body: track
  });

  if (response.ok) {
    const newTrack = await response.json();
    dispatch(receiveTrack(newTrack));
    return newTrack
  }
};

export const deleteTrack = (trackId) => async dispatch => {
  const response = await csrfFetch(`/api/tracks/${trackId}`, {method: 'DELETE'})
  if (response.ok) {
    dispatch(removeTrack(trackId));
  }
}

const tracksReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_TRACKS:
      return { ...action.tracks };
    case RECEIVE_TRACK:
      return { ...state, [action.track.id]: action.track };
    case REMOVE_TRACK:
      const newState = { ...state };
      delete newState[action.trackId];
      return newState;
    default:
      return state;
  }
}

export default tracksReducer