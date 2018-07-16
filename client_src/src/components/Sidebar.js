import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import compose from 'recompose/compose'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Divider, ListItemIcon, ListItemText, ListItem, List, SwipeableDrawer, withStyles } from '@material-ui/core'

import { logout } from '../redux/modules/user'
import { toggleSidebar } from '../redux/modules/sidebar'
import { newModal } from '../redux/modules/modal'
import NewScore from './NewScore'

const styles = {
    list: {
      width: "20vw",
    },
  }

class Sidebar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            numPlayers: "",
            buyInAmount: ""
        }
    }

    adminPage = () => {
        const { isAdmin, history } = this.props

        return isAdmin ? (
            <ListItem button onClick={() => history.push('/admin')}>
                <ListItemIcon>
                    <FontAwesomeIcon icon="toolbox" />
                </ListItemIcon>
                <ListItemText primary="Admin" />
            </ListItem>
        ) : ""
    }

    adminModal = () => {
        const { newModal, gameIsFetching } = this.props
        
        newModal({
            title: 'Add A New Score',
            body: (<NewScore />),
            isFetching: gameIsFetching,
            modalDispatchReset: "RESET_GAME"
        })
    }

    adminModalButton = () => {
        const { isAdmin } = this.props

        return isAdmin ? (
            <ListItem button onClick={this.adminModal}>
                <ListItemIcon>
                    <FontAwesomeIcon icon="plus-circle" />
                </ListItemIcon>
                <ListItemText primary="Add Score" />
            </ListItem>
        ) : ""
    }

    render() {
        const { toggleSidebar, isOpen, classes, history, logout, token } = this.props

        return (
            <SwipeableDrawer open={isOpen} onClose={toggleSidebar} onOpen={toggleSidebar}>
                <div
                tabIndex={0}
                role="button"
                onClick={toggleSidebar}
                onKeyDown={toggleSidebar}
                className={classes.list}
                >
                    <List>
                        <ListItem button onClick={() => history.push('/')}>
                            <ListItemIcon>
                                <FontAwesomeIcon icon="home" />
                            </ListItemIcon>
                            <ListItemText primary="Home" />
                        </ListItem>
                        <ListItem button onClick={() => history.push('/profile')}>
                            <ListItemIcon>
                                <FontAwesomeIcon icon="address-card" />
                            </ListItemIcon>
                            <ListItemText primary="Profile" />
                        </ListItem>
                        {this.adminPage()}
                        {this.adminModalButton()}
                        <Divider style={{height: "0.3rem"}} />
                        <ListItem button onClick={logout}>
                            <ListItemIcon>
                                <FontAwesomeIcon icon="sign-out-alt" />
                            </ListItemIcon>
                            <ListItemText primary="Logout" />
                        </ListItem>
                    </List>
                </div>
            </SwipeableDrawer>
        )
    }
}

const mapStateToProps = state => ({
    isOpen: state.sidebar.isOpen,
    isAdmin: state.user.profile.isAdmin,
    gameIsFetching: state.games.isFetching,
})

const mapDispatchToProps = dispatch => bindActionCreators({
    toggleSidebar,
    logout,
    newModal,
}, dispatch)

Sidebar.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps)
)(withRouter(Sidebar))