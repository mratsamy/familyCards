export default (state={
    isFetching: false,
    error: null,
    fetchMessage: null,
}, action) => {
    switch(action.type) {
        case "GET_GAME":
            return {
                ...state,
            }
        case "FETCH_GAME_REQUEST":
            return {
                ...state,
                isFetching: true,
                fetchMessage: null,
                
            }
        case "FETCH_GAME_SUCCESS":
            return {
                ...state,
                isFetching: false,
                error: false,
                fetchMessage: action.message || "Successfully Updated.",
            }
        case "FETCH_GAME_FAILURE":
            return {
                ...state,
                isFetching: false,
                error: true,
                fetchMessage: action.message || "Unable to process request.",
            }
        case "RESET_GAME":
            return {
                ...state,
                isFetching: false,
                error: null,
                fetchMessage: null,
            }
        default:
            return {
                ...state
            }
    }
}

export const getLastGame = () => async dispatch => {
    try {
        const response = await dispatch({
            type: "FETCH",
            url: "/api/Games",
            queryParams: {
                filter: JSON.stringify({
                    order: "date DESC",
                    limit: 1,
                })
            }
        })
        console.log('getLastGame, response', response)
    } catch (error) {
        console.log('getLastGame, error', error)
    }
}

export const getGame = data => async dispatch => {
    try {
        const response = await dispatch({type: "FETCH", body: {...data}})

    } catch(error) {

    }
}

export const addGame = data => async dispatch => {
    try {
        dispatch({type: "FETCH_GAME_REQUEST"})
        const response = await dispatch({type: "FETCH", url:"/api/Games/", method: "POST", body: {...data}})
        if (response.ok) {
            dispatch({type: "FETCH_GAME_SUCCESS"})
        } else {
            dispatch({type: "FETCH_GAME_FAILURE"})
        }
    } catch (error) {
        dispatch({type: "FETCH_GAME_FAILURE"})
    }
}