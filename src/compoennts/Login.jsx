import React, { useEffect, useState } from 'react'
import { Form,Button } from 'react-bootstrap';
import {Link,useNavigate} from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { adminlogged, fetchAdminRequest } from '../REDUX/admin/adminAction';


function Login() {



    useEffect(()=>{

        dispatch(adminlogged())
        
        
        },[])


const dispatch =useDispatch()
const[name,setName]=useState('')
const [password,setPassword]=useState('')
const [warning,setWarning]=useState('')
const navigate =useNavigate()
function loginHandler(event){
    event.preventDefault()

const adminData={
    name,
    password
}
console.log(adminData);
dispatch(fetchAdminRequest())
axios.post('/admin/login',adminData).then(res=>{
   
   
if(res.data.response){

setWarning(res.data.response)
}else{
console.log('okkk');
navigate('/dashboard')
dispatch(adminlogged())
}

}).catch(err=>{
    console.log( "check error   " +err);
})

}


    return (
        <div className='login-Container '>
        <div className='login-header p-3 my-3 bg-light' variant='dark'><h2 > Hello Admin ! 
        </h2></div>
        <h4>{warning}</h4>
    {/* {  loading&&<Spinner animation="border" role="status">
<span className="visually-hidden"></span>
</Spinner> } */}
  <Form onSubmit={loginHandler}>
<Form.Group className="mb-3 input-container" controlId="formBasicEmail">
<Form.Label>Enter your username</Form.Label>
<Form.Control type="text" placeholder="Enter username" required
 onChange={(e)=>setName(e.target.value)}
  />
<Form.Text className="text-muted">
  We'll never share your email with anyone else.
</Form.Text>
</Form.Group>

<Form.Group className="mb-3" controlId="formBasicPassword">
<Form.Label>Password</Form.Label>
<Form.Control type="password" placeholder="Password"  required 
onChange ={(e)=>setPassword(e.target.value)}
 />
</Form.Group>
{/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
<Form.Check type="checkbox" label="Check me out" />
</Form.Group> */}
<div className='button-container'>

<Button variant="primary" type="submit">
Sign in
</Button>
</div>
<Link to='/signup'>
{/* <p className='pt-2'>Don't have an account?</p> */}
</Link>
</Form>
    </div>
    )
}

export default Login
