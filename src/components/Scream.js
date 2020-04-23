import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import Typography from '@material-ui/core/Typography'
import Link from 'react-router-dom/Link'

//MUI stuff
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'


const styles = {
    card : {
        display : 'flex',
        marginBottom : 20
    },
    image : {
        minWidth : 200,
        objectFit : 'cover' //to avoid image stretching 
    },
    content : {
        padding : 25
    }
}
class Scream extends Component {
    render() {
        //destructuring, alternative is {classes} = this.props.classes
        const {classes, scream : {body, createdAt, userImage, userHandle, screamId, likeCount, commentCount}} = this.props
        return (
            <Card className= {classes.card}>
                <CardMedia image = {userImage} title ="Profile Image" className={classes.image}/>
                <CardContent class ={classes.content}>
                    <Typography variant="h5" component={Link} to={`/users/${userHandle}`} color="primary">{userHandle}</Typography>
                    <Typography variant="body2" color="textSecondary">{createdAt.toString()}</Typography>
                    <Typography variant="body1">{body}</Typography>
                </CardContent>
            </Card>
        )
    }
}

export default withStyles(styles)(Scream)

