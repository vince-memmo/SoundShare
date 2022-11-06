export const RECEIVE_DURATION = 'duration/RECEIVE_DURATION';

export const receiveDuration = duration => ({
    type: RECEIVE_DURATION,
    duration
});

export const getDuration = state => {
    if (state.duration) {
      return state.duration
    } else {
      return []
    }
  }

  const durationReducer = (state = {}, action) => {
    // debugger
      switch (action.type) {
        case RECEIVE_DURATION:
            return action.duration;
        default:
            return state;
    }
  }

  export default durationReducer