import React, { Component } from 'react' 
import UserCard from '../components/UserCard'
import uuid from 'uuid/v4'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { loadState } from '../redux/modules/user'

class Welcome extends Component {
    componentDidMount() {
        this.props.loadState()
    }

    render() {
        const { user } = this.props
        const players = user.players || []
        delete user.players

        return (
            <div>
                <p>Im the welcome page</p>
                <div className="playerCards">
                {
                    players.map((user) => {
                        return <UserCard user={user} key={uuid()} />
                    })
                }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user
})

const mapDispatchToProps = dispatch => bindActionCreators({
    loadState
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Welcome)