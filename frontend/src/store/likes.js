import csrfFetch from '../store/csrf';

export const RECEIVELIKES = 'playlist_items/RECEIVELIKES';
export const RECEIVELIKE = 'playlists/RECEIVELIKE';
export const REMOVELIKE = 'playlists/REMOVELIKE';

const receiveLikes = (likes) => ({
    type: RECEIVELIKES,
    likes
});
  
  const receiveLike = (like) => ({
    type: RECEIVELIKE,
    like
  });
  
  const removeLike = (like) => ({
    type: REMOVELIKE,
    like
  });

  export const getLikes = state => {
    if (state.likes) {
      return Object.values(state.likes)
    } else {
      return []
    }
  }

  export const get3Likes = state => {
    if (state.likes) {
      return Object.values(state.likes).slice(0,3)
    } else {
      return []
    }
  }

  export const createLike = (userId, trackId) => async dispatch => {
    console.log('createLike')
    let res = await csrfFetch(`/api/likes`, {
        method: 'POST',
        body: JSON.stringify({
            like: {
                userId,
                trackId
            }
        })
    })
    if (res.ok) {
        const like = await res.json()
        dispatch(receiveLike(like))
    }
  }

  export const fetchUserLikes = (userId) => async (dispatch) => {
    const response = await csrfFetch(`/api/likes?user_id=${userId}`);
    if (response.ok) {
      const likes = await response.json();
      dispatch(receiveLikes(likes));
      return likes
    }
  }

  export const deletePlaylistItem = (userId, trackId) => async dispatch => {
    const response = await csrfFetch(`/api/likes/na`, {
      method: 'DELETE',
      body: JSON.stringify({
        like: {
            userId,
            trackId
        }
      })
    })
    if (response.ok) {
      // const likeId = await response.json()
      // dispatch(removeLike(likeId));
    }
  }

  ///api/likes?user_id=${userId}&track_id=${trackId}

// export const fetchPlaylistItems = (playlistId) => async dispatch => {
//     const response = await fetch(`/api/playlists/${playlistId}/playlist_items`)
//     if (response.ok) {
//         const playlistItems = await response.json()
//         dispatch(receivePlaylistItems(playlistItems))
//     }
// }

// export const fetchPlaylistItemsByTrackId = (trackId) => async dispatch => {
//   const response = await fetch(`/api/playlists/na/playlist_items?track_id=${trackId}`)
//   if (response.ok) {
//       const playlistItems = await response.json()
//       dispatch(receivePlaylistItems(playlistItems))
//   }
// }



const likesReducer = (state = {}, action) => {
    switch (action.type) {
      case RECEIVELIKES:
        return { ...action.likes };
      case RECEIVELIKE:
        return { ...state, [action.like.id]: action.like };
      case REMOVELIKE:
        const newState = { ...state };
        delete newState[action.like];
        return newState;
      default:
        return state;
    }
  }
  
  export default likesReducer