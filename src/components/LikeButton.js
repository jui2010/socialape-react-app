import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

//MUI
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'

//Redux
import {connect} from 'react-redux'
import {likeScream, unlikeScream} from '../redux/actions/dataActions'

//Icons
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'

class LikeButton extends Component {
    likedScream = () => {
        if (
          this.props.user.likes &&
          this.props.user.likes.find(
            (like) => like.screamId === this.props.screamId
          )
        )
          return true;
        else return false;
        }

    likeScream = () => {
        this.props.likeScream(this.props.screamId)
    }

    unlikeScream = () => {
        this.props.unlikeScream(this.props.screamId)
    }


    render() {

        const {authenticated } = this.props.user
        //if not logged in , redirect to /login page , else , check if the user that has logged in has liked/unliked the post
        const likeButton = !authenticated ? (
            <Link to="/login">
                <Tooltip title="Like" placement="top">
                <IconButton >
                    <FavoriteBorder color="primary" />
                </IconButton>
            </Tooltip>
            </Link>
            
        ) : (
            this.likedScream() ? (
                <Tooltip title="Undo like" placement="top">
                    <IconButton onClick={this.unlikeScream}>
                        <FavoriteIcon color="primary" />
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Like" placement="top">
                    <IconButton onClick={this.likeScream}>
                        <FavoriteBorder color="primary" />
                    </IconButton>
                </Tooltip>
            )
        )

        return likeButton
    }
}

LikeButton.propTypes = {
    user : PropTypes.object.isRequired,
    screamId : PropTypes.string.isRequired,
    likeScream : PropTypes.func.isRequired,
    unlikeScream : PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    user  : state.user,

})

const mapActionsToProps = {
    likeScream,
    unlikeScream
}

export default connect(mapStateToProps, mapActionsToProps)(LikeButton)
