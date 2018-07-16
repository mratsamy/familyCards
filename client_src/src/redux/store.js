import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import rootReducer from './modules'
import thunk from 'redux-thunk'
import { loadState, saveState } from './localStorage'
import throttle from 'lodash/throttle'
import { fetchMiddleware } from '@mratsamy/fetch-redux-middleware'

export const history = createHistory()

const enhancers = []
const middleware = [
    fetchMiddleware("token", {headers: {"Accept": "application/json", "Content-Type": "application/json"}}, true),
    thunk,
    routerMiddleware(history)
]

if (process.env.NODE_ENV === 'development') {
    const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__
  
    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension())
    }
  }

const composedEnhancers = compose(
    applyMiddleware(...middleware),
    ...enhancers
)

let persistentState = loadState()
persistentState = persistentState ? persistentState : undefined

const store = createStore(
    rootReducer,
    persistentState,
    composedEnhancers
) 

// throttle ensures that saveState is only called once every 1 sec., doing this because JSON.serialize can be expensive
store.subscribe(throttle(() => {
    // pull out items of state to persist in localStorage
    const { token, user } = store.getState()
    saveState({token, user})
}), 1000) 

export default store