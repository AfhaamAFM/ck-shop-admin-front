import React, { useEffect, useState } from "react";
import { Row, Col, Form, Button, FloatingLabel,Spinner } from "react-bootstrap";
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { fetchCategory } from "../../REDUX/category/categoryAction";
import swal from 'sweetalert';





function AddProductScreen() {



    const dispatch = useDispatch()
    const [name, setName] = useState('')
    const [category, setCategory] = useState('')
    const [subCat, setSUbCat] = useState('')
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState('')
    const [small, setSmall] = useState(1)
    const [large, setLarge] = useState(1)
    const [medium, setMedium] = useState(1)
    const [quantity, setQuantity] = useState(0)
    const [warning, setWarning] = useState('')
    const [selectedFile, setSelectedFile] = useState([])
    const [subcategory, setSubcategory] = useState()
    const { category: categoryData } = useSelector(state => state.category)
    const [addLoading, setLoading] = useState(false)

    useEffect(() => {

        dispatch(fetchCategory())

    }, [])

    // category drop down start

    const subCatHandler = (e) => {


        setCategory(e.target.value)
        dispatch(fetchCategory())
        const selected = categoryData.filter(value => value.category === e.target.value)
        setSubcategory(selected[0].subCat)

    }
    // category drop down ENd

    function imageHandler(e) {
        console.log(e.target);
        setSelectedFile(prev => [...prev, e.target.files[0]])



    }

    // // submitting the product start
    function handleSubmitHandler(e) {

        // console.log({name,category,subCat,price,description,small,medium,large,quantity,selectedFile});
        e.preventDefault()
        // validation start
        if (name === '' || category === '' || subCat === '' || price === '' || description === '') {

            return setWarning('Fill all fields')
        }


        // validation end

        if (selectedFile.length < 4 || selectedFile.length > 4) {
            return setWarning('upload 4 images')
        }
        let formData = new FormData();

        selectedFile.forEach(file => {
            formData.append("image", file);
        })
        setLoading(true)
        console.log(formData);
        formData.append("image", selectedFile);
        axios.post("http://localhost:5000/admin/product/addImage", formData).then(response => {
            const imageUrl = response.data

            let productData = { name, category, subCat, price, description, small, medium, large, imageUrl }



            axios.post('http://localhost:5000/admin/product/add',productData).then(response=>{

            if(response.data.response){

                setWarning(response.data.response)
                setLoading(false)
            }else if(response.data){
                swal("Success", "product added sucessfully", "success");
              setLoading(false)


            }
            })

        })
    }

    // submitting the product end


    return (
        <div className="addProductForm ">
            <Row>
                <Col sm={12} className="text-align-center">
                    <h1 variant="border-primary">Add Product</h1>
                </Col>
            </Row>
            <Form onSubmit={handleSubmitHandler}>
                <Row>
                    <Col sm={12} md={6}>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>Product Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter product name"

                                    onChange={(e) => {
                                        setName(e.target.value)
                                    }} />
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formCategory">
                                <Form.Label>Select category</Form.Label>
                                <Form.Select onChange={subCatHandler} defaultValue="Category">
                                    <option></option>
                                    {categoryData ? categoryData.map((value) => {

                                        return <option id={value._id} key={value._id} >{value.category}</option>
                                    }) : <option >Category</option>}



                                </Form.Select>
                            </Form.Group>
                            <Form.Group as={Col} controlId="formsubCategory">
                                <Form.Label>sub category</Form.Label>
                                <Form.Select onChange={(e) => {
                                    setSUbCat(e.target.value)
                                }}>

                                    {subcategory && subcategory.map((value, i) => {
                                        return <option key={i}>{value}</option>
                                    })}
                                </Form.Select>
                            </Form.Group>
                        </Row>
                        <Form.Group as={Col} controlId="formPrice" className="mb-3">
                            <Form.Label>Enter Price</Form.Label>
                            <Form.Control onChange={(e) => {
                                setPrice(e.target.value)
                            }} type='number' />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGridDesciption">
                            <Form.Label>Enter description</Form.Label>
                            <>
                                <FloatingLabel

                                    controlId="floatingTextarea2"
                                    label="Enter a description"
                                >
                                    <Form.Control
                                        onChange={(e) => {
                                            setDescription(e.target.value)
                                        }}
                                        as="textarea"
                                        placeholder="Enter a description"
                                        style={{ height: "100px" }}
                                    />
                                </FloatingLabel>
                            </>
                        </Form.Group>



                    </Col>
                    <Col sm={12} md={6}>
                        <h4>Enter size available</h4>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formSmall">
                                <Form.Label>small</Form.Label>
                                <Form.Control type='number' onChange={(e) => {
                                    setSmall(e.target.value)
                                }} />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formLarge">
                                <Form.Label>Medium</Form.Label>
                                <Form.Control type='number' onChange={(e) => {
                                    setMedium(e.target.value)
                                }} />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridZip">
                                <Form.Label>Large</Form.Label>
                                <Form.Control type='number' onChange={(e) => {
                                    setLarge(e.target.value)
                                }} />
                            </Form.Group>
                        </Row>
                        <h5>Total quantity: {quantity}</h5>

                        <Row>
                            <Form.Group
                                as={Col}
                                sm={12}
                                md={6}
                                controlId="formFileLg"
                                className="mb-3"
                            >
                                <Form.Label>Image 1</Form.Label>
                                <Form.Control type="file" size="md" onChange={imageHandler} />
                            </Form.Group>
                            <Form.Group
                                as={Col}
                                sm={12}
                                md={6}
                                controlId="formFileLg"
                                className="mb-3"
                            >
                                <Form.Label>Image 2</Form.Label>
                                <Form.Control type="file" size="md" onChange={imageHandler} />
                            </Form.Group>
                            <Form.Group
                                as={Col}
                                sm={12}
                                md={6}
                                controlId="formFileLg"
                                className="mb-3"
                            >
                                <Form.Label>Image 3</Form.Label>
                                <Form.Control type="file" size="md" onChange={imageHandler} />
                            </Form.Group>
                            <Form.Group
                                as={Col}
                                sm={12}
                                md={6}
                                controlId="formFileLg"
                                className="mb-3"
                            >
                                <Form.Label>Image 4</Form.Label>
                                <Form.Control type="file" size="md" onChange={imageHandler} />
                            </Form.Group>
                        </Row>

                        {addLoading?<Spinner animation="border" />
                       : <Button variant="primary" type="submit">
                            Add new product
                        </Button>}
                        <h5 className='warning-text  mt-3'>{warning}</h5>
                    </Col>
                </Row>
            </Form>

        </div>
    );
}

export default AddProductScreen;
