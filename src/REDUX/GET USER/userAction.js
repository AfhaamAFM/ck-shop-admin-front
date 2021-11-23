import { USER_FETCH_ERROR, USER_FETCH_REQUEST, USER_FETCH_SUCCESS } from "./userType"
import axios from 'axios'



export const fetchUserRequest = () => {
    return {
        type: USER_FETCH_REQUEST
    }

}

export const fetchUserSuccess = (users) => {
    return {
        type: USER_FETCH_SUCCESS,
        payload: users
    }

}

export const fetchUserError = (error) => {
    return {
        type: USER_FETCH_ERROR,
        payload: error
    }

}



export const fetchUser = (keyword='',pageNumber='') => {
    return (dispatch) => {
        dispatch(fetchUserRequest())
        axios.get(`/admin/get-user/?keyword=${keyword}&pageNumber=${pageNumber}`).then(res => {

            dispatch(fetchUserSuccess(res.data))

        }).catch(err => {
            dispatch(fetchUserError)

        })

    }}


// export const userBlocker =()=>{


//     return(dispatch)=>{
    
//         dispatch(fetchUserRequest())
//     }

//     axios.get('')
    
//     }
    