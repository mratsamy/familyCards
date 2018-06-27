import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import user from './user'
import token from './token'

export default combineReducers({
    routing: routerReducer,
    user,
    token
})