import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from '../Login';

function Adminroutes() {
    return (
        <div>
            <Router>
                <Routes>
<Route path='/' element={<Login/>}/>
                </Routes>

            </Router>
        </div>
    )
}

export default Adminroutes
