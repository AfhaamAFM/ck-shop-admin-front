import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { Routes, BrowserRouter as Router,Route } from 'react-router-dom'
import Sibebar from './Sibebar'
import Header from '../Header'
import Dashboard from '../Dashboard/Dashboard'
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
