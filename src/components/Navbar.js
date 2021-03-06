import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'

import {connect } from 'react-redux'
import PropTypes from 'prop-types'

//Material UI stuff
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'

//icons 
import HomeIcon from '@material-ui/icons/Home'
import Notifications from '@material-ui/icons/Notifications'

import PostScream from './PostScream'

class Navbar extends Component {
    render() {
        const {authenticated } = this.props
        return (
            <AppBar>
                <Toolbar className = "nav-container">
                    {authenticated ? (
                        <Fragment>
                            <PostScream />

                            <Tooltip title="Home" placement="top">
                                <IconButton style = {{float : 'right'}}>
                                    <HomeIcon/>
                                </IconButton>
                            </Tooltip>

                            <Tooltip title="Notifications" placement="top">
                                <IconButton style = {{float : 'right'}}>
                                    <Notifications/>
                                </IconButton>
                            </Tooltip>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <Button color="inherit" component = {Link} to="/login" >Login</Button>
                            <Button color="inherit" component = {Link} to="/" >Home</Button>
                            <Button color="inherit" component = {Link} to="/signup" >Signup</Button>
                        </Fragment>
                    )}
                </Toolbar>
            </AppBar>
        )
    }
}

const mapStateToProps = (state) => ({
    authenticated : state.user.authenticated
})

export default connect(mapStateToProps ) (Navbar)
