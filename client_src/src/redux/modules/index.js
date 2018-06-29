import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import user from './user'
import token from './token'
import sidebar from './sidebar'

export default combineReducers({
    routing: routerReducer,
    user,
    token,
    sidebar
})