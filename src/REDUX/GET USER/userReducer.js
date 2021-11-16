import { USER_FETCH_ERROR, USER_FETCH_REQUEST, USER_FETCH_SUCCESS} from "./userType"


const userinitialState = {
    loading: true,
    users: [],
    error: ''
}
const userReducer = (state = userinitialState, action) => {

    switch (action.type) {

        case USER_FETCH_REQUEST:
            return {

                ...state,
                loading: true

            }
        case USER_FETCH_SUCCESS:
            return {

                ...state,
                loading: false,
                users: action.payload,
                error: ''

            }
        case USER_FETCH_ERROR:
            return {
                ...state,
                loading: false,
                users: [],
                error: action.payload,


            }
     
        default:
            return state

    }

}
export default userReducer