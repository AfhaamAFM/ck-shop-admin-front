import React from 'react'
import { Modal, Button, Form, Row, Col,Spinner } from 'react-bootstrap'
import validator from '../../simple-react-form-validation-helper/validationHelpers';


function AddCoupenModal({
    addHandleClose,
    addshow,
    coupenName,
    expiryDate,
    percentage,
    setCoupenName,
    setExpiryDate,
    setPercentage,
    setCoupenNameError,
    setExpiryDateError,
    setPercentageError,
    coupenNameError,
    expiryDateError,
    percentageError,
    addCoupenHandler,
    loading,
    setMinAmount,
    minAmountError,
    setMinAmountError

}) {




    return (
        <>

            <Modal
                show={addshow}
                keyboard={false}

            >
                <Modal.Header closeButton>
                    <Modal.Title>Add Coupen</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Row>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Coupen Name</Form.Label>
                            <Form.Control type="text" placeholder="Coupen Name"
                                value={coupenName}
                                onChange={(e) => {

                                    validator.nameInputChangeHandler(e.target.value, setCoupenNameError)
                                    setCoupenName(e.target.value);

                                }}

                                onBlur={(e) => {
                                    validator.nameInputBlurHandler(e.target.value, setCoupenNameError)

                                }}

                            />
                            <Form.Text className="text-muted" style={{ color: 'red' }} >
                                {coupenNameError}
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicDate">
                            <Form.Label>Minimum Amount</Form.Label>
                            <Form.Control type="text" placeholder="Enter minumum amount"

                                onChange={(e) => {
                                    validator.priceInputChangeHandler(e.target.value,setMinAmountError)
                                    setMinAmount(e.target.value);

                                }}
                                onBlur={(e)=>{validator.priceInputBlurHandler(e.target.value,setMinAmountError)}}

                            />

                            <Form.Text className="text-muted" style={{ color: 'red' }} >
                                {minAmountError}
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
                            <Form.Label>Coupen Percentage</Form.Label>
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
:<Button disable={coupenNameError||percentageError||expiryDateError} variant="primary" onClick={addCoupenHandler} >Add this Coupen</Button>}
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AddCoupenModal
