import React, { useEffect } from 'react'
import { Col, Container, Row, Table } from 'react-bootstrap'
import Sibebar from '../adminRoutes/Sibebar'
import Header from '../Header'
import { fetchUser } from '../../REDUX/GET USER/userAction'
import { useDispatch, useSelector } from 'react-redux'
import UserTableRow from '../Tables/UserTableRow'

function UserManage() {
    const dispatch = useDispatch()
const {users,loading}=useSelector(state=>state.user)
useEffect(()=>{

dispatch(fetchUser())

},[])
    return (
        <>
         <Sibebar />
       
         <Container>
         <div className='table-Container' >
         <Row>
                 <Col sm={12} md={8} className='mx-auto mt-5'>
                 
                 <Table striped bordered hover >
  <thead>
    <tr>
      <th>#</th>
      <th>Name</th>
      <th>Email</th>
      <th>Phone</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
      {users.map((user,i)=>{return  <UserTableRow user={user} no={i+1} key={user._id} id={user._id}/> })
      }
  </tbody>
</Table>
                 
                 </Col>
             </Row>
       

        </div>
</Container> 
    )
       
    </>
    )
}

export default UserManage
