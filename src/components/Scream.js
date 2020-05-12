import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import PropTypes from 'prop-types'

//MUI stuff
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'

//import CardActionArea from '@material-ui/core/CardActionArea'
//import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'

//Icons
import ChatIcon from '@material-ui/icons/Chat'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'

//Redux
import {connect} from 'react-redux'
//import {likeScream, unlikeScream} from '../redux/actions/dataActions'

import DeleteScream from './DeleteScream'
import ScreamDialog from './ScreamDialog'
import LikeButton from './LikeButton'

const styles = {
    card : {
        position: 'relative',
        display : 'flex',
        marginBottom : 20
    },
    image : {
        minWidth : 200,
        objectFit : 'cover' //to avoid image stretching 
    },
    content : {
        padding : 25
    }
}

class Scream extends Component {

    render() {
        //to get "posted 2 days ago" functionality in the scream
        dayjs.extend(relativeTime)

        //destructuring, alternative is {classes} = this.props.classes
        const {classes, 
               scream : {body, createdAt, userImage, userHandle, likeCount, commentCount,screamId },
               user : {authenticated, credentials : {handle}}
            } = this.props

        

        //to check if the user is deleting his own scream
        const deleteButton = authenticated && userHandle === handle ? (
            <DeleteScream screamId = {screamId} />
        ) : null
        return ( //CardContent - image gives an error in console
            <Card className= {classes.card}>
                <CardMedia image = {userImage} title="Profile Image" className={classes.image} /> 
                <CardContent className ={classes.content}>
                    <Typography variant="h5" component={Link} to={`/users/${userHandle}`} color="primary">{userHandle}</Typography>
                    {deleteButton}
                    <Typography variant="body2" color="textSecondary">{dayjs(createdAt).fromNow()}</Typography>
                    <Typography variant="body1">{body}</Typography>
                        <LikeButton screamId={screamId} />
                    <span >{likeCount} Likes</span>
                    <Tooltip title="comments" placement="top">
                        <IconButton >
                            <ChatIcon color ="primary" />
                        </IconButton>
                    </Tooltip>
                    <span>{commentCount} comments</span>
                    <ScreamDialog screamId={screamId} userHandle={userHandle} />
                </CardContent>
            </Card>
        )
    }
}

Scream.propTypes = {
    user : PropTypes.object.isRequired,
    scream : PropTypes.object.isRequired,
    classes : PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user : state.user
})


export default connect(mapStateToProps)(withStyles(styles)(Scream))

