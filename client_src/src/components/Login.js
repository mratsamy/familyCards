import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { login } from '../redux/modules/user'
import { withStyles, Paper, Grid, TextField, Button, Typography } from '@material-ui/core'
import compose from 'recompose/compose'
import PropTypes from 'prop-types'

const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing.unit * 2,
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    button: {
        margin: theme.spacing.unit,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
})

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            email: '',
            password: '',
        }
    }

    componentDidMount() {
        window.addEventListener('keyup', (event) => {
            if (event.defaultPrevented) return

            let key = event.key || event.keyCode
            if (key === 'Enter' || key === 13) {
                this.handleSubmit()
            }
        })
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        })
    }

    handleSubmit = () => {
        const { login } = this.props
        
        if (this.state.email.length > 0) {
            return login({email: this.state.email, password: this.state.password})
        } else if (this.state.username.length > 0) {
            return login({username: this.state.username, password: this.state.password})
        }
    }

    render() {
        const { redirect, path, classes } = this.props
        if (redirect) {
            const { from } = path || { from: {pathname: "/"}}
            return <Redirect to={from} />
        }
        
        return (
            <div className={classes.root}>
                <Grid container>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <Typography variant="display4">Login</Typography>
                            {/* <h1>Login</h1> */}
                            <Grid item xs={12}>

                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="email"
                                    type="email"
                                    margin="normal"
                                    className={classes.textField}
                                    value={this.state.email}
                                    onChange={this.handleChange('email')}
                                    label="Email" />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="username"
                                    type="text"
                                    margin="normal"
                                    className={classes.textField}
                                    value={this.state.username}
                                    onChange={this.handleChange('username')}
                                    label="Username" />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    id="password"
                                    type="password"
                                    margin="normal"
                                    className={classes.textField}
                                    value={this.state.password}
                                    onChange={this.handleChange('password')}
                                    label="Password" />
                            </Grid>
                            <Grid item xs={12}>
                                <Button onClick={this.handleSubmit} className={classes.button} variant="outlined" color="primary">Login</Button>
                            </Grid>
                            {
                                (this.props.message || false) ? 
                                    <p>this.props.message</p> : ""
                            }
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    ...state.user
})

const mapDispatchToProps = dispatch => bindActionCreators({
    login
}, dispatch)

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles)
)(Login)