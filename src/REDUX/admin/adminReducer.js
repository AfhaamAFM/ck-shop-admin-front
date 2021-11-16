import { ADMIN_FETCH_ERROR, ADMIN_FETCH_REQUEST, ADMIN_FETCH_SUCCESS, ADMIN_FETCH_VERIFY } from "./adminType";




const initialState = {
    loading: true,
    admin: "",
    error: "",
    adminActive: ''

}



const adminReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADMIN_FETCH_REQUEST:
            return {
                ...state,
                loading: true
            }

        case ADMIN_FETCH_SUCCESS:
            return {
                ...state,
                loading: false,
                admin: action.payload,
                error: ''

            }
        case ADMIN_FETCH_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
                users: ''
            }

        case ADMIN_FETCH_VERIFY:
            return {
                ...state,
                loading: false,
                adminActive: action.payload,
                error: ''
            }


        default:
            return state
    }


}
export default adminReducer