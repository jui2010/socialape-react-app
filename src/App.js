import React, { Component } from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import './App.css'

import jwtDecode from 'jwt-decode'

//pages
import home from './pages/home'
import login from './pages/login'
import signup from './pages/signup'

//redux
import {Provider} from 'react-redux'
import store from './redux/store'
import {SET_AUTHENTICATED } from './redux/types'
import {logoutUser , getUserData} from './redux/actions/userActions'

//components
import Navbar from './components/Navbar'
import AuthRoute from './util/AuthRoute'

//themes from MaterialUI
import themeObject from './util/theme'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';

import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import axios from 'axios'

const theme = createMuiTheme(themeObject)

//get the token, to verify if user is logged in, so he is not able to access the login and signup pages
const token = localStorage.FBIdToken; 
if(token){
  const decodedToken = jwtDecode(token) 
  console.log(decodedToken)
  //check if token is expired
  if(decodedToken.exp * 1000 < Date.now()){

    store.dispatch(logoutUser())
    window.location.href = './login'
  } else {
    store.dispatch({type : SET_AUTHENTICATED})
    axios.defaults.headers.common['Authorization'] = token
    store.dispatch(getUserData())
  }
}

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <Router>
            <Navbar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={home} />
                <AuthRoute exact path="/login" component={login} />
                <AuthRoute exact path="/signup" component={signup} />
              </Switch>
            </div>
          </Router>
        </Provider>
      </MuiThemeProvider>
    )
  }
}

export default App

