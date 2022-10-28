import csrfFetch from "./csrf"

const RECEIVE_USER = 'user/RECEIVE_USER'
const REMOVE_USER = 'REMOVE_USER'

export const setCurrentUser = (user) => ({
    type: RECEIVE_USER,
    user
})

export const removeUser = () => ({
    type: REMOVE_USER
})

export const signup = (user) => async (dispatch) => {
    const { username, email, password } = user;
    const response = await csrfFetch("/api/users", {
      method: "POST",
      body: JSON.stringify({
        username,
        email,
        password
      })
    });
    const data = await response.json();
    storeCurrentUser(data.user);
    dispatch(setCurrentUser(data.user));
    return response;
};
  

export const login = user => async dispatch => {
    const { credential, password } = user;
    let res = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify({
            credential,
            password
        })
    })

    const data = await res.json()
    storeCurrentUser(data.user)
    dispatch(setCurrentUser(data.user))
    return res
}

export const logout = () => async (dispatch) => {
    const response = await csrfFetch("/api/session", {
      method: "DELETE"
    });
    storeCurrentUser(null);
    dispatch(removeUser());
    return response;
};

export const storeCSRFToken = (response) => {
    const csrfToken = response.headers.get("X-CSRF-Token")
    if (csrfToken) sessionStorage.setItem("X-CSRF-Token", csrfToken)
}

const storeCurrentUser = user => {
    if (user) sessionStorage.setItem("currentUser", JSON.stringify(user));
    else sessionStorage.removeItem("currentUser");
}

export const restoreSession = () => async dispatch => {
    const response = await csrfFetch("/api/session");
    storeCSRFToken(response);
    const data = await response.json();
    storeCurrentUser(data.user);
    dispatch(setCurrentUser(data.user));
    return response;
}

const initialState = { 
user: JSON.parse(sessionStorage.getItem("currentUser"))
}

// const initialState = { user: null }

const sessionReducer = (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_USER:
            return { ...state, user: action.user }    
        case REMOVE_USER:
            return { ...state, user: null }    
        default:
            return state;
    }
}

export default sessionReducer