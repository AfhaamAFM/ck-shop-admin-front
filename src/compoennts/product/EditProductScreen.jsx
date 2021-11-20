import React, { useEffect, useState,useRef } from "react";
import { Row, Col, Form, Button, FloatingLabel, Spinner } from "react-bootstrap";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategory } from "../../REDUX/category/categoryAction";
import { fetchProduct } from "../../REDUX/PRODUCTS/productAction";
import swal from 'sweetalert'

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
    const [previewSource1, setPreviewSOurce1] = useState('')
    const [previewSource2, setPreviewSOurce2] = useState('')
    const [previewSource3, setPreviewSOurce3] = useState('')
    const [previewSource4, setPreviewSOurce4] = useState('')
    const [_id,setid]=useState()
 
    function productShowHandler() {

const data = product.filter(value=>value.name===thisProduct)
const editThis =data[0]
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
editThis.imageUrl.map(value=>{
  setPreviewSOurce1(value.img)
 setPreviewSOurce2(value.img)
 setPreviewSOurce3(value.img)
setPreviewSOurce4(value.img)
return;
})


    }





    // IMAGE HANDLER START
    function makeSourcePreview(image, state) {

        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onloadend = () => {
            state(reader.result)
        }
        console.log(reader.result);
    }



    function imageHandler1(e) {

        makeSourcePreview(e.target.files[0], setPreviewSOurce1)
        console.log(e.target);
        setSelectedFile(prev => [...prev, e.target.files[0]])
    }


    function imageHandler2(e) {

        makeSourcePreview(e.target.files[0], setPreviewSOurce2)
        console.log(e.target);
        setSelectedFile(prev => [...prev, e.target.files[0]])
    }


    function imageHandler3(e) {

        makeSourcePreview(e.target.files[0], setPreviewSOurce3)
        console.log(e.target);
        setSelectedFile(prev => [...prev, e.target.files[0]])
    }


    function imageHandler4(e) {

        makeSourcePreview(e.target.files[0], setPreviewSOurce4)
        console.log(e.target);
        setSelectedFile(prev => [...prev, e.target.files[0]])
    }

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
        console.log('reachd');
        console.log(e.target.value);
        const selected = product.filter((value) => value.category === category && value.subCat === e.target.value)
        console.log(selected);
        setSelectedProducts(selected)
    }



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
        axios.post("/admin/product/addImage", formData).then(response => {
            const imageUrl = response.data

            let productData = { name, category, subCat, price, description, small, medium, large, imageUrl,_id }



            axios.post('/admin/product/edit',productData).then(response=>{

            if(response.data.response){

                setWarning(response.data.response)
                setLoading(false)
            }else if(response.data){
                swal("Success", "product edited sucessfully", "success");
              setLoading(false)


            }
            })

        })
    }


    useEffect(() => {
        dispatch(fetchProduct())
    }, [category, dispatch,thisProduct])


    return (
        <div>
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
                                <Form.Group
                                    as={Col}
                                    sm={12}
                                    md={6}
                                    controlId="formFileLg"
                                    className="mb-3"
                                >

                                    <img src={previewSource1} className='image_preview' alt="productimage" />
                                    <Form.Label>Image 1</Form.Label>
                                    <Form.Control type="file" size="md" disabled={editMode} onChange={imageHandler1} />
                                </Form.Group>
                                <Form.Group
                                    as={Col}
                                    sm={12}
                                    md={6}
                                    controlId="formFileLg"
                                    className="mb-3"
                                >
                                    <img src={previewSource2} className='image_preview' alt="productimage" />
                                    <Form.Label>Image 2</Form.Label>
                                    <Form.Control type="file" size="md" disabled={editMode} onChange={imageHandler2} />
                                </Form.Group>
                                <Form.Group
                                    as={Col}
                                    sm={12}
                                    md={6}
                                    controlId="formFileLg"
                                    className="mb-3"
                                >
                                    <img src={previewSource3} className='image_preview' alt="productimage" />
                                    <Form.Label>Image 3</Form.Label>
                                    <Form.Control type="file" size="md" disabled={editMode} onChange={imageHandler3} />
                                </Form.Group>
                                <Form.Group
                                    as={Col}
                                    sm={12}
                                    md={6}
                                    controlId="formFileLg"
                                    className="mb-3"
                                >.
                                    <img src={previewSource4} className='image_preview' alt="productimage" />

                                    <Form.Label>Image 4</Form.Label>
                                    <Form.Control type="file" size="md" disabled={editMode} onChange={imageHandler4} />
                                </Form.Group>
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
