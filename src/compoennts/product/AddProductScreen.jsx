import React, { useEffect, useState } from "react";
import { Row, Col, Form, Button, FloatingLabel, Spinner, Image, Placeholder } from "react-bootstrap";
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { fetchCategory } from "../../REDUX/category/categoryAction";
import swal from 'sweetalert';
import validator from "../../simple-react-form-validation-helper/validationHelpers";
import ImageEditModal from "./ImageEditModal";
import { logDOM } from "@testing-library/react";
import { fetchProduct } from "../../REDUX/PRODUCTS/productAction";
// import validator from '../../simple-react-form-validation-helper'


const cloudinaryUpload = (image) => {

    return new Promise(async (resolve, reject) => {

        axios.post('/admin/product/uploadImage', { image }).then(response => {

            return resolve(response.data)
        })

    })

}


function uploadImage(setUploadSuccess,setImageLoading, setImage, setSelectedFile, setUploadMode, selectedFile) {

    setUploadSuccess(false)
    setImageLoading(true)
    cloudinaryUpload(selectedFile).then(response => {

        setImage(response)
        setSelectedFile(response.img)
        setImageLoading(false)
        setUploadMode(false)
        setUploadSuccess(true)
    })
}

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

    const [subcategory, setSubcategory] = useState('')
    const { category: categoryData } = useSelector(state => state.category)
    const [addLoading, setLoading] = useState(false)





    // image modal controller start
    const [cropper, setCropper] = useState();

    const [selectedFile1, setSelectedFile1] = useState('https://cdn3.vectorstock.com/i/1000x1000/35/52/placeholder-rgb-color-icon-vector-32173552.jpg')
    const [selectedFile2, setSelectedFile2] = useState('https://cdn3.vectorstock.com/i/1000x1000/35/52/placeholder-rgb-color-icon-vector-32173552.jpg')
    const [selectedFile3, setSelectedFile3] = useState('https://cdn3.vectorstock.com/i/1000x1000/35/52/placeholder-rgb-color-icon-vector-32173552.jpg')
    const [selectedFile4, setSelectedFile4] = useState('https://cdn3.vectorstock.com/i/1000x1000/35/52/placeholder-rgb-color-icon-vector-32173552.jpg')

    const [image1, setImage1] = useState('')
    const [image2, setImage2] = useState('')
    const [image3, setImage3] = useState('')
    const [image4, setImage4] = useState('')

    const [editImageShow1, seteditImageShow1] = useState(false);
    const [editImageShow2, seteditImageShow2] = useState(false);
    const [editImageShow3, seteditImageShow3] = useState(false);
    const [editImageShow4, seteditImageShow4] = useState(false);

    const [uploadMode1, setUploadMode1] = useState(false)
    const [uploadMode2, setUploadMode2] = useState(false)
    const [uploadMode3, setUploadMode3] = useState(false)
    const [uploadMode4, setUploadMode4] = useState(false)

    const [imageLoading1, setImageLoading1] = useState(false)
    const [imageLoading2, setImageLoading2] = useState(false)
    const [imageLoading3, setImageLoading3] = useState(false)
    const [imageLoading4, setImageLoading4] = useState(false)


    const [upload1Success, setUpload1Success] = useState(false)
    const [upload2Success, setUpload2Success] = useState(false)
    const [upload3Success, setUpload3Success] = useState(false)
    const [upload4Success, setUpload4Success] = useState(false)

    const uploadImage1 = () => { uploadImage(setUpload1Success, setImageLoading1, setImage1, setSelectedFile1, setUploadMode1, selectedFile1) }
    const uploadImage2 = () => { uploadImage(setUpload2Success, setImageLoading2, setImage2, setSelectedFile2, setUploadMode2, selectedFile2) }
    const uploadImage3 = () => { uploadImage(setUpload3Success, setImageLoading3, setImage3, setSelectedFile3, setUploadMode3, selectedFile3) }
    const uploadImage4 = () => { uploadImage(setUpload4Success, setImageLoading4, setImage4, setSelectedFile4, setUploadMode4, selectedFile4) }


    const imageCropShow1 = () => { seteditImageShow1(true) }
    const imageCropShow2 = () => { seteditImageShow2(true) }
    const imageCropShow3 = () => { seteditImageShow3(true) }
    const imageCropShow4 = () => { seteditImageShow4(true) }

    // get crop data
    const getCropData = (setState,state) => {

        if (typeof cropper !== "undefined") {
            setState(cropper.getCroppedCanvas().toDataURL())
        }

    };
    //   show image handler


    // image modal controller end

    useEffect(() => {

        dispatch(fetchCategory())

    }, [])

    // category drop down start

    const subCatHandler = (e) => {

        if (e.target.value === '' || e.target.value === null) {
            return setWarning('Invalid entry')
        }
        setCategory(e.target.value)
        dispatch(fetchCategory())
        const selected = categoryData.find(value => value.category === e.target.value)
        selected && setSubcategory(selected.subCat)

    }
    // category drop down ENd




    // // submitting the product start
    function handleSubmitHandler(e) {

        e.preventDefault()
        // validation start
        if (name === '' || category === '' || subCat === '' || price === '' || description === '') {

            return setWarning('Fill all fields')
        }
         if (!image1||!image2||!image3||!image4) {

            return setWarning('Upload all images')
        }


        // validation end

      

        const imageUrl = [
            image1,image2,image3,image4
        ]
      
        console.log(imageUrl);
        let productData = { name, category, subCat, price, description, small, medium, large, imageUrl }
        setLoading(true)

            axios.post('/admin/product/add', productData).then(response => {

                if (response.data.response) {

                    setWarning(response.data.response)
                    setLoading(false)
                } else if (response.data) {

dispatch(fetchProduct())
                    setName('')
                    setCategory('')
                    setPrice()
                    setDescription('')
                    setSmall(0)
                    setMedium(0)
                    setLarge(0)
                    setSelectedFile1('https://cdn3.vectorstock.com/i/1000x1000/35/52/placeholder-rgb-color-icon-vector-32173552.jpg')
                    setSelectedFile2('https://cdn3.vectorstock.com/i/1000x1000/35/52/placeholder-rgb-color-icon-vector-32173552.jpg')
                    setSelectedFile3('https://cdn3.vectorstock.com/i/1000x1000/35/52/placeholder-rgb-color-icon-vector-32173552.jpg')
                    setSelectedFile4('https://cdn3.vectorstock.com/i/1000x1000/35/52/placeholder-rgb-color-icon-vector-32173552.jpg')
                    swal("Success", "product added sucessfully", "success");
                    setWarning('')
                    setLoading(false)
                setUpload1Success(false)


                }
            })

       
    }

    // submitting the product end
    return (
        <div className="addProductForm ">
            {/* Image crop modall */}

            <ImageEditModal editImageShow={editImageShow1}
                seteditImageShow={seteditImageShow1}
                ShowImageHandler={() => {
                    getCropData(setSelectedFile1, selectedFile1)
                    setUploadMode1(true)
                    seteditImageShow1(false)
                }}
                setCropper={setCropper}

            />


            <ImageEditModal editImageShow={editImageShow2}
                seteditImageShow={seteditImageShow2}
                ShowImageHandler={() => {
                    getCropData(setSelectedFile2)
                    setUploadMode2(true)
                    seteditImageShow2(false)
                }}
                setCropper={setCropper}

            />
            <ImageEditModal editImageShow={editImageShow3}
                seteditImageShow={seteditImageShow3}
                ShowImageHandler={() => {
                    getCropData(setSelectedFile3)
                    setUploadMode3(true)
                    seteditImageShow3(false)
                }}
                setCropper={setCropper}

            />
            <ImageEditModal editImageShow={editImageShow4}
                seteditImageShow={seteditImageShow4}
                ShowImageHandler={() => {
                    getCropData(setSelectedFile4)
                    setUploadMode4(true)
                    seteditImageShow4(false)
                }}
                setCropper={setCropper}

            />
            {/* image crop modal end */}
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
                                    value={name}
                                    onChange={(e) => {
                                        setName(e.target.value)
                                    }} />
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formCategory">
                                <Form.Label>Select category</Form.Label>
                                <Form.Select
                                    value={category} onChange={subCatHandler} defaultValue="Category">
                                    <option defaultValue>select Category</option>
                                    {categoryData ? categoryData.map((value) => {

                                        return <option id={value._id} key={value._id} >{value.category}</option>
                                    }) : <option >Category</option>}



                                </Form.Select>
                            </Form.Group>
                            <Form.Group as={Col} controlId="formsubCategory">
                                <Form.Label>sub category</Form.Label>
                                <Form.Select value={subCat} onChange={(e) => {
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
                            <Form.Control value={price} min={1} onChange={(e) => {
                                setPrice(e.target.value)
                                validator.priceInputBlurHandler(e.target.value, setWarning)
                            }} type='text' />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGridDesciption">
                            <Form.Label>Enter description</Form.Label>
                            <>
                                <FloatingLabel

                                    controlId="floatingTextarea2"
                                    label="Enter a description"
                                >
                                    <Form.Control
                                        value={description}
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
                                <Form.Control value={small} min={0} type='number' onChange={(e) => {

                                    setSmall(e.target.value)
                                }} />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formLarge">
                                <Form.Label>Medium</Form.Label>
                                <Form.Control value={medium} min={0} type='number' onChange={(e) => {
                                    setMedium(e.target.value)
                                }} />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridZip">
                                <Form.Label>Large</Form.Label>
                                <Form.Control value={large} min={0} type='number' onChange={(e) => {
                                    setLarge(e.target.value)
                                }} />
                            </Form.Group>
                        </Row>
                        <h5>Total quantity: {quantity}</h5>

                        <Row>
                            <Col sm={12} md={6} className="mb-3"
                            >
                                <Row>
                                    <Col className='d-flex'>
                                        <Image src={selectedFile1} className='image_preview mb-3' alt="productimage" fluid />
                                        {upload1Success && <h4 style={{ color: 'green' }}> <i className="fas fa-check"></i></h4>}
                                        <h6 className='m-3'> Image 1</h6>
                                    </Col>
                                    {imageLoading1 ? <Placeholder as="p" animation="glow">
                                        <Placeholder xs={12} bg='danger' size='lg' />
                                    </Placeholder> : uploadMode1 ?
                                        <Button variant='danger' onClick={uploadImage1} className='my-3' >Upload Image 1</Button>
                                        : <Button variant='danger' onClick={imageCropShow1} className='my-3' > Select Image 1</Button>}

                                </Row>
                            </Col>

                            <Col sm={12} md={6} className="mb-3"
                            >
                                <Row>
                                    <Col className='d-flex'>
                                        <Image src={selectedFile2} className='image_preview mb-3' alt="productimage" fluid />
                                        {upload2Success && <h4 style={{ color: 'green' }}> <i className="fas fa-check"></i></h4>}
                                        <h6 className='m-3'> Image 2</h6>
                                    </Col>
                                    {imageLoading2 ? <Placeholder as="p" animation="glow">
                                        <Placeholder xs={12} bg='danger' size='lg' />
                                    </Placeholder> : uploadMode2 ?
                                        <Button variant='danger' onClick={uploadImage2} className='my-3' >Upload Image 2</Button>
                                        : <Button variant='danger' onClick={imageCropShow2} className='my-3' > Select Image 2</Button>}

                                </Row>
                            </Col>

                            <Col sm={12} md={6} className="mb-3"
                            >
                                <Row>
                                    <Col className='d-flex'>
                                        <Image src={selectedFile3} className='image_preview mb-3' alt="productimage" fluid />
                                        {upload3Success && <h4 style={{ color: 'green' }}> <i className="fas fa-check"></i></h4>}
                                        <h6 className='m-3'> Image 3</h6>
                                    </Col>
                                    {imageLoading3 ? <Placeholder as="p" animation="glow">
                                        <Placeholder xs={12} bg='danger' size='lg' />
                                    </Placeholder> : uploadMode3 ?
                                        <Button variant='danger' onClick={uploadImage3} className='my-3' >Upload Image 3</Button>
                                        : <Button variant='danger' onClick={imageCropShow3} className='my-3' > Select Image 3</Button>}

                                </Row>
                            </Col>
                            <Col sm={12} md={6} className="mb-3"
                            >
                                <Row>
                                    <Col className='d-flex'>
                                        <Image src={selectedFile4} className='image_preview mb-3' alt="productimage" fluid />
                                        {upload4Success && <h4 style={{ color: 'green' }}> <i className="fas fa-check"></i></h4>}
                                        <h6 className='m-3'> Image 4</h6>
                                    </Col>
                                    {imageLoading4 ? <Placeholder as="p" animation="glow">
                                        <Placeholder xs={12} bg='danger' size='lg' />
                                    </Placeholder> : uploadMode4 ?
                                        <Button variant='danger' onClick={uploadImage4} className='my-3' >Upload Image 4</Button>
                                        : <Button variant='danger' onClick={imageCropShow4} className='my-3' > Select Image 4</Button>}

                                </Row>
                            </Col>


                        </Row>

                        {addLoading ? <Spinner animation="border" />
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
