import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

class Admin extends Component {
    newUser = () => {

    }

    updateUser = () => {

    }

    render() {
        return (
            <div>
                <a href="#" onClick={this.newUser}>Create User</a><br />
                <a href="#" onclick={this.updateUser}>Update User</a><br />
                <a href="#" onClick={()=>{}}>Add New Score</a><br />
                <a href="#" onClick={()=>{}}>Reset Password</a><br />
            </div>
        )
    }
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Admin)