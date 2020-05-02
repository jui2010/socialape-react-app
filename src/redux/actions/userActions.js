import {SET_USER,SET_UNAUTHENTICATED , SET_ERRORS, CLEAR_ERRORS, LOADING_UI ,LOADING_USER  } from '../types'

import axios from 'axios'

//login
export const loginUser = (userData, history) => (dispatch) => {

    dispatch({type : LOADING_UI})

    axios.post('/login', userData)
        .then(res => {

            //call the authoriztion function from below 
            setAuthorizationHeader(res.data.token)

            dispatch(getUserData())
            dispatch({type : CLEAR_ERRORS})

            //redirect to the home page, incase login is successful
            history.push('/')
            //dispatch({type : SET_AUTHENTICATED})
        })
        .catch( err => {
            dispatch({
              type: SET_ERRORS,
              payload: err.response.data,
            })
        })
}

//signup
export const signupUser = (newUserData, history) => (dispatch) => {

    dispatch({type : LOADING_UI})

    axios.post('/signup', newUserData)
        .then(res => {
            //call the authoriztion function from below 
            setAuthorizationHeader(res.data.token)

            dispatch(getUserData())
            dispatch({type : CLEAR_ERRORS})

            //redirect to the home page, incase login is successful
            history.push('/')
            //dispatch({type : SET_AUTHENTICATED})
        })
        .catch( err => {
            dispatch({
              type: SET_ERRORS,
              payload: err.response.data
            })
        })
}

export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('FBIdToken')
    delete axios.defaults.headers.common['Authorization']

    dispatch({
        type : SET_UNAUTHENTICATED
    })
}

export const uploadImage = (formData) => (dispatch) => {
    dispatch({type: LOADING_USER})
    axios.post('/user/image', formData)
        .then(res => {
            dispatch(getUserData())
        })
        .catch(err => {
            console.log(err)
        })
}

const setAuthorizationHeader = (token) => {   
    const FBIdToken = `Bearer ${token}`
    //store the token on local machine, so if page refreshes.. user doesnt have to login again
    localStorage.setItem('FBIdToken' , FBIdToken )
    axios.defaults.headers.common['Authorization'] = FBIdToken
}

export const editUserDetails = (userDetails) => (dispatch) => {
    dispatch({type : LOADING_USER})
    axios.post('/user' , userDetails)
        .then(() => {
            dispatch(getUserData())

        })
        .catch(err => console.log(err))
}

export const getUserData = () => (dispatch) => {
    dispatch({type : LOADING_USER})
    axios.get('/user')
    .then(res => {
        dispatch({
            type : SET_USER, 
            payload : res.data
        })
    })
    .catch(err => console.log(err))
}