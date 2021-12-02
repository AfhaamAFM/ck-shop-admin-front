import React from 'react'
import { Modal, Button, Form, Row, Col,Spinner } from 'react-bootstrap'
import validator from '../../simple-react-form-validation-helper/validationHelpers';


function AddOfferModal({
    addHandleClose,
    addshow,
    offerName,
    expiryDate,
    percentage,
    setOfferName,
    setExpiryDate,
    setPercentage,
    setOfferNameError,
    setExpiryDateError,
    setPercentageError,
    offerNameError,
    expiryDateError,
    percentageError,
    addOfferHandler,
    loading

}) {




    return (
        <>

            <Modal
                show={addshow}
                onHide={addHandleClose}
                backdrop="static"
                keyboard={false}

            >
                <Modal.Header closeButton>
                    <Modal.Title>Add Offer</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Row>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Offer Name</Form.Label>
                            <Form.Control type="text" placeholder="Offer Name"
                                value={offerName}
                                onChange={(e) => {

                                    validator.nameInputChangeHandler(e.target.value, setOfferNameError)
                                    setOfferName(e.target.value);

                                }}

                                onBlur={(e) => {
                                    validator.nameInputBlurHandler(e.target.value, setOfferNameError)

                                }}

                            />
                            <Form.Text className="text-muted" style={{ color: 'red' }} >
                                {offerNameError}
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicDate">
                            <Form.Label>Expiry Date</Form.Label>
                            <Form.Control type="Date" placeholder="SelectDate"

                                value={expiryDate}
                                onChange={(e) => {

                                    setExpiryDate(e.target.value);

                                }}

                            />

                            <Form.Text className="text-muted" style={{ color: 'red' }} >
                                {expiryDateError}
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="formPercentage">
                            <Form.Label>Offer Percentage</Form.Label>
                            <Form.Control min={0} max={99} type='text'

                                value={percentage}
                                onChange={(e) => {

                                    validator.percentageInputChangeHandler(e.target.value, setPercentageError)
                                    setPercentage(e.target.value);

                                }}

                                onBlur={(e) => {
                                    validator.percentageInputBlurHandler(e.target.value, setPercentageError)
                                }}


                            />
                            <p className="text-muted" style={{ color: 'red' }} >
                                {percentageError}
                            </p>
                        </Form.Group>


                    </Row>



                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={addHandleClose}>
                        Close
                    </Button>

                    {loading?<Spinner animation="border" role="status"/>
:<Button disable={offerNameError||percentageError||expiryDateError} variant="primary" onClick={addOfferHandler} >Add this Offer</Button>}
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AddOfferModal
