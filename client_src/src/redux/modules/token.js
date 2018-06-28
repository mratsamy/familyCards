export default (state=false, action) => {
    switch(action.type) {
        case "SAVE_TOKEN":
            return action.token
        case "REMOVE_TOKEN":
            return false
        default:
            return state
    }
}