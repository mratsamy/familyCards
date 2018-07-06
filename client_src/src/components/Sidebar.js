import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import List from '@material-ui/core/List'
import compose from 'recompose/compose'
import ListItem from '@material-ui/core/ListItem'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Divider from '@material-ui/core/Divider'

import { logout } from '../redux/modules/user'
import Modal from './Modal'
import { toggleSidebar } from '../redux/modules/sidebar'
const uuid = require('uuid/v4')

const styles = {
    list: {
      width: "20vw",
    },
  }

class Sidebar extends Component {
    constructor(props) {
        super(props)
        this.state = { isModalOpen: false }
    }

    toggleModal = () => {
        this.setState({isModalOpen: !this.state.isModalOpen})
    }

    getLinks() {
        const { isAdmin } = this.props
        const links = [{to:'/', text:"Home"}, {to:"/profile", text:"Profile"}]

        if (isAdmin) {
            links.push({to:"/newScore", text:"New Score"})
            links.push({to:"/admin", text:"Admin"})
        }

        return links
    }

    createModal = () => {
        return (
            <Modal isOpen={this.state.isModalOpen} toggleModal={this.toggleModal} />
        )
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
        const { isAdmin } = this.props

        return isAdmin ? (
            <ListItem button>
                <ListItemIcon>
                    <FontAwesomeIcon icon="plus-circle" />
                </ListItemIcon>
                <ListItemText primary="Add Score" />
            </ListItem>
        ) : ""
    }

    render() {
        const { toggleSidebar, isOpen, isAdmin, classes, history, logout } = this.props
        const links = isOpen ? this.getLinks() : []

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
                        {this.adminModal()}
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

        if (isOpen) {
            return (
                <div style={styles}>
                <a onClick={toggleSidebar}>
                    <FontAwesomeIcon icon="times" size="2x" />
                </a>
                {this.createModal()}
                    {this.getLinks().map(item => {
                        const {to, text} = item
                        return <div key={uuid()}><Link to={to}>{text}</Link></div>
                    })}
                    {(isAdmin) ? <div><a href="#" onClick={this.toggleModal}>Add New Score</a></div> : ""}
                </div>
            )
        } else {
            return (
                <div>
                    <a onClick={toggleSidebar}><FontAwesomeIcon icon="bars" size="2x" /></a>
                </div>
            )
        }
        // todo, 
        // create open & close buttons
        //figure out links, 
        //add css transitions for opening and closing bar
    }
}

const mapStateToProps = state => ({
    isOpen: state.sidebar.isOpen,
    isAdmin: state.user.isAdmin
})

const mapDispatchToProps = dispatch => bindActionCreators({
    toggleSidebar,
    logout
}, dispatch)

Sidebar.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps)
)(withRouter(Sidebar))