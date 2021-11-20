import React, { useState } from "react";
import { Col, Form, Row, Table, Button } from "react-bootstrap";
import Loader from "react-loader-spinner";
import CategoryTableRow from "../../Tables/CategoryTableRow";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategory } from "../../../REDUX/category/categoryAction";
import axios from 'axios'
import swal from 'sweetalert'
import SUbCategoryROw from "./SUbCategoryROw";
// import { Container, Row, Table, Col, Button, Tab ,Tabs} from 'react-bootstrap'
// import SubcategoryTable from '../../Tables/Product'


function Subctegory() {
  const [loading, setLoading] = useState("");
  const dispatch = useDispatch()
  const [selectedCategory, setSelectedCategory] = useState('')
  const [subcatgory, setSubCategory] = useState('')
  const [_id, setcurrentId] = useState('')
  const { category: categoryData } = useSelector((state) => state.category);
  const { product } = useSelector((state) => state.product);
const[subCat,setSubCat]=useState('')


  function showSubHandler() {
    setLoading(true)
    dispatch(fetchCategory())
    const data = categoryData.filter(value => value.category === selectedCategory)
    setcurrentId(data[0]._id)
    setSubCategory(data[0].subCat)
    setLoading(false)
  }
  function addHandler() {
    axios.post('/admin/category/sub/add', { _id,subCat }).then(res => {

     
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
    <div>
      <Row className="align-items-center">
        <h2>Category List</h2>
        <div className="table-Container">
          <Row>
            <Form.Group as={Col} sm={12} md={6} controlId="formsubCategory">
              <Form.Label>Select Category</Form.Label>
              <Form.Select
                className="mb-3"
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                }}
              >
                <option defaultValue>Show Sub category</option>
                {categoryData &&
                  categoryData.map((value, i) => {
                    return (
                      <option id={value._id} key={i}>
                        {value.category}
                      </option>
                    )
                  })}
              </Form.Select>
              <Button onClick={showSubHandler} variant="danger">
                {" "}
                edit this Product{" "}
              </Button>
            </Form.Group>
          </Row>
          <Col sm={12} md={8} className="mx-auto mt-5">
            {loading ? (
              <Loader
                type="Puff"
                color="#00BFFF"
                height={100}
                width={100}
                timeout={3000} //3 secs
              />
            ) : (
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Sub category</th>
                    {/* <th>Product count</th> */}
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {subcatgory && subcatgory.map((value, i) => { return <SUbCategoryROw subCategory={value} no={i + 1} key={i} id={_id} /> })}
                </tbody>
              </Table>
            )}

            <div className="add-new mx-3">
              <input name='subCat' placeholder='Enter new category' onChange={(e) => { setSubCat(e.target.value) }} />
              * <Button variant='success' onClick={addHandler}>Add new Category</Button>
            </div>
          </Col>
        </div>
      </Row>
    </div>
  );
}

export default Subctegory;
