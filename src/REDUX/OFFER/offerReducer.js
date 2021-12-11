import { OFFER_ADD_SUCCESS, OFFER_FETCH_SUCCESS, OFFER_FETCH_ERROR, OFFER_FETCH_REQUEST } from './offerType'



const initial = {

    loading: false,
    offers: [],
    error: '',
    addResponse:''
 
}

export const offerReducer = (state = initial, action) => {


    switch (action.type) {
        case OFFER_FETCH_REQUEST:
            return {
                ...state,
                loading: true
            }
        case OFFER_FETCH_SUCCESS:
            return {
                ...state,
                loading: false,
                offers: action.payload,
                error: ''
            }
        case OFFER_ADD_SUCCESS:
            return {
                ...state,
                addResponse: action.payload,
                loading: false,
                error: ''
            }
            case OFFER_FETCH_ERROR:
                return {
                    ...state,
                loading: false,
                error:action.payload
            }

        default:
            return state


    }

}
    