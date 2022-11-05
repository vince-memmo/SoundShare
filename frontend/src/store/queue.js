export const RECEIVE_QUEUE = 'queue/RECEIVE_QUEUE';
export const REMOVE_QUEUE = 'queue/REMOVE_QUEUE';

export const receiveQueue = (track, duration) => ({
    type: RECEIVE_QUEUE,
    track
    // : track,
    // duration: duration
});
  
export const removeQueue = trackId => ({
    type: REMOVE_QUEUE,
    trackId
});

export const getQueue = state => {
    if (state.queue) {
      return state.queue
    } else {
      return []
    }
}

export const getTrack = state => {
  if (state.queue) {
    return state.queue['track']
  } else {
    return []
  }
}

  const queueReducer = (state = {}, action) => {
      switch (action.type) {
          case RECEIVE_QUEUE:
            return { ...action.track};
        case REMOVE_QUEUE:
            const newState = {};
            return newState;
        default:
            return state;
    }
  }

  export default queueReducer