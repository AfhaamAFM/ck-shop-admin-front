import React from 'react'
import  {Modal,ListGroup,Placeholder,Form,Button} from 'react-bootstrap'




function OfferModal({offerName,expiryDate,percentage,offerShow,offerHandleClose,viewMode,applyOfferHandler,removeOfferHandler,offerId,showOfferHandler,offers}) {
    return (
        <Modal
        show={offerShow}
        onHide={offerHandleClose}
        backdrop="static"
        keyboard={false}
    >
        <Modal.Header closeButton>
            <Modal.Title>{viewMode ? 'Offer' : 'Apply offer'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>

            {!viewMode && <Form.Select size="sm" onChange={showOfferHandler}  >
                {offers ? offers.map((value, i) => {
                    return <option key={i}>{value.offerName}</option>
                })
                    : <Placeholder as="p" animation="glow">
                        <Placeholder xs={12} />
                    </Placeholder>}
            </Form.Select>}

            <ListGroup className='my-3'>
                <ListGroup.Item className='d-flex justify-content-between'>

                    <h6>Offer Name</h6>

                    <p>{offerName}</p>
                </ListGroup.Item>
                <ListGroup.Item className='d-flex justify-content-between'>

                    <h6>Expiry Date</h6>
                    <p>{expiryDate}</p>


                </ListGroup.Item>
                <ListGroup.Item className='d-flex justify-content-between' >

                    <h6>Discount(%)</h6>
                    <p>{percentage}%</p>

                </ListGroup.Item>
            </ListGroup>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={offerHandleClose}>
                Close
            </Button>
            {viewMode ? <Button variant="danger" id={offerId} onClick={removeOfferHandler}>Remove Offer</Button> : <Button variant="primary" id={offerId} onClick={applyOfferHandler}>Apply offer</Button>}
        </Modal.Footer>
    </Modal>
    )
}

export default OfferModal
