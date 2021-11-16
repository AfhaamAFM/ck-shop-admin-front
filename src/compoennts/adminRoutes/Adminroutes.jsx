import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route, Link,Navigate } from 'react-router-dom';
import Header from '../Header';
import Login from '../Login';
import PanelRoutes from './PanelRoutes';
import Sibebar from './Sibebar';
import {useSelector,useDispatch} from 'react-redux'
import { adminlogged } from '../../REDUX/admin/adminAction';
import Dashboard from '../Dashboard/Dashboard';
import UserManage from '../Dashboard/UserManage';


function Adminroutes() {

    const dispatch=useDispatch()
    const {adminActive}=useSelector(state=>state.admin)
    console.log('wroked' + adminActive);


useEffect(()=>{

dispatch(adminlogged())


},[])



    return (
        <div>
            <Router>
                
                <Container>

                
                </Container>

                <Routes>

                    
              <Route path='/dashboard' element={adminActive?<Dashboard /> :<Navigate to='/'/>} />
                 <Route path='/' element={ adminActive? <Navigate to='/dashboard'/>:<Login />} />
                 {
adminActive&&
<>

<Route path='/userManage' element={<UserManage />} />
</>

                 }
                </Routes>

            </Router>
        </div>
    )
}

export default Adminroutes
