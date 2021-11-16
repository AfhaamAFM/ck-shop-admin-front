import React, { useEffect } from 'react'
import { Routes, BrowserRouter as Router,Route } from 'react-router-dom'
import { adminlogged } from '../../REDUX/admin/adminAction'
import { useDispatch } from 'react-redux'


function PanelRoutes() {

const dispatch = useDispatch()
    useEffect(()=>{

        dispatch(adminlogged())
        
        
        },[])
    return (
        <div>


                <Routes>
                    
                </Routes>
           
        </div>
    )
}

export default PanelRoutes
