import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Login from '../Login';

import { useSelector, useDispatch } from 'react-redux'
import { adminlogged } from '../../REDUX/admin/adminAction';
import Dashboard from '../Dashboard/Dashboard';
import UserManage from '../Dashboard/UserManage';
import CategoryManage from '../Dashboard/Category/CategoryManage';
import ProducScreen from '../product/ProducScreen';
import OrderScreen from '../orders/Orderscreen';
import OfferScreen from '../Offers/OfferScreen';
import SalesScreen from '../Sales/SalesScreen';


function Adminroutes() {

    const dispatch = useDispatch()
    const { adminActive } = useSelector(state => state.admin)


    useEffect(() => {

        dispatch(adminlogged())


    }, [dispatch])



    return (
        <div>
            <Router>

                <Routes>


                    <Route path='/dashboard' element={adminActive ? <Dashboard /> : <Navigate to='/' />} />
                    <Route path='/' element={adminActive ? <Navigate to='/dashboard' /> : <Login />} />
                    {
                        adminActive &&
                        <>

                            <Route path='/userManage' element={<UserManage />} />
                            <Route path='/userSearch/:keyword' element={<UserManage />} />
                            <Route path='/userManage/page/:pageNumber' element={<UserManage />} />
                            <Route path='/userSearch/:keyword/page/:pageNumber' element={<UserManage />} />


                            <Route path='/orders' element={<OrderScreen />} />
                            <Route path='/offers' element={<OfferScreen />} />

                            <Route path='/category' element={<CategoryManage />} />
                            <Route path='/product' element={<ProducScreen />} />
                            <Route path='/sales' element={<SalesScreen />} />



                        </>

                    }
                </Routes>

            </Router>
        </div>
    )
}

export default Adminroutes
