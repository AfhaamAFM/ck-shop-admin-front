import React, { useEffect, useState,useRef } from "react";
import { Row, Col, Form, Button, FloatingLabel, Spinner,Image,Placeholder } from "react-bootstrap";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategory } from "../../REDUX/category/categoryAction";
import { fetchProduct } from "../../REDUX/PRODUCTS/productAction";
import swal from 'sweetalert'
import ImageEditModal from "./ImageEditModal";
import Swal from "sweetalert2";







const cloudinaryUpload = (image,oldImage) => {

    return new Promise(async (resolve, reject) => {
const {public_id}=oldImage

        axios.post(`/admin/product/uploadImage?public_id=${public_id}`, { image }).then(response => {

            return resolve(response.data)
        })

    })

}


function uploadImage(setUploadSuccess,setImageLoading, setImage, setSelectedFile, setUploadMode, selectedFile,image) {

    setUploadSuccess(false)
    setImageLoading(true)
    cloudinaryUpload(selectedFile,image).then(response => {

        setImage(response)
        setSelectedFile(response.img)
        setImageLoading(false)
        setUploadMode(false)
        setUploadSuccess(true)
    })
}



function EditProductScreen() {
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [subCat, setSUbCat] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [small, setSmall] = useState(1);
    const [large, setLarge] = useState(1);
    const [medium, setMedium] = useState(1);
    const [quantity, setQuantity] = useState(0);
    const [warning, setWarning] = useState("");
    const [selectedFile, setSelectedFile] = useState([]);
    const [subcategory, setSubcategory] = useState();
    const { category: categoryData } = useSelector((state) => state.category);
    const { product } = useSelector(state => state.product)
    const [addLoading, setLoading] = useState(false);
    const [editMode, setEditMode] = useState(true)
    const [thisProduct, setThisProduct] = useState('')
    const [selectedProducts, setSelectedProducts] = useState('')
    const [_id,setid]=useState()


// modales states and function
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

const uploadImage1 = () => { uploadImage(setUpload1Success, setImageLoading1, setImage1, setSelectedFile1, setUploadMode1, selectedFile1,image1) }
const uploadImage2 = () => { uploadImage(setUpload2Success, setImageLoading2, setImage2, setSelectedFile2, setUploadMode2, selectedFile2,image2) }
const uploadImage3 = () => { uploadImage(setUpload3Success, setImageLoading3, setImage3, setSelectedFile3, setUploadMode3, selectedFile3,image3) }
const uploadImage4 = () => { uploadImage(setUpload4Success, setImageLoading4, setImage4, setSelectedFile4, setUploadMode4, selectedFile4,image4) }


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
 
 async function productShowHandler() {

const data = await product.find(value=>value.name===thisProduct)
const editThis =data
setImage1(editThis.imageUrl[0])
setImage2(editThis.imageUrl[1])
setImage3(editThis.imageUrl[2])
setImage4(editThis.imageUrl[3])
setSelectedFile1(editThis.imageUrl[0].img)
setSelectedFile2(editThis.imageUrl[1].img)
setSelectedFile3(editThis.imageUrl[2].img)
setSelectedFile4(editThis.imageUrl[3].img)
setEditMode(false)
setName(editThis.name)
setCategory(editThis.category)
setSUbCat(editThis.subCat)
setPrice(editThis.price)
setName(editThis.name)
setDescription(editThis.description)
setSmall(editThis.small)
setMedium(editThis.medium)
setLarge(editThis.large)
setid(editThis._id)

return;


    }





    // IMAGE HANDLER START
 

    // iMAGE HANDLER END


    const subCatHandler = (e) => {
        setCategory(e.target.value);
        dispatch(fetchCategory());
        const selected = categoryData.filter(
            (value) => value.category === e.target.value
        );
        setSubcategory(selected[0].subCat)
    };

    function productHandler(e) {
       
        const selected = product.filter((value) => value.category === category && value.subCat === e.target.value)
    
        setSelectedProducts(selected)
    }

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
      
        
        let productData = { name, category, subCat, price, description, small, medium, large, imageUrl,_id }
        setLoading(true)

            axios.post('/admin/product/edit', productData).then(response => {

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
                    swal("Success", "product Edited sucessfully", "success");
                    setWarning('')
                    setLoading(false)
                setUpload1Success(false)


                }
            })

       
    }

    useEffect(() => {
        dispatch(fetchProduct())
    }, [category, dispatch,thisProduct])

    return (
        <div>



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



            <div className="addProductForm ">
                <h1 variant="border-primary" className='mb-5'>Edit Product</h1>
                <Row>
                    <h2 variant="border-primary" className='mb-2'>Select product to edit</h2>
                    {/* Edit mode  */}
                    <Row className="mb-3">
                        <Form.Group as={Col} sm={12} md={6} controlId="formCategory">
                            <Form.Label>Select category</Form.Label>
                            <Form.Select onChange={subCatHandler} >
                                <option defaultValue >Select category </option>
                                {categoryData ? (
                                    categoryData.map((value) => {
                                        return (
                                            <option id={value._id} key={value._id}>
                                                {value.category}
                                            </option>
                                        );
                                    })
                                ) : (
                                    <option>Category</option>
                                )}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group as={Col} sm={12} md={6} controlId="formsubCategory">
                            <Form.Label>sub category</Form.Label>
                            <Form.Select
                                onChange={productHandler} >
                                    <option defaultValue>Sub Category</option>
                                {subcategory &&
                                    subcategory.map((value, i) => {
                                        return <option key={i}>{value}</option>;
                                    })}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group as={Col} sm={12} md={6} controlId="formsubCategory">
                            <Form.Label>Products</Form.Label>
                            <Form.Select className='mb-3'
                                onChange={(e) => {
                                    setThisProduct(e.target.value);
                                }}
                            >
                                 <option defaultValue>Products</option>
                                {selectedProducts &&
                                    selectedProducts.map((value, i) => {
                                        return <option id={value._id} key={i}>{value.name}</option>;
                                    })}
                            </Form.Select>
                            <Button onClick={productShowHandler} variant='danger'> edit this Product </Button>
                        </Form.Group>
                    </Row>

                </Row>
                {/* Edit mode  */}
                <Form onSubmit={handleSubmitHandler}>
                    <Row>
                        <Col sm={12} md={6}>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>Product Name</Form.Label>
                                    <Form.Control
                                 value={name}
                                        disabled={editMode}
                                        type="text"
                                        placeholder="Enter product name"
                                        onChange={(e) => {
                                            setName(e.target.value);
                                        }}
                                    />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formCategory">
                                    <Form.Label>Select category</Form.Label>
                                    <Form.Select value={category} onChange={subCatHandler} disabled={editMode} defaultValue="Category">
                                        <option defaultValue> Select category</option>
                                        {categoryData ? (
                                            categoryData.map((value) => {
                                                return (
                                                    <option id={value._id} key={value._id}>
                                                        {value.category}
                                                    </option>
                                                );
                                            })
                                        ) : (
                                            <option>Category</option>
                                        )}
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group as={Col} controlId="formsubCategory">
                                    <Form.Label>sub category</Form.Label>
                                    <Form.Select
                                    value={subCat}
                                        disabled={editMode}
                                        onChange={(e) => {
                                            setSUbCat(e.target.value);
                                        }}
                                    >
                                         <option defaultValue>Sub Category</option>
                                        {subcategory &&
                                            subcategory.map((value, i) => {
                                                return <option key={i}>{value}</option>;
                                            })}
                                    </Form.Select>
                                </Form.Group>
                            </Row>
                            <Form.Group as={Col} controlId="formPrice" className="mb-3">
                                <Form.Label>Enter Price</Form.Label>
                                <Form.Control
                                value={price}
                                    disabled={editMode}
                                    onChange={(e) => {
                                        setPrice(e.target.value);
                                    }}
                                    type="number"
                                />
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
                                            disabled={editMode}
                                            onChange={(e) => {
                                                setDescription(e.target.value);
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
                                    <Form.Control
                                    value={small}
                                        disabled={editMode}
                                        type="number"
                                        onChange={(e) => {
                                            setSmall(e.target.value);
                                        }}
                                    />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formLarge">
                                    <Form.Label>Medium</Form.Label>
                                    <Form.Control
                                    value={medium}
                                        disabled={editMode}
                                        type="number"
                                        onChange={(e) => {
                                            setMedium(e.target.value);
                                        }}
                                    />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridZip">
                                    <Form.Label>Large</Form.Label>
                                    <Form.Control
                                    value={large}
                                        disabled={editMode}
                                        type="number"
                                        onChange={(e) => {
                                            setLarge(e.target.value);
                                        }}
                                    />
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
                                        : <Button variant='danger' disabled={editMode} onClick={imageCropShow1} className='my-3' > Select Image 1</Button>}

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
                                        : <Button variant='danger' disabled={editMode} onClick={imageCropShow2} className='my-3' > Select Image 2</Button>}

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
                                        : <Button variant='danger' disabled={editMode} onClick={imageCropShow3} className='my-3' > Select Image 3</Button>}

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
                                        : <Button variant='danger' disabled={editMode} onClick={imageCropShow4} className='my-3' > Select Image 4</Button>}

                                </Row>
                            </Col>
                            </Row>
                            {addLoading?<Spinner animation="border" />
                       : <Button variant="primary" type="submit">
                           Edit this now
                        </Button>}
                            <h5 className="warning-text  mt-3">{warning}</h5>
                        </Col>
                    </Row>
                </Form>
            </div>
        </div>
    );
}

export default EditProductScreen;
