import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { login } from '../redux/modules/user'

class Login extends Component {
    handleSubmit = (event) => {
        event.preventDefault()
        const { login } = this.props

        const email = event.target.querySelector('#email').value
            , username = event.target.querySelector("#username").value
            , password = event.target.querySelector("#password").value
        
        if (email.length > 0) {
            login({email, password})
        } else if (username.length > 0) {
            return login({username, password})
        }
    }

    render() {
        const { redirect, path } = this.props
        if (redirect) {
            const { from } = path || { from: {pathname: "/"}}
            return <Redirect to={from} />
        }
        
        return (
            <div>
                <p>im a login page</p>
                {
                    (this.props.message || false) ? 
                        <p>this.props.message</p> : ""
                }
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email"/><br/>
                    
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" /><br/>
                    
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password"/><br/>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    ...state.user
})

const mapDispatchToProps = dispatch => bindActionCreators({
    login
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)