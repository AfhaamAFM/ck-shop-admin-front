import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Table,Button,FormControl,InputGroup} from 'react-bootstrap'
import Sibebar from '../adminRoutes/Sibebar'
import { fetchUser } from '../../REDUX/GET USER/userAction'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import swal from 'sweetalert';
import {Link,useParams} from 'react-router-dom'
import Panginate from '../Panginate'



function UserManage() {

const{keyword}=useParams()
const{pageNumber}=useParams()||1
    const dispatch = useDispatch()
    const[value,setKeyword]=useState('')
const[show,setShow]=useState('')
const {users,page,pages}=useSelector(state=>state.user)



useEffect(()=>{

dispatch(fetchUser(keyword,pageNumber))
keyword&&setShow(keyword)

},[dispatch,keyword,pageNumber])









function blockHandler(event){



  const id = event.target.id
  
  axios.get(`/admin//user-block/${id}`).then(res=>{
  
  if(res.data.status){
  
  
   swal("Success").then(value=>{
  dispatch(fetchUser())
   })
  
     
  }
  
  }).catch(err=>{
  
  console.log(err);
  })}
    return (
        <>
         <Sibebar />
       
         <Container>
         <div className='table-Container' >
         <Row>


             <Col className='mt-4' sm={12} md={6}>
         
<InputGroup>
        <FormControl
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
          onChange={(e)=>{setKeyword(e.target.value)}}
        >
        </FormControl>
        <Button as={Link} to={`/userSearch/${value}`} variant="outline-success"  >Search</Button>
        </InputGroup>
      
             </Col>
           

                 <Col sm={12} md={8} className='mx-auto mt-5'>
                 {keyword&&<h5 className='mb-3'>search result for {show} </h5>}
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
  {users.map((user,i)=>{
    
    return <tr key={user._id}>
      <td>{i+1}</td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.phone}</td>
      <td> <Button variant='warning' id={user._id} onClick={blockHandler}> {user.isActive?'Block':'Unblock'}</Button> </td>
    </tr>

})
} 
      

   
    
    
    {/* <UserTableRow user={user} no={i+1} key={user._id} id={user._id}/> */}
    
  
  </tbody>
</Table>
                 
                 </Col>
                 <Panginate page={page} pages={pages} keyword={keyword?keyword:''} />
             </Row>
       

        </div>
</Container> 
    )
       
    </>
    )
}

export default UserManage
