import { Button, Container } from 'react-bootstrap'
import React from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useDispatch } from 'react-redux'
import swal from 'sweetalert'
import { fetchCategory } from '../../REDUX/category/categoryAction'



function CategoryTableRow({ category, no }) {

  const dispatch = useDispatch()

  function deleteHandler(event) {

    const id = event.target.id
    console.log(id);
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this Category!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {

          axios.get(`http://localhost:5000/admin/category/delete/${id}`).then(res => {


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
const {subCat}=category
const count=subCat?.length
  return (
    <>

    
      <tr >
        <td>{no}</td>
        <td>{category.category}</td>
        <td>{count}</td>
        <td>

          <div className='table-icons'>
            <i className="fas fa-trash-alt " id={category._id} onClick={deleteHandler}></i>
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

export default CategoryTableRow

