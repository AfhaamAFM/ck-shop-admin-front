import axios from 'axios'
import React, { useState } from 'react'
import { Container, Row, Table, Col, Button, Tab, Tabs } from 'react-bootstrap'
function SubcategoryTable() {


    const [previewSource, setPreviewSource] = useState()
    const [fileInputState, setfileInputState] = useState('')
    const [selectedFile, setSelectedFile] = useState([])
    
    
    // function fileHandler(e) {
         
    //  console.log(e.target.files);
    //     setSelectedFile(prev=>[...prev,e.target.files[0]])
        // previewFile(file)  }
    // function previewFile(file) {
    //     const reader = new FileReader();
    //     reader.readAsDataURL(file);
    //     reader.onloadend = () => {
    //         setPreviewSource(reader.result)}}
   
function handleSubmitHandler(e){
    e.preventDefault();

let formData=new FormData();

selectedFile.forEach(file=>{
    formData.append("image", file);
})

formData.append("image", selectedFile);
axios.post("http://localhost:5000/demo", formData).then(response=>{
    console.log(response);
})
}

   
   
            return (
        <div>
            <div >


                <Row className='align-items-center'>

                    <Col md={8}>
                        <form onSubmit={handleSubmitHandler}>
                            <input type='file' name='image' onChange={(e)=>{
                                setSelectedFile(prev=>[...prev,e.target.files[0]])
                            }}  className="form-input" />
                            <input type='file' name='image' onChange={(e)=>{
                               setSelectedFile(prev=>[...prev,e.target.files[0]])
                            }}  className="form-input" />
                            <input type='file' name='image' onChange={(e)=>{
                               setSelectedFile(prev=>[...prev,e.target.files[0]])
                            }}  className="form-input" />
                            <Button variant='danger' type='submit'>submit</Button>

                        </form>
                        {previewSource && (



                            <img src={previewSource} alt='choodem'
                                style={{ height: '300px' }} />

                        )}
                    </Col>
                </Row>


            </div>
        </div>
    )
}

export default SubcategoryTable
