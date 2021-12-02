import { ORDER_ADD_SUCCESS, ORDER_FETCH_SUCCESS, ORDER_FETCH_ERROR, ORDER_FETCH_REQUEST } from './orderType'
import axios from 'axios'


export const fetchOrderRequest = () => {

    return {

        type: ORDER_FETCH_REQUEST
    }

}


export const addOrderSuccess = (response) => {

    console.log(response)
    return {

        type: ORDER_ADD_SUCCESS,
        payload: response
    }
}


export const fetchOrderSuccess = (orders) => {

    return {

        type: ORDER_FETCH_SUCCESS,
        payload: orders
    }
}

export const fetchOrderError = (err) => {

    return {
        type: ORDER_FETCH_ERROR,
        payload: err


    }

}







export const fetchOrders=()=>{

    
return (dispatch)=>{
    dispatch(fetchOrderRequest())

    axios.get('/order/all').then(res=>{
    dispatch(fetchOrderSuccess(res.data))


    }).catch(err=>{


        dispatch(fetchOrderError(err))
    })



}}