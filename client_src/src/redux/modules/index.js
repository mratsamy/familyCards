import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import user from './user'
import token from './token'
import sidebar from './sidebar'
import players from './players'
import modal from './modal'
import games from './games'

export default combineReducers({
    routing: routerReducer,
    user,
    token,
    players,
    sidebar,
    modal,
    games,
})