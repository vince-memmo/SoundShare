import csrfFetch from "./csrf"

const RECEIVE_USER = 'user/RECEIVE_USER'
const REMOVE_USER = 'REMOVE_USER'

export const receiveUser = (user) => ({
    type: RECEIVE_USER,
    user
})

export const removeUser = (user) => ({
    type: REMOVE_USER,
    user
})

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
    
    dispatch(receiveUser(data.user))
    return res
}

export const logout = userID => async dispatch => {
    let res = await csrfFetch('/api/session' ,{
        method: 'DELETE'
    })
    sessionStorage.setItem('currentUser', null)
    dispatch(removeUser(userID))
}


const initialState = { user: null }

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