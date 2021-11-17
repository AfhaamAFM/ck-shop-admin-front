import {Button} from 'react-bootstrap'
import React, { useEffect } from 'react'
import axios from 'axios'
import swal from 'sweetalert';
import {useDispatch} from 'react-redux'
import { fetchUser } from '../../REDUX/GET USER/userAction';
import { fetchCategory } from '../../REDUX/category/categoryAction';



function UserTableRow({user,no}) {

const dispatch =useDispatch()



function blockHandler(event){



const id = event.target.id

axios.get(`http://localhost:5000/admin//user-block/${id}`).then(res=>{

if(res.data.status){


 swal("Success").then(value=>{
dispatch(fetchUser())
 })

   
}

}).catch(err=>{


})
  


}

    return (
       <>
<tr key={user._id}>
      <td>{no}</td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.phone}</td>
      <td> <Button variant='warning' id={user._id} onClick={blockHandler}> {user.isActive?'Block':'Unblock'}</Button> </td>
    </tr>

       </>
    )
}

export default UserTableRow

