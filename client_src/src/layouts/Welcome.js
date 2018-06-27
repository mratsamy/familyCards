import React, { Component } from 'react' 
import UserCard from '../components/UserCard'
import uuid from 'uuid/v4'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { loadState } from '../redux/modules/user'

class Welcome extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        console.log('next', nextProps)
        console.log('state', nextState)
    }

    componentDidUpdate() {
        const { accessToken, loadState} = this.props
        console.log(arguments)

        if (accessToken) {
            console.log('exists', accessToken)
            loadState(accessToken)
        }
    }

    render() {
        const { players = [] } = this.props

        return (
            <div>
                <p>Im the welcome page</p>
                <div className="playerCards">
                {
                    players.map((user, index) => {
                        return <UserCard user={user} key={index} />
                    })
                }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    players: state.players,
    accessToken: state.accessToken
})

const mapDispatchToProps = dispatch => bindActionCreators({
    loadState
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Welcome)