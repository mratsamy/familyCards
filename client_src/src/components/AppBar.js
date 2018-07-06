import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import compose from 'recompose/compose'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { logout } from '../redux/modules/user'
import Sidebar from './Sidebar'
import { toggleSidebar } from '../redux/modules/sidebar';

const styles = {
    root: {
        flexGrow: 1,
    },
    flex: {
        flex: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
}

class MenuAppBar extends Component {
    render() {
        const { classes, token, logout, toggleSidebar } = this.props
        return (
            <div>
                <AppBar position="static">
                    <Sidebar />
                    <Toolbar>
                        <IconButton onClick={toggleSidebar} className={classes.menuButton} color="inherit" aria-label="Menu">
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="title" color="inherit" className={classes.flex}>
                            <FontAwesomeIcon icon='dice-five' />
                            &nbsp;FamilyCards
                        </Typography>
                        {token && (
                            <a style={{color: "white", textDecoration: "none"}} href="#" onClick={logout}>Logout</a>
                        )}
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    token: state.token
})

const mapDispatchToProps = dispatch => bindActionCreators({
    logout,
    toggleSidebar
}, dispatch)

MenuAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps)
)(MenuAppBar)