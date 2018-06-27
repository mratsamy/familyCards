import React, { Component } from 'react'

export default class UserCard extends Component {
    render() {
        const {id=null, email='', firstName='', lastName='', gamesWon=null, total=null, username='' } = this.props.user
        
        return (
            <div>
                <p>{firstName}</p>
                <p>{lastName}</p>
                <p>{email}</p>
                <p>{gamesWon}</p>
                <p>{total}</p>
                <p>{username}</p>
            </div>
        )
    }
}