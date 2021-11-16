import React, { useEffect,useState } from 'react'
import { Container, Row, Table,Col, Button } from 'react-bootstrap'
import Sibebar from '../../adminRoutes/Sibebar'

import {useDispatch,useSelector} from 'react-redux'
import { fetchCategory } from '../../../REDUX/category/categoryAction'
import CategoryTableRow from '../../Tables/CategoryTableRow'
import axios from 'axios'
import swal from 'sweetalert'


function CategoryManage() {
  const dispatch = useDispatch()
  useEffect(()=>{

  
    dispatch(fetchCategory())
    
    },[])

  const [categoryName,setCategory]=useState('')


  const {category}=useSelector(state=>state.category)



  function addHandler(){
axios.post('http://localhost:5000/admin/category/add',{categoryName}).then(res=>{

console.log(res.data.response);
if(res.data.response){

  swal(res.data.response)
}
if(res.data===true){
  swal("Added successfully")
  // dispatch(fetchCategory())
}

})


  }

  
    return (
        <>
        <Sibebar/>
        <div className='home-section'>
          <Container>

            <Row>
              <h2>Category List</h2>
            <div className='table-Container' >
         
                 <Col sm={12} md={8} className='mx-auto mt-5'>
                 
                 <Table striped bordered hover >
  <thead>
    <tr>
      <th>#</th>
      <th>Category</th>
      <th>Sub category</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
      {category.map((category,i)=>{return  <CategoryTableRow category={category} no={i+1} key={category._id} id={category._id}/> })} 
  </tbody>
</Table>
                 
        <div className='add-new mx-3'>
          <input name='category'placeholder='Enter new category' onChange={(e)=>{setCategory(e.target.value)}}/>
          <Button variant='success' onClick={addHandler}>Add new Category</Button>
        </div>
                 </Col>
             
       

        </div>
            </Row>
          </Container>
      
        </div>
        </>
    )

}

export default CategoryManage
