export default (state={
    isOpen: false
}, action) => {
    switch(action.type) {
        case 'TOGGLE_SIDEBAR':
            return {
                ...state,
                isOpen: !state.isOpen
            }
        default:
            return state;
    }
}

export const toggleSidebar  = () => dispatch => dispatch({type: "TOGGLE_SIDEBAR"})