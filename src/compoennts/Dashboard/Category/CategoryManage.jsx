import React, { useEffect, useState } from 'react'
import { Container, Row, Table, Col, Button, Tab ,Tabs} from 'react-bootstrap'
import Sibebar from '../../adminRoutes/Sibebar'
import Loader from "react-loader-spinner";

import { useDispatch, useSelector } from 'react-redux'
import { fetchCategory } from '../../../REDUX/category/categoryAction'
import axios from 'axios'
import swal from 'sweetalert'
import Subctegory from '../Category/Subctegory';

import CategoryEditModal from './CategoryEditModal';



function CategoryManage() {


  const [categoryName, setCategory] = useState('')
  const { category, loading } = useSelector(state => state.category )
   const[show,setShow]=useState(false)
const[newCategory,setNewCategory]=useState('')
const[oldCategory,setOldCategory]=useState('')
const[nameError,setError]=useState('')

  const handleClose = () => setShow(false);
  const handleShow = (e) => {
    
    setShow(true);
    setOldCategory(e.target.id)
    setNewCategory(e.target.id)
    console.log(e.target.id)
  }




  function editHandler(){

    axios.post('/admin/category/edit',{oldCategory,newCategory}).then((res)=>{
    
        if (res.data.response) {
    
                    swal(res.data.response)
                  }
                  if (res.data === true) {
                    handleClose()
                    swal("Added successfully")
                    dispatch(fetchCategory())

                  }
                })
    }







  const dispatch = useDispatch()
  useEffect(() => {


    dispatch(fetchCategory())

  }, [dispatch])



  function addHandler() {
    axios.post('/admin/category/add', { categoryName }).then(res => {

      console.log(res.data.response);
      if (res.data.response) {

        swal(res.data.response)
      }
      if (res.data === true) {
        swal("Added successfully")
        dispatch(fetchCategory())
      }

    }) }

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
              dispatch(fetchCategory())
                swal("Category has been deleted!", {
                  icon: "success",
                });
                
              }
  
            })
            // category/delete/:id
  
  
          } else {
            swal("Category is safe!");
          }
        })}






  return (
    <>



      <Sibebar />

      <div className='home-section'>
        <Container>
<CategoryEditModal setNewCategory={setNewCategory} nameError={nameError} setError={setError} oldCategory={oldCategory} newCategory={newCategory} show={show} handleClose={handleClose} editHandler={editHandler}/>
        <Tabs
  defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">

  <Tab eventKey="Category" title="Home">

  <Row className='align-items-center'>
            <h2>Category List</h2>
            <div className='table-Container' >

              <Col sm={12} md={8} className='mx-auto mt-5'>

             {loading? <Loader
        type="Puff"
        color="#00BFFF"
        height={100}
        width={100}
        timeout={3000} //3 secs
/>  :<Table striped bordered hover >
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Category</th>
                      <th>Sub category</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {category.map((category, i) => {
                    
                    


                    return    <tr key={category._id} >
                    <td>{i+1}</td>
                    <td>{category.category}</td>
                    <td>{category?.subCat.length}</td>
                    <td>
            
                      <div className='table-icons'>
                        <i className="fas fa-trash-alt " id={category._id} onClick={deleteHandler}></i>
                        <i className="fas fa-edit" onClick={handleShow} id={category.category}></i>
                      </div>
                    </td>
                   
                  </tr>


               
                    
                    
                    
                    })}
                  </tbody>
                </Table>}

                <div className='add-new mx-3'>
                  <input name='category' placeholder='Enter new category' onChange={(e) => { setCategory(e.target.value) }} />
                  <Button variant='success' onClick={addHandler}>Add new Category</Button>
                </div>
              </Col>



            </div>
          </Row>
  </Tab>
  <Tab eventKey="profile" title="sub category">
    <Subctegory/>
  </Tab>
  {/* <Tab eventKey="contact" title="EDit">
   <EditCtaegoryScreen/>
  </Tab> */}
</Tabs>
      
        </Container>

      </div>
    </>
  )

}

export default CategoryManage
