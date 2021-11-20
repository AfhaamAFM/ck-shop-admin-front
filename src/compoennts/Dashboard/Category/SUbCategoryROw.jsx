import { Button, Container } from 'react-bootstrap'
import React, { useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useDispatch } from 'react-redux'
import swal from 'sweetalert'




function SUbCategoryROw({ subCategory, no,id }) {

  const dispatch = useDispatch()
const[count,setCount]=useState(0)



  function deleteHandler(e) {

    const subCat = e.target.id
    console.log(subCat);
    const _id=id
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this Category!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {

          axios.post(`/admin//category/sub/delete`,{_id,subCat}).then(res => {


            if (res.data) {
            
              swal("Category has been deleted!", {
                icon: "success",
              });
              
            }

          })
          // category/delete/:id


        } else {
          swal("Category is safe!");
        }
      });


  }
// category count
// const {subCat}=category
// const count=subCat?.length
  return (
    <>

    
      <tr >
        <td>{no}</td>
        <td>{subCategory}</td>
        {/* <td>{count}</td> */}
        <td>

          <div className='table-icons'>
            <i className="fas fa-trash-alt" id={subCategory}  onClick={deleteHandler}></i>
            {/* <i className="fas fa-edit" onClick={editHandler} id={category._id}></i> */}
          </div>
        </td>
       
      </tr>
   
      {/* <tr>
  <td>
    <input type="text" />
  </td>
  <td>
    <Button variant='success'>Save</Button>
  </td>
</tr> */}

    </>
  )
}

export default SUbCategoryROw

