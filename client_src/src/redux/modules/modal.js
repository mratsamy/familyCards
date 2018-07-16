const defaultState = {
	title: "",
	body: "",
	isOpen: false,
}

export default (state=defaultState, action) => {
	switch(action.type) {
		case "NEW_MODAL":
			return {
				...state,
				title: action.title,
				body: action.body,
				isOpen: true,
				modalDispatchReset: action.modalDispatchReset || false,
			}
		case "CLOSE_MODAL":
			return {
				...state,
				isOpen: false
			}
		default:
			return {
				...state
			}
	}
}

export const newModal = data => dispatch => {
	dispatch({type: "NEW_MODAL", ...data})
}

export const closeModal = (extraDispatch=false) => dispatch => {
	dispatch({type: "CLOSE_MODAL"})
	if (extraDispatch && typeof extraDispatch === "string") { dispatch({type: extraDispatch}) }
}