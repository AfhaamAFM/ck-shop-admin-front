import React from 'react'
import { Form,Button } from 'react-bootstrap';
import {Link,useNavigate} from 'react-router-dom'



function Login() {
    return (
        <div className='login-Container '>
        <div className='login-header p-3 my-3 bg-light' variant='dark'><h2 > Hello Admin ! 
        </h2></div>
        {/* <h4>{warning}</h4>
    {  loading&&<Spinner animation="border" role="status">
<span className="visually-hidden"></span>
</Spinner> } */}
  <Form>
<Form.Group className="mb-3 input-container" controlId="formBasicEmail">
<Form.Label>Enter your user name</Form.Label>
<Form.Control type="email" placeholder="Enter username" required
//  onChange={(e)=>setEmail(e.target.value)}
  />
<Form.Text className="text-muted">
  We'll never share your email with anyone else.
</Form.Text>
</Form.Group>

<Form.Group className="mb-3" controlId="formBasicPassword">
<Form.Label>Password</Form.Label>
<Form.Control type="password" placeholder="Password"  required onChang
// ={(e)=>setPassword(e.target.value)}
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
<p className='pt-2'>Don't have an account?</p>
</Link>
</Form>
    </div>
    )
}

export default Login
