export default (state={}, action) => {
    switch(action.type) {
        case "GET_GAME":
            return {
                ...state,
            }
        default:
            return state
    }
}

export const getGame = () => {
    return async (dispatch, request) => {
        try{

        } catch (error) {

        }
    }
}