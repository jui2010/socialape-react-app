import React from 'react'
import {Route, Redirect} from 'react-router-dom'

import {connect} from 'react-redux'
import PropTypes from 'prop-types'

const AuthRoute = ({component : Component, authenticated, ...rest}) => (

    //check if authenticated, then redirect to home, else to login or signup 
    <Route
    {...rest}
    render = {(props) => 
        authenticated === true ? <Redirect to='/' /> : <Component {...props} /> }
    />
)

const mapStateToProps = (state) => ({
    authenticated : state.user.authenticated    
})

AuthRoute.propTypes = {
    user : PropTypes.object.isRequired,
}

export default connect(mapStateToProps)(AuthRoute) 