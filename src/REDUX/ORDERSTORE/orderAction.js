import { ORDER_ADD_SUCCESS, ORDER_FETCH_SUCCESS, ORDER_FETCH_ERROR, ORDER_FETCH_REQUEST } from './orderType'

import { SALES_REPORT_FETCH_SUCCESS, SALES_REPORT_FETCH_ERROR, SALES_REPORT_FETCH_REQUEST } from './orderType'

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



// SALES REPORT START



export const fetchSalesReportSuccess = (report) => {

    return {

        type: SALES_REPORT_FETCH_SUCCESS,
        payload: report
    }
}

export const fetchSalesReportError = (err) => {

    return {
        type: SALES_REPORT_FETCH_ERROR,
        payload: err


    }

}


// fetch actions
export const fetchOrders=()=>{

    
return (dispatch)=>{
    dispatch(fetchOrderRequest())

    axios.get('/order/all').then(res=>{
    dispatch(fetchOrderSuccess(res.data))


    }).catch(err=>{


        dispatch(fetchOrderError(err))
    })



}}

// fetch sales report by date
export const fetchSalesReportRange=(fromDate,toDate)=>{

    
    return (dispatch)=>{
        dispatch({type:SALES_REPORT_FETCH_REQUEST})
    
        axios.post('/admin/sales-report/range',{fromDate,toDate}).then(res=>{
        dispatch(fetchSalesReportSuccess(res.data))
    
    
        }).catch(err=>{
    
    
            dispatch(fetchSalesReportError(err))
        })
    
    
    
    }}
    // sales report by type
    export const fetchSalesReportType=(type)=>{
    
        return (dispatch)=>{
            dispatch({type:SALES_REPORT_FETCH_REQUEST})
        
            axios.get(`/admin/sales-report/type/${type}`).then(res=>{
            dispatch(fetchSalesReportSuccess(res.data))
        
            console.log(res);
            }).catch(err=>{
        
        
                dispatch(fetchSalesReportError(err))
            })
        
        
        
        }}