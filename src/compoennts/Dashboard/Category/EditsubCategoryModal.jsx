import React from "react";
import { Button, Modal,Form } from "react-bootstrap";

function EditsubCategoryModal({setNewSubCat, handleClose,newsubCat,show ,editHandler}) {
  return (
    <>
     

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Enter category</Form.Label>
            <Form.Control
            value={newsubCat}
              onChange={(e) => {
                setNewSubCat(e.target.value);
              }}
              type="text"
              placeholder="Enter new category name"
           
            />
          </Form.Group>
       
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary"  onClick={editHandler} >Understood</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditsubCategoryModal;
