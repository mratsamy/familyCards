import React, { Component } from 'react'
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { updateImgUrl } from "../redux/modules/user"
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
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
  })

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

    uploadImage = () => {
        const { dispatch, user: {id}, updateImgUrl } = this.props
        window.cloudinary.openUploadWidget({cloud_name: "mratsamy", upload_preset: "t3fiuwxy", cropping: "server", cropping_coordinates_mode: "custom"}, (error, result) => {
            if (error) {
                console.log(error)
            } else {
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
                    srcset={`https://res.cloudinary.com/mratsamy/image/upload/c_crop,g_custom,c_fill,ar_2:1,g_face,f_auto,q_100,w_600/${imgUrl} 600w,
                            https://res.cloudinary.com/mratsamy/image/upload/c_crop,g_custom,c_fill,ar_2:1,g_face,f_auto,q_100,w_1200/${imgUrl} 1200w`}
                    sizes="100vw" />

                {/*<!-- standard crop -->*/}
                <img
                    srcset={`https://res.cloudinary.com/mratsamy/image/upload/c_crop,g_custom,f_auto,q_100,w_400/${imgUrl} 400w,
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
            <div className={classes.root}>
                <Grid container>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <Grid item xs={12}>
                                { this.displayImage() }
                            </Grid>
                            <Grid item xs={12}>
                                <a href="#" onClick={this.uploadImage}>Upload An Image</a>
                            </Grid>
                            <Grid item xs={12}>
                                <label htmlFor="firstName">First Name</label>
                                <input type="text" name="lastName" id="firstName" value={firstName} />
                            </Grid>
                            <Grid item xs={12}>
                                <label htmlFor="lastName">Last Name</label>
                                <input type="text" name="lastName" id="lastName" value={lastName} />
                            </Grid>
                            <Grid item xs={12}>
                                <label htmlFor="username">Username</label>
                                <input type="text" name="username" id="username" value={username} />
                            </Grid>
                            <Grid item xs={12}>
                                <button onClick={()=>{history.push("/")}}>Cancel</button>
                                <button onClick={this.handleSubmit}>Submit</button>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = ({user}) => ({
    user
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
    updateImgUrl
}, dispatch)

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles)
)(withRouter(UserProfile))