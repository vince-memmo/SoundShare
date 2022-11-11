export const RECEIVE_CURRENTTIME = 'currentTime/RECEIVE_CURRENTTIME';

export const receiveCurrentTime = currentTime => ({
    type: RECEIVE_CURRENTTIME,
    currentTime
});

  const currentTimeReducer = (state = {time: 0}, action) => {
      switch (action.type) {
        case RECEIVE_CURRENTTIME:
            state = {}
            return {time: action.currentTime};
        default:
            return state;
    }
  }

  export default currentTimeReducer