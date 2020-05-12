import {SET_SCREAMS ,SET_SCREAM, LOADING_DATA, LIKE_SCREAM, UNLIKE_SCREAM, DELETE_SCREAM, POST_SCREAM} from '../types'

const initialState = {
    screams : [],
    scream : {},
    loading : false
}

export default function(state = initialState, action){
    switch(action.type){
        case LOADING_DATA:
            return {
                ...state,
                loading : true
            }
        case SET_SCREAMS:
            return {
                ...state,
                screams : action.payload,
                loading : false
            }

        case SET_SCREAM:
            return {
                ...state,
                scream : action.payload,
                loading : false
            }
        case POST_SCREAM:
            return {
                ...state,
                screams : [
                    action.payload,
                    ...state.screams
                ]
            }
        case LIKE_SCREAM:
        case UNLIKE_SCREAM:

            let index = state.screams.findIndex(
            (scream) => scream.screamId === action.payload.screamId
            )
            state.screams[index] = action.payload
            if(state.scream.screamId === action.payload.screamId){
                state.scream = action.payload
            }
            return {
            ...state
            }
        
        //didnt use the actual code here, but works
        case DELETE_SCREAM:
            return {
                ...state,
                screams: state.screams.filter((scream) => scream.screamId !== action.payload )
            }
        default:    
            return state
    }
}