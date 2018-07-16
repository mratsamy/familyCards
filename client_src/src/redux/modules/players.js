export default (state=[], action) => {
	switch(action.type) {
		case 'GET_INITIAL_STATE':
			return action.players
		default:
			return state
	}
}