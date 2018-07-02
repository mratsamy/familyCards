import React, { Component } from 'react'
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { bindActionCreators } from 'redux';

class UserProfile extends Component {
    updateUserInfo = async (info) => {
        const { dispatch, user: {id} } = this.props
        try {
            const response = await dispatch({type: "FETCH", method: "PATCH", url: `/api/users/${id}`, ...info})
        } catch (error) {

        }
    }

    handleSubmit = () => {
        const request = {
            firstName: document.getElementById('firstName'),
            lastName: document.getElementById('lastName'),
            username: document.getElementById('username')
        }

        this.updateUserInfo(request)
    }

    uploadImage = async () => {
        const { dispatch } = this.props
        window.cloudinary.openUploadWidget({cloud_name: "familyCards", upload_preset: "t3fiuwxy"}, (error, result) => {
            if (error) {
                console.log(error)
            } else {
                console.log('result', result)
            }
        })
    }

    render() {
        const { user: {firstName, lastName, username}, history } = this.props
        return (
            <div style={{display: "grid"}}>
                <a href="#" onClick={this.uploadImage}>Upload An Image</a>

                <label htmlFor="firstName">First Name</label>
                <input type="text" name="lastName" id="firstName" value={firstName} />

                <label htmlFor="lastName">Last Name</label>
                <input type="text" name="lastName" id="lastName" value={lastName} />

                <label htmlFor="username">Username</label>
                <input type="text" name="username" id="username" value={username} />

                <button onClick={()=>{history.push("/")}}>Cancel</button>
                <button onClick={this.handleSubmit}>Submit</button>
            </div>
        )
    }
}

const mapStateToProps = ({user}) => ({
    user
})

const mapDispatchToProps = (dispatch) => bindActionCreators({

}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserProfile))