import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import {Link } from 'react-router-dom'
import EditDetails from './EditDetails'

//MUI stuff
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import MuiLink from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'

import dayjs from 'dayjs'

//Icons
import LocationOn from '@material-ui/icons/LocationOn'
import LinkIcon from '@material-ui/icons/Link'
import CalendarToday from '@material-ui/icons/CalendarToday'
import EditIcon from '@material-ui/icons/Edit'
import KeyboardReturn from '@material-ui/icons/KeyboardReturn'

//redux stuff
import {connect} from 'react-redux'
import {logoutUser, uploadImage}  from '../redux/actions/userActions'

const styles = (theme) => ({
    paper: {
      padding: 20
    },
    profile: {
      '& .image-wrapper': {
        textAlign: 'center',
        position: 'relative',
        '& button': {
          position: 'absolute',
          top: '80%',
          left: '70%'
        }
      },
      '& .profile-image': {
        width: 200,
        height: 200,
        objectFit: 'cover',
        maxWidth: '100%',
        borderRadius: '50%'
      },
      '& .profile-details': {
        textAlign: 'center',
        '& span, svg': {
          verticalAlign: 'middle'
        },
        '& a': {
          color: theme.palette.primary.main
        }
      },
      '& hr': {
        border: 'none',
        margin: '0 0 10px 0'
      },
      '& svg.button': {
        '&:hover': {
          cursor: 'pointer'
        }
      }
    },
    buttons: {
      textAlign: 'center',
      '& a': {
        margin: '20px 10px'
      },
      float : 'right'
    }
  })

class Profile extends Component {

  handleImageChange = (event) => {
    //array of files, s select the first one
    const image = event.target.files[0]

    //send to server
    const formData = new FormData()
    formData.append('image', image, image.name)

    this.props.uploadImage(formData)

  }

  //function to trigger the image upload after clicking the edit icon
  handleEditPicture = () => {
    const fileInput = document.getElementById('imageInput')
    fileInput.click()
  }

  handleLogout = (event) => {
    this.props.logoutUser()
  }

  render() {
    const {classes,
            user : {credentials : {handle,createdAt, imageUrl, bio, website, location}},
            loading,
            //authenticated, //authenticated remains false always 
      } = this.props
    
    //ternary operator to check if loading and then check if authenticated
    let profileMarkup = !loading ? /*(authenticated ? */ (
      <Paper className = {classes.paper}>
        <div className = {classes.profile}>
          <div className = "image-wrapper">
              <img src = {imageUrl} alt ="profile" className="profile-image"/>
              <input type="file" id="imageInput" onChange={this.handleImageChange} hidden="hidden"/> 
              <Tooltip title="Edit profile picture" placement="top">
                <IconButton onClick={this.handleEditPicture} className = "button">
                  <EditIcon color ="primary" />
                </IconButton>
              </Tooltip>
          </div>
          <hr />

          <div className = {"profile-details"}>
            <MuiLink component ={Link} to ={ `/users/${handle}`} color = "primary" variant = "h5">
                @{handle}
            </MuiLink>
            <hr />

            {bio && <Typography variant ="body2">{bio}</Typography>}
            <hr />

            {location && (
                <Fragment>
                    <LocationOn color="primary" /> <span>{location}</span> <hr />
                </Fragment>)}

            {website && (
            <Fragment>
                <LinkIcon color="primary" /> 
                <a href = {website} target ="_blank" rel="noopener noreferrer"> 
                    {'  '} { website} 
                </a>
                <hr />
            </Fragment>)}
            
            <CalendarToday color ="primary" /> {'  '}
            <span>Joined {dayjs(createdAt).format('MMM YYYY')} </span>
              
          </div>
          <Tooltip title="Logout" placement="top">
              <IconButton onClick={this.handleLogout}>
                <KeyboardReturn></KeyboardReturn>
              </IconButton>
          </Tooltip>
          <EditDetails />
        </div>
      </Paper>
    ) : (
      <Paper className={classes.paper}>
        <Typography variant="body2" align="center">
            No profile, please login
        </Typography>
        <div className ={classes.buttons}>
            <Button variant="contained" color="primary" component={Link} to="/login">
                Login
            </Button>
            <Button variant="contained" color="primary" component={Link} to="/signup">
                Signup
            </Button>
        </div>
      </Paper>
    )/*) : (<p>Loading</p>)*/


    return profileMarkup
  }
}

const mapStateToProps = (state) => ({
  user : state.user
}) 

const mapActionsToProps = {logoutUser, uploadImage} 

Profile.propTypes = {
  logoutUser : PropTypes.func.isRequired,
  uploadImage : PropTypes.func.isRequired,
  user : PropTypes.object.isRequired,
  classes : PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Profile))
