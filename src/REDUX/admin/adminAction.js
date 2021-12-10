
import axios from 'axios'
import { ADMIN_FETCH_ERROR, ADMIN_FETCH_REQUEST, ADMIN_FETCH_SUCCESS, ADMIN_FETCH_VERIFY } from './adminType'
import { DASHBOARD_COUNT_FETCH_ERROR, DASHBOARD_COUNT_FETCH_REQUEST, DASHBOARD_COUNT_FETCH_SUCCESS } from './adminType'



export const fetchAdminRequest = () => {
    return {
        type: ADMIN_FETCH_REQUEST
    }

}

export const fetchAdminSuccess = (users) => {
    return {
        type: ADMIN_FETCH_SUCCESS,
        payload:users
    }

}

export const fetchAdminError = (error) => {
    return {
        type: ADMIN_FETCH_ERROR,
        payload:error
    }

}
export const adminVerify = (response) => {
    return {
        type: ADMIN_FETCH_VERIFY,
        payload:response
    }

}

export const adminlogged=()=>{
    return (dispatch)=>{
         dispatch(fetchAdminRequest())
        axios.get('/admin/loggedIn').then(res=>{
    
        
            dispatch(adminVerify(res.data))
    
    
            }).catch(err=>{
            dispatch(fetchAdminError())
            
            })
            
    }
    
}

// COLLECTING DATA FOR DASHBOARD
//  SUCCES COUNT
export const dashboardCountFetchSuccess = (count) => {
    return {
        type: DASHBOARD_COUNT_FETCH_SUCCESS,
        payload:count
    }

}

// ERROR DAHSBAORD


export const dashboardError = (error) => {
    return {
        type: DASHBOARD_COUNT_FETCH_ERROR,
        payload:error
    }

}
export const fetchDashboardCount= ()=>{


    return (dispatch)=>{
dispatch({type:DASHBOARD_COUNT_FETCH_REQUEST})
axios.get('/admin/dashboard-details').then(res=>{
dispatch(dashboardCountFetchSuccess(res.data))

}).catch(err=>{

dashboardError(err)



})




    }
}