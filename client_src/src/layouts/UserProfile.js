import React, { Component } from 'react'
import axios from 'axios'

export default class UserProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: false
        }
    }

    componentDidMount() {
        this.setState({isLoading: true})
        axios('/api/users/', {
            method: "GET",
            headers: {
                Authorization: this.props.authToken || localStorage.getItem("auth")
            }
        })
        .then(response => this.setState(response.data))
        .catch(error => console.log('error here', error))
        .finally(() => this.setState({isLoading: false}))
    }

    render() {
        return (
            <div>

            </div>
        )
    }
}