import { ADMIN_FETCH_ERROR, ADMIN_FETCH_REQUEST, ADMIN_FETCH_SUCCESS, ADMIN_FETCH_VERIFY } from "./adminType";
import { DASHBOARD_COUNT_FETCH_ERROR, DASHBOARD_COUNT_FETCH_REQUEST, DASHBOARD_COUNT_FETCH_SUCCESS } from './adminType'




const initialState = {
    loading: true,
    admin: "",
    error: "",
    adminActive: ''

}



 export const adminReducer = (state = initialState, action) => {

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

// getting count reducer


export const dashboardReducer = (state = {loading:false,countDetails:{},error:''}, action) => {

    switch (action.type) {
        case DASHBOARD_COUNT_FETCH_REQUEST:
            return {
                ...state,
                loading: true
            }

        case DASHBOARD_COUNT_FETCH_SUCCESS:
            return {
                ...state,
                loading: false,
                countDetails: action.payload,
                error: ''

            }
        case DASHBOARD_COUNT_FETCH_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
                countDetails: ''
            }



        default:
            return state
    }


}
