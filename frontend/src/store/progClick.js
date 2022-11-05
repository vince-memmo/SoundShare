export const RECEIVE_PROGCLICK = 'progClick/RECEIVE_PROGCLICK';

export const receiveProgClick = click => ({
    type: RECEIVE_PROGCLICK,
    click
});

export const getProgClick = state => {
    if (state.progClick) {
      return state.progClick
    } else {
      return []
    }
  }

  const progClickReducer = (state = {}, action) => {
    console.log(action.type)
    console.log(action.click)

      switch (action.type) {
          case RECEIVE_PROGCLICK:
            return { ...action.click };
        default:
            return state;
    }
  }

  export default progClickReducer