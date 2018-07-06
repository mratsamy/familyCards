import React, { Component } from 'react'
import { Route } from 'react-router'
import { Switch, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import './App.css'
import Welcome from './layouts/Welcome'
import Profile from './layouts/UserProfile'
import Admin from './layouts/Admin'
import Login from './components/Login'
import NoMatch from './layouts/NoMatch'
import AppBar from './components/AppBar'

// font awesome icons
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCircleNotch, faBars, faTimes, faDiceFive, faAddressCard, 
  faHome, faToolbox, faSignOutAlt, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
library.add(faCircleNotch, faBars, faTimes, faDiceFive, faAddressCard, faHome, 
  faToolbox, faSignOutAlt, faPlusCircle)

const PrivateRoute = ({component: Component, ...rest}) => (
  <Route {...rest} render={(props) => (
    rest.token.length > 0 ? 
      <Component location={props.location} {...Object.assign(rest, props)} /> :
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }} />
  )}/>
)

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { token, isAdmin } = this.props

    return (
      <div>
          <AppBar />
        <Switch>
          <PrivateRoute exact path="/" token={token} component={Welcome} />
          <PrivateRoute exact path="/profile" token={token} component={Profile} />
          <PrivateRoute exact path="/admin" token={token} isAdmin={isAdmin} component={Admin} />
          <Route exact path="/login" render={(props) => <Login />} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  token: state.token,
  isAdmin: state.user.isAdmin
})

export default withRouter(
  connect(mapStateToProps)(App)
)