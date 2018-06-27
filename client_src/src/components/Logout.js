import React, { Component} from 'react'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { logout } from '../redux/modules/user'

class Logout extends Component {
    handleClick = () => {
        const { logout, accessToken } = this.props
        logout(accessToken)
    }

    render() {
        return (
            <Link 
                onClick={this.handleClick} 
                to={{pathname: "/login", state: {message: "Successfully Logged out"}}}>
                Logout
            </Link>
        )
    }
}

const mapStateToProps = state => ({
    accessToken: state.user.accessToken
})

const mapDispatchToProps = dispatch => bindActionCreators({
    logout
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Logout)