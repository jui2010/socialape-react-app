import React, { Component } from 'react'
import axios from 'axios'
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'

import Scream from '../components/Scream'
import StaticProfile from '../components/StaticProfile'

import { connect } from 'react-redux'
import { getUserData } from "../redux/actions/dataActions";

class user extends Component {

    state = {
        profile : null
    }

    //once this page is loaded get the userhandle from the URL for which user profile is to be displayed  
    componentDidMount(){
        const handle = this.props.match.params.handle
        this.props.getUserData(handle)
        axios.get(`/user/${handle}`)
            .then(res => {
                this.setState({
                    profile : res.data.user
                })
            })
            .catch(err => console.log(err))
    }

    render() {
        const { screams, loading } = this.props.data
        const screamsMarkup =loading ? (
            <p>Loading data</p>
        ) : screams === null ? (
            <p>No screams for this user</p>
        ) : (
            screams.map(scream => <Scream key={scream.screamId} scream={scream} /> )
        )
        return (
            <Grid container spacing={16}>
                <Grid item sm={8} xs={12}>
                    {screamsMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                    {this.state.profile !== null ? <StaticProfile profile={this.state.profile} /> : null }
                </Grid>
            </Grid>
        )
    }
}

user.propTypes = {
    getUserData : PropTypes.func.isRequired,
    data : PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    data : state.data
})

export default connect(mapStateToProps, {getUserData} )(user)
