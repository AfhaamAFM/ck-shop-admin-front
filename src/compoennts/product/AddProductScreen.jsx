import React, { useEffect, useState } from "react";
import { Row, Col, Form, Button, FloatingLabel,Spinner } from "react-bootstrap";
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { fetchCategory } from "../../REDUX/category/categoryAction";
import swal from 'sweetalert';
import validator from "../../simple-react-form-validation-helper/validationHelpers";
// import validator from '../../simple-react-form-validation-helper'




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
    const [selectedFile1, setSelectedFile1] = useState('')
    const [selectedFile2, setSelectedFile2] = useState('')
    const [selectedFile3, setSelectedFile3] = useState('')
    const [selectedFile4, setSelectedFile4] = useState('')
    const [subcategory, setSubcategory] = useState('')
    const { category: categoryData } = useSelector(state => state.category)
    const [addLoading, setLoading] = useState(false)
const[previewSource1,setPreviewSOurce1]=useState('data:image/jpeg;base64,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')
const[previewSource2,setPreviewSOurce2]=useState('data:image/jpeg;base64,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')
const[previewSource3,setPreviewSOurce3]=useState('data:image/jpeg;base64,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')
const[previewSource4,setPreviewSOurce4]=useState('data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8NEA8PDRAPDg8PDxAVFRAVFRAQERAQFhIXGBUVGBcYHSggGholGxYVITMhKCkrLi8uFyEzODMsNygtLi0BCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAAAQUDBAYCB//EAEAQAAICAQIDBAYHBAoDAQAAAAABAgMRBBIFITEGE0FRImFxgZGhFCMyM3OxsjRSs8EVJUJTYnKCktHwdIPhJP/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwD7iAAIBIAgkACAAAAAAAACSAAAAAkgAEAAJBAAEkACSAAJBAAAAAiSESAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACUCESAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAACSAAJIAAAAAAAAAAACQAAAAAAAAVPGtZbGdFOncVbbKXOSylFL/vwZW3cF185OT1KTl4RsujFexJYQHUA5WPAtcmn9JfJ/3tzXwwWHD9ZqIah6fVSrk5V7oOKwuT5r8/gBdAAAAAAAAAAAAAAAAAACAAAAAAAASAAAAA5Gem1XEVJudShVbOKT3ReVjyTzyaN7SaDiFMI112aZRjnGVNvm89cesruG8djpe9g65TbvsllNLrhY5+w2p9rY4e2maeHhuUcJ+GQPfB67b777LZxc6oOqM4r0VLLy0n1x/MyavfRyt4lsfk66t3w6mtRZZRRRp6f2nVZm5fuRfNyfrxj4M8xqrpc4afTvW3Q+8tnzip+KWc5fqXxYGxprZXPbXxLdJ9I93Um/Yn1HHqbaa6L+8320SadjilmMvFpe5e8rIcR02oezVaeFWeStr5bX61jp8Szo3/AFug1Et++tuq19ZR8E/WsZ9z9QGvxDg+q1DjO63T8lhNOcVjr5GCHDtRoYzvrsoe2OHhynycl4YXjg8x4zU6q6dTp3c6uXNrGVlL345GPUcVo7m2qjTunvduXlYymnzA7PSTc665S6yhFv2tJsymvw/7qr8OH6UbAAAAAAAAAAAAAABAAAAAAAAJAAAAAfOY095f3ecb7nHPXGZ4yeeIaZU22V53KDxnpnkZ9H+1w/8AJX8Qce/ab/8AP/JAdGv26zHWOk9D4rp8WVPDdVqNJp++iq512zeNze5T5rPLr9np6jPTfO2unU0+lfpVssh4zr8/hn5+Riu4XXrG7dHZBOTzKmT2yhJ9cL/q9YFFKWW2+bbbftZ0yb/qtv7fNetw9FfpNSvgSp9PW2V11r+ynmU/Uv8A5lm5HVZctdZHZVVDZp63ycm1hPH/AH5AUXFUu/vx076z9TNRnqcnJty5tttvzbeWeWB9I4f9zV+FD9KNg1+H/c1fhQ/SjYAAAAAAAAAAAAAAIBJAAAAAABIAAAAD5xqKLN82oWfblz2y/eZjensfWFj/ANMmfSwB8503f0zU6lZGS8dsua8msc0WM9TTfz1OjsU/GdSay/PDx/M7UAcVGzS1+lVo77Z+Dt+z8s5+Bpa+7UaiW62M3jpFRkowXqX8z6EAPmn0ez9yf+2X/Aens/cn/tl/wfSwBg0CxVVn+7h+lGcAAAAAAAAAAAAAAAgAAAAB5smoxcn0im37Einh2mpksxr1DT8VW2i01n3dn4c/0s53gPHdPRp667JSU478pQsl1m2uaWOjAveHcTq1Kbqllx+1FpxlH2pm4crVfKU9ZraYyrgtO1ByWN80k92PH7PzM0eJaqulaq6UHB1xUKUuc7HhKbl4Z5vC8GB0gKC6Ovprd7urm4x3So7uMY4Sy0pLnyRNnFLdTOqrSONbnUrZ2SW7u4vpFLxeQLW7XQhbVS92+1T24XL0Vl5fgbJzTjfHXaSOolGzarttkVs3J1vKcfBrHzRY9ntZZfS52tOXeTWUkuSfIC0BzdfGrVTJ+jZdPVSprWMLwxnHkZ7lrtPsm7VqYyklOCqScE/7UdvN49YFxVqITc4wlGUq3iSTy4vyfkeNfrIaeuVtmdkcZwsvm0ly9rKPs/VctRqd1sWo2YsWxLvJbXhrn6PM3O1v7Hd7a/4kQLaEtyTXRpP4nooNRq9R39WnolCKnpYyzKO7Y8vM/XyWMdOZjjdrVe9J30JtwU++cIpwhnD9Fcm84A6MFFptZqKrL6LJLUzhT3lbUVW5eG1pcuuDDqZ62qp32amuMlHc6HXBR/yZznIHRgo7+KXWvT1afbCy6pWynL0lVBrwXi85PEtVq6LtPTbOu2Fs39YobJNJc4tZwvDmBfgoadRqdY5zpujpqYTcYehGyVjXWT3dEbXBddZa7ar9ve0SSco/ZnF/Zkl4dALQAAAAAAAAgkgAAAMOs+7s/Dn+llf2WWNJVnl9v+JItgBpcbX/AObUfg2fpZWazSzt4fR3abnXCmaj4vbFZXwbOhAHPa3j9NtM66d8r7IOKq2z3RlJYeeWOWTXor/o62ud2e6np4wlNJyULFh88eHL5nUYJaA5uWuWo1uklUpOqKuSs2tKUnW92M+C9Hn6zxwXidekhZRdvjdG2eK1GUpTz024XPJ05AHG6amzuI3bJOVGtlOVa67fR3Y9hb2cfja64aL66yclnMZqNcP7Tl0LwhICh4TfGvV6qqeYztsUoLEsSiott56dDY7WLOjuS5vNf8SJbgChqT+nVPDx9BXP/WzKl/WLfh9E6/8AsLkAcvxjvVqNS6d2/wChxw1nOO8jux68ZNOUdC6ZLTVSu1LreW4zlODx6UpN8ljn09x2hCQHJ6PUKmWl1WJTp+ixpnJRk+7nHrldcZWPiZ9VxGOp1Oj7pS7qNkvrHFxU5Y6Rzz5L8y14lptQ5ws01ii4Jp1T3d1NPzx4mDT6G+y6F2qda7pS2V17mk5LDk2wKTS6XRaffVr60rIye2bVjVlfg04l12cqhi2dVCorlJKH2t1kFn0mn0XPkXDRIAAAAAAAAEAAAAAKrtJxKWmpzD7yctsX128m3L3JfHBU6bs1ZbBW232K6aUlzk9uVlJvOfgbHbelyqrmukZtP1blyfxXzLjRa6uymNqlFQ2rLbS2NLmn5YAr+z1+ojGyGrU0q+atn4x55Tk+uMZz5Mx2drdOm0oXTin9tRjt+bT+Rr6/jH0vS6ruq5xjBQzJ49KLms9P8KefUzd4CqvoSzt2bZ95nGM5e7d7vlgDZ1HG6a6Y6jMp1zltW1ZecPk08Y6M1X2q029R+sxyzPati+effg5avd9Cn12/SoY/zd3LPy2l12kglotNhJYdePfVLIG/LtVpVPZmbWcd5t+r9uc5x68GPVyr/pCnNlqm4LEEvqmsT6vd7fDwRqdqK4x0emwksSgly6J1Sz+SPMv2/R/g1/omBY2dqNPHvE1buhLbt2rM3lp7efTl448Db4XxqnVKThui4LMoySTS8+uMe8p+y0E9Tq20sxk0n5Zsln8kV0otXcRUOX1V3Jfu97Hd8sgXq7V6Xft+s25x3m1bPb1zj14N/hXFK9XGUq1NKMsPcknnGfBsquAdx9Blv2Y+s7zOOuXjPuxg89hvurfxF+hAee12qnvpo3uqqeHOSyuTljn6ksvBgt7Od3FW6C2UrE1zUoLcvU1he55LLj9+lc66NVGeZYcbFhKG54+1nl05+HQquK8AjpISvpvnBrGOe2UsvwlHHP3AXt/Fo6amuWrzG2UVmEcSbkl6WMPGPf4mHQ9paLpqtqyqUnhb0km30WU3h+0oKtS7tRop6nmnCKy8JNqc0n5c2olj2427acfe7pYx9rbj/naBacU47TpZKEt05tZ2QSbS8M5aSJ4XxynVNwhuhNLOySSbXmsNplNwT9vv77He4njPnldP9PyPXFMf0lp+6xv9Dfj2yzn17PlgDdn2q0y3crcxljbtWZPnlrn0WPHzRvcK4vVq1J17k44zGSxJZ6PlyaKTsfBO3VtpZTik/JOVmfyXwJ7NpLWatLkk7OXhjvWB1IAAAAAAABBJAAAAeLqo2RcJpSjJYafRoobOyGncsqViXlmL+bWToQBr6XQ1VV91CKUGnlPnuz1z5lRZ2S07balbGLf2E0181+Z0AArb+CUzpjRiUK4y3La1lyw+bbTz1Z713Ca76oUzc1GtxxhpPlFxWeXkzfAGhr+FV6iuFU3NRraaw0nyi4rPLyZ5fB6+9rvzPfVGMUsrbhJpZ5etliANDh/Cq9PO2cHNu15llprq3y5etmJcMhRK/UVxnZZZGea247ZZeXFcvHGC0AHAqzh+ZTnVdCyLeKG90W/DnjKWfBsv+xumnXTKU0495PKT5NxUUs/mXrri3lpN+eFk9AafEuGVaqKjaumcSXKUc+TKmnshp4vLlZJLwzFfNLJ0QAr+IcHp1EI1zjtUFiLjhOK8l6vUamh7NUUzVjc7ZRxjc00munJLwLsAVXFOBU6qSnLdCax6UWk3jpnJPC+B06VucN05vPpSabWeuMFoANDhvCq9M7JVubdrTe5p9HJ8sL/ExouFV022XQc3K1yym01zlueOXmb4AAAAAAAAAgEkAAAAAAEgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAEgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEEkAAAAJIAEgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAEgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/9k=')


    useEffect(() => {

        dispatch(fetchCategory())

    }, [])

    // category drop down start

    const subCatHandler = (e) => {

if(e.target.value===''||e.target.value===null){
    return setWarning('Invalid entry')
}
        setCategory(e.target.value)
        dispatch(fetchCategory())
        const selected = categoryData.find(value => value.category === e.target.value)
    selected&&setSubcategory(selected.subCat)

    }
    // category drop down ENd

    function makeSourcePreview(image, state){

        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onloadend = () => {
            state(reader.result)}
console.log(reader.result);
        }
   


    function imageHandler1(e) {
        
        makeSourcePreview(e.target.files[0], setPreviewSOurce1)
    
        setSelectedFile1(e.target.files[0])
    }

        function imageHandler2(e) {
        
            makeSourcePreview(e.target.files[0], setPreviewSOurce2)
         
            setSelectedFile2(e.target.files[0])

        }
            function imageHandler3(e) {
        
                makeSourcePreview(e.target.files[0], setPreviewSOurce3)
             
                setSelectedFile3(e.target.files[0])

            }
                function imageHandler4(e) {
        
                    makeSourcePreview(e.target.files[0], setPreviewSOurce4)
                  
                    setSelectedFile4( e.target.files[0])
                }
    // // submitting the product start
    function handleSubmitHandler(e) {

        // console.log({name,category,subCat,price,description,small,medium,large,quantity,selectedFile});
        e.preventDefault()
        // validation start
        if (name === '' || category === '' || subCat === '' || price === '' || description === '') {

            return setWarning('Fill all fields')
        }
        // const regexNum =/[0-9]/
        // if(price!==/[0-9]/||small!==/[0-9]/||medium!==/[0-9]/||large!==/[0-9]/){
        //     setWarning('Enter valid characters')
        // }


        // validation end
const selectedFile=[selectedFile1,selectedFile2,selectedFile3,selectedFile4]

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

            let productData = { name, category, subCat, price, description, small, medium, large, imageUrl }



            axios.post('/admin/product/add',productData).then(response=>{

            if(response.data.response){

                setWarning(response.data.response)
                setLoading(false)
            }else if(response.data){


                setName('')
                setCategory('')
                setPrice()
                setDescription('')
                setSmall(0)
                setMedium(0)
                setLarge(0)
                setPreviewSOurce1('')
                setPreviewSOurce2('')
                setPreviewSOurce3('')
                setPreviewSOurce4('')
                setSelectedFile1('')
                setSelectedFile2('')
                setSelectedFile3('')
                setSelectedFile4('')
                swal("Success", "product added sucessfully", "success");
                setWarning('')
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
                             validator.priceInputBlurHandler(e.target.value,setWarning)
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
                                <Form.Control value={medium} min={0}  type='number' onChange={(e) => {
                                    setMedium(e.target.value)
                                }} />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridZip">
                                <Form.Label>Large</Form.Label>
                                <Form.Control value={large} min={0}  type='number' onChange={(e) => {
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
                                <img src={previewSource1} className='image_preview' alt="productimage" />
                                <Form.Label>Image 1</Form.Label>
                                <Form.Control  accept='image/*'  type="file" size="md" onChange={imageHandler1} />
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
                                <Form.Control accept='image/*' type="file" size="md" onChange={imageHandler2} />
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
                                <Form.Control  accept='image/*' type="file" size="md" onChange={imageHandler3} />
                            </Form.Group>
                            <Form.Group
                                as={Col}
                                sm={12}
                                md={6}
                                controlId="formFileLg"
                                className="mb-3"
                            >
                                <img src={previewSource4} className='image_preview' alt="productimage" />
                                <Form.Label>Image 4</Form.Label>
                                <Form.Control  accept='image/*' type="file" size="md" onChange={imageHandler4} />
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
