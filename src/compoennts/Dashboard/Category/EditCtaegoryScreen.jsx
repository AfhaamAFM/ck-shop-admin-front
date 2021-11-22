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


function EditCtaegoryScreen() {

  const [loading, setLoading] = useState("");
  const dispatch = useDispatch()
  const[newCategory,setNewCategory]=useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [subcatgory, setSubCategory] = useState('')
  const [_id, setcurrentId] = useState('')
  const { category: categoryData } = useSelector((state) => state.category);
  const [editMode,setEditMode]=useState(true)
  const [warning,setWarning]=useState('')
  const { product } = useSelector((state) => state.product);
const[subCat,setSubCat]=useState('')




function editHandler(){
if(!selectedCategory) return setWarning('select category')
setEditMode(false)
}
function saveHandler(){

axios.post('/admin/category/edit',{selectedCategory,newCategory}).then((res)=>{

    if (res.data.response) {

                swal(res.data.response)
              }
              if (res.data === true) {
                swal("Added successfully")
                setEditMode(true)
                dispatch(fetchCategory())
              }
            })
}
//   function showSubHandler() {
//     setLoading(true)
//     dispatch(fetchCategory())
//     const data = categoryData.filter(value => value.category === selectedCategory)
//     setcurrentId(data[0]._id)
//     setSubCategory(data[0].subCat)
//     setLoading(false)
//   }
//   function addHandler() {
//     axios.post('http://localhost:5000/admin/category/sub/add', { _id,subCat }).then(res => {

     
//       if (res.data.response) {

//         swal(res.data.response)
//       }
//       if (res.data === true) {
//         swal("Added successfully")
//         dispatch(fetchCategory())
//       }

//     }) }




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
                }}>
                <option defaultValue>Show Category</option>
                {categoryData &&
                  categoryData.map((value, i) => {
                    return (
                      <option id={value._id} key={i}>
                        {value.category}
                      </option>
                    )
                  })}
              </Form.Select>
              <Button onClick={editHandler} variant="danger">
                {" "}
                edit this Product{" "}
              </Button>
            </Form.Group>
            <Form.Group as={Col} sm={12} md={6} controlId="formsubCategory">
              <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Enter category</Form.Label>
    <Form.Control 
    onChange={(e)=>{setNewCategory(e.target.value)}}
    type="text" placeholder="Enter new category name" disabled={editMode} />
  
  </Form.Group>
  <h4>{warning}</h4>
            </Form.Group>
              <Button className='my-5' disabled={editMode} 
              onClick={saveHandler}
              variant="success">
              Save Category Name
              </Button>
              <hr />
          </Row>
          



        </div>
      </Row>
    </div>
  );
}

export default EditCtaegoryScreen;
