import React, { useEffect, useState } from 'react'
import { Container, Row, Table, Col, Button, Tab ,Tabs} from 'react-bootstrap'
import Sibebar from '../../adminRoutes/Sibebar'
import Loader from "react-loader-spinner";

import { useDispatch, useSelector } from 'react-redux'
import { fetchCategory } from '../../../REDUX/category/categoryAction'
import CategoryTableRow from '../../Tables/CategoryTableRow'
import axios from 'axios'
import swal from 'sweetalert'
import Subctegory from './Subctegory';


function CategoryManage() {
  const dispatch = useDispatch()
  useEffect(() => {


    dispatch(fetchCategory())

  }, [dispatch])

  const [categoryName, setCategory] = useState('')


  const { category, loading } = useSelector(state => state.category)



  function addHandler() {
    axios.post('http://localhost:5000/admin/category/add', { categoryName }).then(res => {

      console.log(res.data.response);
      if (res.data.response) {

        swal(res.data.response)
      }
      if (res.data === true) {
        swal("Added successfully")
        dispatch(fetchCategory())
      }

    })


  }


  return (
    <>
      <Sibebar />
      <div className='home-section'>
        <Container>

        <Tabs
  defaultActiveKey="home"
  transition={false}
  id="noanim-tab-example"
  className="mb-3"
>
  <Tab eventKey="home" title="Home">
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
                    {category.map((category, i) => { return <CategoryTableRow category={category} no={i + 1} key={category._id} id={category._id} /> })}
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
  <Tab eventKey="contact" title="Contact">
    {/* <Sonnet /> */}
  </Tab>
</Tabs>
      
        </Container>

      </div>
    </>
  )

}

export default CategoryManage
