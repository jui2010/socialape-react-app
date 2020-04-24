import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types'
import logo from '../images/favicon.ico'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'

import axios from 'axios'

// MUI Stuff
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import CircularProgress from '@material-ui/core/CircularProgress'

//getting the styles from global theme in App.js -gives error
//const styles = (theme) => ({
//    ...theme
//})
const styles = {
    form : {
        textAlign : 'center'
    },
    image : {
        margin : '20px auto 20px auto' ,
    },
    pageTitle : {
        margin : '20px auto 20px auto' ,
    },
    textField : {
        margin : 'auto auto 20px auto' ,
    },
    button : {
        marginTop : '20px', 
        position : 'relative'
    },
    customError : {
        color : 'red',
        fontSize : '0.8rem',
        marginTop : 10,
    },
    progress : {
        position : 'absolute',
    }
}

class signup extends Component {
    constructor(){
        super()
        this.state = {
            email : '',
            password : '',
            confirmPassword : '',
            handle : '',
            loading :false,
            errors : {}
        }
    }
    handleSubmit = (event) => {
        event.preventDefault()
        this.setState({
            loading : true
        })
        const newUserData = {
            email : this.state.email,
            password : this.state.password,
            confirmPassword : this.state.confirmPassword,
            handle : this.state.handle
        }
        axios.post('/signup', newUserData)
        .then(res => {
            console.log(res.data)
            //store the token on local machine, so if page refreshes.. user doesnt have to login again
            localStorage.setItem('FBIdToken' , `Bearer ${res.data.token}`)
            this.setState({
                loading : false
            })

            //redirect to the home page, incase login is successful
            this.props.history.push('/')
        })
        .catch(err => {
            this.setState({
                errors : err.response.data,
                loading : false
            })
        })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }
    render() {
        const {classes} = this.props

        //destructuring
        const {errors, loading } = this.state
        return (
            <Grid container className ={classes.form} >
                <Grid item sm /> 
                <Grid item sm >
                    <img src = {logo} alt ="logo" className ={classes.image} />
                    <Typography variant="h4" className={classes.pageTitle}>
                        Sign Up
                    </Typography>
                    <form noValidate onSubmit ={this.handleSubmit }>

                        <TextField 
                        id ="email" 
                        name="email" 
                        type="email" 
                        label="Email" 
                        className={classes.textField}
                        helperText ={errors.email} error ={errors.email ? true : false} 
                        value={this.state.email} 
                        onChange= {this.handleChange} fullWidth />

                        <TextField 
                        id ="password" 
                        name="password" 
                        type="password" 
                        label="Password" 
                        className={classes.textField}
                        helperText ={errors.password} error ={errors.password ? true : false} 
                        value={this.state.password} 
                        onChange= {this.handleChange} fullWidth />

                        <TextField 
                        id ="confirmPassword" 
                        name="confirmPassword" 
                        type="password" 
                        label="Confirm Password" 
                        className={classes.textField}
                        helperText ={errors.confirmPassword} error ={errors.confirmPassword ? true : false} 
                        value={this.state.confirmPassword} 
                        onChange= {this.handleChange} fullWidth />
                        
                        <TextField 
                        id ="handle" 
                        name="handle" 
                        type="handle" 
                        label="Handle" 
                        className={classes.textField}
                        helperText ={errors.handle} error ={errors.handle ? true : false} 
                        value={this.state.handle} 
                        onChange= {this.handleChange} fullWidth />

                        {errors.general && (
                            <Typography variant ="body2" className={classes.customError} >
                                {errors.general}
                            </Typography>
                        )}
                        <Button type="submit" variant="contained" color="primary" className={classes.button} disabled={loading}>
                            Sign Up
                            {loading && (
                                <CircularProgress size={60} className ={ classes.progress} />
                            )}
                        </Button>
                        <br />
                        <small>Already have an account ? Login up <Link to="/login" >here</Link></small>
                    </form>
                </Grid> 
                <Grid item sm /> 
            </Grid>
        )
    }
}

signup.propTypes = {
    classes : PropTypes.object.isRequired
}
export default withStyles(styles)(signup)
