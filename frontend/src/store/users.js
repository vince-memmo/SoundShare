import csrfFetch from "./csrf"

const RECEIVE_USERS = 'users/RECEIVE_USERS'


export const recieveUsers = (users) => ({
    type: RECEIVE_USERS,
    users
})

export const fetchUsers = () => async (dispatch) => {
    const response = await csrfFetch(`/api/users`);
    if (response.ok) {
      const users = await response.json();
      dispatch(recieveUsers(users));
    }
}

const usersReducer = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_USERS:
            return { ...action.users };
        default:
            return state;
    }
}

export default usersReducer