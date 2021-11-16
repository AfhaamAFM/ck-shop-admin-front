import { USER_FETCH_ERROR, USER_FETCH_REQUEST, USER_FETCH_SUCCESS, USER_FETCH_VERIFY } from "./userType"
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



export const fetchUser = () => {
    return (dispatch) => {
        dispatch(fetchUserRequest())
        axios.get('http://localhost:5000/admin/get-user').then(res => {



            dispatch(fetchUserSuccess(res.data))

        }).catch(err => {
            dispatch(fetchUserError)

        })

    }







}