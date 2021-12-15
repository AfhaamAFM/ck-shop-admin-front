import React from "react";
import { Button, Modal,Form } from "react-bootstrap";
import validator from "../../../simple-react-form-validation-helper1/validationHelpers";

function CategoryEditModal({oldCategory, nameError, setError, handleClose,setNewCategory,show ,editHandler,newCategory}) {




  return (
    <>
     

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Enter category</Form.Label>
            <Form.Control
            value={newCategory}
              onChange={(e) => {

                validator.nameInputChangeHandler(e.target.value,setError)
                setNewCategory(e.target.value);

              }}

onBlur={(e)=>{
    validator.nameInputBlurHandler(e.target.value,setError)

}}

              type="text"
              placeholder="Enter new category name"
           
            />
        <p style={{color:'red'}}>{nameError}</p>
          </Form.Group>
       
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" disabled={nameError} onClick={editHandler} >Save</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CategoryEditModal;
