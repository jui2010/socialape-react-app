import React, { Component } from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import './App.css'
import themeFile from './util/theme'
import jwtDecode from 'jwt-decode'

//pages
import home from './pages/home'
import login from './pages/login'
import signup from './pages/signup'

//redux
import {Provider} from 'react-redux'
import store from './redux/store'

//components
import Navbar from './components/Navbar'
import AuthRoute from './util/AuthRoute'

//themes from MaterialUI
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
//import createTheme from '@material-ui/core/styles/createMuiTheme'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'

const theme = createMuiTheme(themeFile)

//get the token, to verify if user is logged in, so he is not able to access the login and signup pages
let authenticated
const token = localStorage.FBIdToken; 
if(token){
  const decodedToken = jwtDecode(token) 
  console.log(decodedToken)
  //check if token is expired
  if(decodedToken.exp * 1000 < Date.now()){
    window.location.href = './login'
    authenticated = false
  }else {
    authenticated = true
  }
}

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <div className = "App">
            <Router>
              <Navbar />
              <div className="container">
                <Switch>
                  <Route exact path="/" component={home} />
                  <AuthRoute exact path="/login" component={login} authenticated={authenticated}/>
                  <AuthRoute exact path="/signup" component={signup} authenticated={authenticated}/>
                </Switch>
              </div>
            </Router>
          </div>
        </Provider>
      </MuiThemeProvider>
    )
  }
}

export default App

