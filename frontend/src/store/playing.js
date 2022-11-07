export const RECEIVE_PLAYING = 'queue/RECEIVE_PLAYING';

export const receivePlaying = playing => ({
    type: RECEIVE_PLAYING,
    playing
});

export const getPlaying = state => {
      return state.queue
  }

  const playingReducer = (state = {active: false}, action) => {
        switch (action.type) {
          case RECEIVE_PLAYING:
            return {active: action.playing}
        default:
            return state;
    }
  }

  export default playingReducer