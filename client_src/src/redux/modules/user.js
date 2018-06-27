export default (state={
    isAdmin: false,
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    redirect: false,
    players: []
}, action) => {
    switch(action.type) {
        case "GET_INITIAL_STATE":
            return {
                ...state,
                ...action.payload
            }
        case "REMOVE_TOKEN":
            return {
                ...state,
                redirect: false
            }
        case "SAVE_TOKEN":
            return {
                ...state,
                redirect: true
            }
        default:
            return state
    }
}

export const loadState = () => {
    return async (dispatch) => {
        try {
            const response = await dispatch({
                type: 'FETCH', 
                url: "/api/users/initialState"
            })
            dispatch({type: "GET_INITIAL_STATE", payload: data})
        } catch(error) { 
            if (error.response.status == 401) {
                dispatch({type: "REMOVE_TOKEN"})
            }
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

            const response = await dispatch({
                type: "FETCH",
                url: "/api/users/login",
                method: "POST",
                body: data
            })
            dispatch({type: 'SAVE_TOKEN', payload: response.data.id})
        } catch (error) { return }
}

export const logout = accessToken => {
    return async dispatch => {
        try {
            await dispatch({type: "FETCH", method: "POST", url: "/api/users/logout"})
        } catch (error) { 
            /* regardless of response dispatch remove */ 
        }
        dispatch({type: "REMOVE_TOKEN"})
    }
}