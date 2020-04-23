import React, { Component } from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import './App.css'

//pages
import home from './pages/home'
import login from './pages/login'
import signup from './pages/signup'

//components
import Navbar from './components/Navbar'

//themes from MaterialUI
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
//import createTheme from '@material-ui/core/styles/createMuiTheme'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#561571',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#ff9e80',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
  typography: {
    useNextVariants: true
  }
})

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className = "App">
          <Router>
            <Navbar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={home} />
                <Route exact path="/login" component={login} />
                <Route exact path="/signup" component={signup} />
              </Switch>
            </div>
          </Router>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App

