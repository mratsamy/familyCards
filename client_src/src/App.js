import React, { Component } from 'react'
import { Route } from 'react-router'
import { Switch, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import './App.css'
import Welcome from './layouts/Welcome'
import Login from './components/Login'
import Logout from './components/Logout'
import NoMatch from './layouts/NoMatch'

// font awesome icons
import fontawesome from '@fortawesome/fontawesome'
import faCircleNotch from '@fortawesome/fontawesome-free-solid/faCircleNotch'
fontawesome.library.add(faCircleNotch)

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
    const { token } = this.props

    return (
      <div>
        {
          (token) ? <Logout /> : ""
        }
        <Switch>
          <PrivateRoute exact path="/" token={token} component={Welcome} />
          <Route exact path="/login" render={(props) => <Login />} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  token: state.token
})

export default withRouter(
  connect(mapStateToProps)(App)
)