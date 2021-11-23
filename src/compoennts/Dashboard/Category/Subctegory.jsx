import React, { useEffect, useState } from "react";
import { Col, Form, Row, Table, Button } from "react-bootstrap";
import Loader from "react-loader-spinner";
import CategoryTableRow from "../../Tables/CategoryTableRow";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategory } from "../../../REDUX/category/categoryAction";
import axios from 'axios'
import swal from 'sweetalert'
import SUbCategoryROw from "./SUbCategoryROw";
import EditsubCategoryModal from "./EditsubCategoryModal";
// import { Container, Row, Table, Col, Button, Tab ,Tabs} from 'react-bootstrap'
// import SubcategoryTable from '../../Tables/Product'


function Subctegory() {
  const [loading, setLoading] = useState("");
  const dispatch = useDispatch()
  const [selectedCategory, setSelectedCategory] = useState('')
  const [subcatgory, setSubCategory] = useState('')
  const [_id, setcurrentId] = useState('')
  const { category: categoryData } = useSelector((state) => state.category);
  const [warning,setWarning] = useState('')
  const[newsubCat,setNewSubCat]=useState('')
  const { product } = useSelector((state) => state.product);
const[subCat,setSubCat]=useState('')
const [show, setShow] = useState(false);

let oldsubCat


// Modal function start
const handleClose = () => setShow(false);
const handleShow = (e) => {
  
  setShow(true);
  setNewSubCat(e.target.id)
  setSubCat(e.target.id)
 
  console.log(_id)
}
// Modal function end




// sub category edit handler start
const editHandler =(e) =>{

  console.log(oldsubCat)
  console.log(_id)
axios.post('/admin/category/sub/edit/',{_id,subCat,newsubCat}).then((res)=>{

  if (res.data.response)
{
    swal(res.data.response, {
      icon: "fail",
    });
    handleClose()
  }if(res.data){
    dispatch(fetchCategory())
    swal("Category has been edited!", {
      icon: "success",
    });
    handleClose()
  }else {
    dispatch(fetchCategory())
    swal("Editing Fail!", {
      icon: "fail",
    });
    handleClose()
  }

})

}

//  sub category edit handler end





  function showSubHandler(e) {
    // if(!e.target.value||!selectedCategory)  return setWarning('Select a category')
    setLoading(true)
    const data =categoryData.find(value => value.category === e.target.value)
  
    data && setcurrentId(data._id)
    console.log(10);
    data&& setSubCategory(data.subCat)
    data&&setLoading(false)
    console.log(_id , subcatgory);
  }


// Delte handler start





  function deleteHandler(e) {

    const subCat = e.target.id
    console.log(subCat);
   
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
      });


  }
// Delete handler end



  function addHandler() {

    if(!subCat) {
      return setWarning('Select a category') 
    }


    axios.post('/admin/category/sub/add', { _id,subCat }).then(res => {

     
      if (res.data.response) {

        swal(res.data.response)
      }
      if (res.data === true) {
    
        swal("Added successfully")
        setWarning('')
        dispatch(fetchCategory())
      }

    }) }

    useEffect(()=>{

      dispatch(fetchCategory())
    },[dispatch,selectedCategory])
  return (
    <div>



      <EditsubCategoryModal setNewSubCat={setNewSubCat} newsubCat={newsubCat} show={show} handleClose={handleClose} editHandler={editHandler} 
 />
      <Row className="align-items-center">
        <h2>Category List</h2>
        <div className="table-Container">
          <Row>
            <Form.Group as={Col} sm={12} md={6} controlId="formsubCategory">
              <Form.Label>Select Category</Form.Label>
              <Form.Select
            
              placeholder='select category'
                className="mb-3"
                onChange={showSubHandler}
              >
                
                {categoryData &&
                  categoryData.map((value, i) => {
                    return (
                      <option id={value._id} key={i}>
                        {value.category}
                      </option>
                    )
                  })}
              </Form.Select>
             
            </Form.Group>
            <h4>{warning}</h4>
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
                  {subcatgory && subcatgory.map((value, i) => { 
                    
                    
                        // const {subCat}=category
                        // const count=subCat?.length
                    
                    return   <>  <tr >
                    <td>{i}</td>
                    <td>{value}</td>
                    {/* <td>{count}</td> */}
                    <td>
            
                      <div className='table-icons'>
                        <i className="fas fa-trash-alt" id={value}  onClick={deleteHandler}></i>
                        <i className="fas fa-edit" id={value} onClick={handleShow} ></i>
                      </div>
                    </td>
                   
                  </tr>
             </>
                // <SUbCategoryROw subCategory={value} no={i + 1} key={i} id={_id} handleShow={handleShow}/> 
                
                
                })}
                </tbody>
              </Table>
            )}

            <div className="add-new mx-3">
              <input name='subCat' placeholder='Enter new category' onChange={(e) => { setSubCat(e.target.value) }} />
             <Button variant='success' onClick={addHandler}>Add new Category</Button>
            </div>
          </Col>
        </div>
      </Row>
    </div>
  );
}

export default Subctegory;
