const initialState = {
    token: undefined
}

export default (state=initialState, action) => {
    switch(action.type) {
        case "SAVE_TOKEN":
            return {
                ...state,
                token
            }
        case "REMOVE_TOKEN":
            return {
                ...state,
                token: undefined
            }
        default:
            return state
    }
}