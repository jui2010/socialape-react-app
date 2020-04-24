import React from 'react'
import {Route, Redirect} from 'react-router-dom'
const AuthRoute = ({component : Component, authenticated, ...rest}) => (

    //check if authenticated, then redirect to home, else to login or signup 
    <Route
    {...rest}
    render = {(props) => 
        authenticated === true ? <Redirect to='/' /> : <Component {...props} /> }
    />
)

export default AuthRoute 