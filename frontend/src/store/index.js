import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import session from './sessionReducer'
import tracksReducer from './tracks'
import queueReducer from './queue'
import playingReducer from './playing'
import progClickReducer from './progClick'
import durationReducer from './duration'
import playlistsReducer from './playlist'
import playlistItemsReducer from './playlist_items'
import currentPlaylistTracksReducer from './currentPlaylistTracks'
import currentTimeReducer from './currentTime'
import likesReducer from './likes'
import usersReducer from './users'

const rootReducer = combineReducers ({
    session,
    tracks: tracksReducer,
    queue: queueReducer,
    playing: playingReducer,
    progClick: progClickReducer,
    duration: durationReducer,
    playlists: playlistsReducer,
    playlistItems: playlistItemsReducer,
    currentPlaylistTracks: currentPlaylistTracksReducer,
    currentTime: currentTimeReducer,
    likes: likesReducer,
    users: usersReducer
})

let enhancer;

if (process.env.NODE_ENV === 'production') {
    enhancer = applyMiddleware(thunk);
  } else {
    const logger = require('redux-logger').default;
    const composeEnhancers =
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
  }

  const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer)
  }

export default configureStore