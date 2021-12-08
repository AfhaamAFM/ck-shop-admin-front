import {ORDER_ADD_SUCCESS,ORDER_FETCH_SUCCESS,ORDER_FETCH_ERROR,ORDER_FETCH_REQUEST} from './orderType'
import { SALES_REPORT_FETCH_SUCCESS, SALES_REPORT_FETCH_ERROR, SALES_REPORT_FETCH_REQUEST } from './orderType'



const initial = {

    loading: false,
    orders: [],
    error: '',
    addResponse:''
 
}

export const orderReducer = (state = initial, action) => {


    switch (action.type) {
        case ORDER_FETCH_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ORDER_FETCH_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: action.payload,
                error: ''
            }
        case ORDER_ADD_SUCCESS:
            return {
                ...state,
                addResponse: action.payload,
                loading: false,
                error: ''
            }
            case ORDER_FETCH_ERROR:
                return {
                    ...state,
                loading: false,
                error:action.payload
            }

        default:
            return state


    }

}


// sales report reducer
export const salesReducer = (state = {report:[],loading:false,error:''}, action) => {


    switch (action.type) {
        case SALES_REPORT_FETCH_REQUEST:
            return {
                ...state,
                loading: true
            }
        case SALES_REPORT_FETCH_SUCCESS:
            return {
                ...state,
                loading: false,
                report: action.payload,
                error: ''
            }
    
            case SALES_REPORT_FETCH_ERROR:
                return {
                    ...state,
                loading: false,
                error:action.payload
            }

        default:
            return state


    }

}
