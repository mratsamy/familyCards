import React, { Component } from 'react'
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { updateImgUrl, updateUser } from "../redux/modules/user"
import { bindActionCreators } from 'redux'
import { TextField, withStyles, Button, Paper, Grid } from '@material-ui/core'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import compose from 'recompose/compose'

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
    input: {
        display: "none",
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
      },
  })

class UserProfile extends Component {
    updateUserInfo = info => {
        const { updateUser, user: {id} } = this.props
        updateUser({type: "FETCH", method: "PATCH", url: `/api/users/${id}`, body: {...info}})
    }

    handleSubmit = () => {
        const request = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            username: document.getElementById('username').value
        }

        this.updateUserInfo(request)
    }

    uploadImage = () => {
        const { user: {id}, updateImgUrl } = this.props
        window.cloudinary.openUploadWidget({cloud_name: "mratsamy", upload_preset: "t3fiuwxy", cropping: "server", cropping_coordinates_mode: "custom"}, (error, result) => {
            if (!error) {
                (async () => {
                    try {
                        const imgUrl = result[0].path || null
                        const update = await updateImgUrl(id, imgUrl)
                        document.getElementById("userImg").setAttribute('src', `https://res.cloudinary.com/mratsamy/image/upload/${imgUrl}`)
                    } catch(error) {

                    }
                })()
            }
        })
    }

    displayImage = () => {
        const { user: { imgUrl, firstName, lastName } } = this.props

        return (
            <picture>
                <source 
                    media="(minWidth: 600px)"
                    srcSet={`https://res.cloudinary.com/mratsamy/image/upload/c_crop,g_custom,c_fill,ar_2:1,g_face,f_auto,q_100,w_600/${imgUrl} 600w,
                            https://res.cloudinary.com/mratsamy/image/upload/c_crop,g_custom,c_fill,ar_2:1,g_face,f_auto,q_100,w_1200/${imgUrl} 1200w`}
                    sizes="100vw" />

                {/*<!-- standard crop -->*/}
                <img
                    srcSet={`https://res.cloudinary.com/mratsamy/image/upload/c_crop,g_custom,f_auto,q_100,w_400/${imgUrl} 400w,
                            https://res.cloudinary.com/mratsamy/image/upload/c_crop,g_custom,f_auto,q_100,w_800/${imgUrl} 800w`}
                    src={`https://res.cloudinary.com/mratsamy/image/upload/c_crop,g_custom,f_auto,q_100,w_400/${imgUrl}`}
                    alt={`${lastName},${firstName} User Profile Image`}
                    sizes="50vw" />
            </picture>
        )
    }

    render() {
        const { user: {firstName, lastName, username}, history, classes } = this.props
        return (
            <div alignItems="stretch" className={classes.root}>
                <Grid alignItems="stretch" container>
                    <Grid alignItems="stretch" item xs={12}>
                        <Paper alignItems="stretch" className={classes.paper}>
                            <Grid item xs={12}>
                                { this.displayImage() }
                            </Grid>
                            <Grid item xs={12}>
                                <a href="#" onClick={this.uploadImage}><FontAwesomeIcon icon="camera-retro" /> Upload An Image</a>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField 
                                    id="firstName" 
                                    label="First Name"
                                    className={classes.textField}
                                    defaultValue={firstName}
                                    margin="normal" />
                                <TextField 
                                    id="lastName" 
                                    label="Last Name"
                                    className={classes.textField}
                                    defaultValue={lastName}
                                    margin="normal" />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField 
                                    id="username"
                                    label="Username"
                                    className={classes.textField}
                                    defaultValue={username}
                                    margin="normal" />
                            </Grid>
                            <Grid item xs={12}>
                                <Button onClick={()=>{history.push("/")}} variant="contained" color="secondary" className={classes.button}>Cancel</Button>
                                <Button onClick={this.handleSubmit} variant="contained" color="primary" className={classes.button}>Save</Button>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = ({user}) => ({
    user: user.profile
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
    updateImgUrl,
    updateUser
}, dispatch)

UserProfile.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles)
)(withRouter(UserProfile))