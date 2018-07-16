import { combineReducers } from 'redux'

const profile = (state={
    isAdmin: false,
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    imgUrl: '',
    id: 0
}, action) => {
    switch(action.type) {
        case "GET_INITIAL_STATE":
            let temp = {
                ...state,
                id: action.id,
                firstName: action.firstName,
                lastName: action.lastName,
                username: action.username,
                email: action.email,
                imgUrl: action.imgUrl,
                isAdmin: action.isAdmin || false
            }
            return temp
        case "UPDATE_USER":
            return {
                ...state,
                id: action.id || state.id,
                firstName: action.firstName || state.firstName,
                lastName: action.lastName || state.lastName,
                username: action.username || state.username,
                email: action.email || state.email,
                imgUrl: action.imgUrl || state.imgUrl,
                isAdmin: action.isAdmin || state.isAdmin
            }
        default:
            return { 
                ...state
            }
    }
}

const redirect = (state=false, action) => {
    switch(action.type) {
        case 'REMOVE_TOKEN':
            return false
        case 'SAVE_TOKEN':
            return true
        default:
            return state
    }
}

const isProfileLoading = (state=false, action) => {
    switch(action.type) {
        case 'FETCH_PROFILE_REQUEST':
            return true
        case 'FETCH_PROFILE_SUCCESS':
        case 'FETCH_PROFILE_FAILURE':
            return false
        default:
            return state
    }
}

export default combineReducers({redirect, isProfileLoading, profile})

export const loadState = () => async (dispatch) => {
    try {
        dispatch({type: "FETCH_PROFILE_REQUEST"})
        const response = await dispatch({
            type: 'FETCH', 
            url: "/api/users/initialState"
        })
        const json = await response.json()
        dispatch({type: "GET_INITIAL_STATE", ...json})
        dispatch({type: "FETCH_PROFILE_SUCCESS"})
    } catch(error) {
        if (error.response.status === 401) {
            dispatch({type: "REMOVE_TOKEN"})
            dispatch({type: "FETCH_PROFILE_FAILURE"})
        }
    }
}

export const login = ({username, password, email}) =>
    async (dispatch) => {
        try {
            let data
            if (username && password) {
                data = { username, password }
            } else if (email && password) {
                data = { email, password }
            } else {
                return
            }

            dispatch({type: "FETCH_PROFILE_REQUEST"})
            const response = await dispatch({
                type: "FETCH",
                url: "/api/users/login",
                method: "POST",
                body: data
            })

            if (response.ok) {
                const json = await response.json()
                return dispatch({type: "SAVE_TOKEN", token: json.id})
            }
        } catch (error) { 
            console.log('error',error)
            return 
        }
}

export const logout = () => async dispatch => {
    try {
        dispatch({type: "FETCH_PROFILE_REQUEST"})
        await dispatch({type: "FETCH", method: "POST", url: "/api/users/logout"})
        dispatch({type: "FETCH_PROFILE_SUCCESS"})
    } catch (error) { 
        dispatch({type: "FETCH_PROFILE_FAILURE"})
    }
    dispatch({type: "REMOVE_TOKEN"})
}


export const updateUser = data => async dispatch => {
    try {
        dispatch({type: "FETCH_PROFILE_REQUEST"})
        const response = await dispatch({type:"FETCH", ...data})
        if (response.ok) {
            dispatch({type: "FETCH_PROFILE_SUCCESS"})
            const json = await response.json()
            dispatch({type: "UPDATE_USER", payload: {...json}})
        } else {
            dispatch({type: "FETCH_PROFILE_FAILURE"})
        }
    } catch (error) {
        dispatch({type: "FETCH_PROFILE_FAILURE"})
    }
}

export const updateImgUrl = (userId, url) => async dispatch => {
    try {
        dispatch({type: "FETCH_PROFILE_REQUEST"})
        await dispatch({
            type: "FETCH",
            url: `/api/users/${userId}`,
            method: "PATCH",
            body: {imgUrl: url}
        })
        dispatch({type: "FETCH_PROFILE_SUCCESS"})
    } catch (error) {
        dispatch({type: "FETCH_PROFILE_FAILURE"})
    }
}