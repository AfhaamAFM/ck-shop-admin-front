import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Row, Table, Modal, Button, Form, Placeholder, ListGroup, Badge } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { fetchProduct } from "../../REDUX/PRODUCTS/productAction";
import swal from 'sweetalert'
import { fetchOffers } from "../../REDUX/OFFER/offerAction";
import format from "../../simple-react-form-validation-helper1/utilFunctions";
import { CropSquare } from "@mui/icons-material";
import Swal from "sweetalert2";

function ShowProductScreen() {

    const [productId, setProductId] = useState()
    const [name, setOfferName] = useState()
    const [discount, setPercentage] = useState()
    const [date, setExpiryDate] = useState()
    const [offerId, setOfferId] = useState()
    const [warning, setWarning] = useState()
    const [viewMode, setViewMode] = useState(false)


    // Apply offer Modal controller
    const [offerShow, setOfferShow] = useState(false);

    const offerHandleClose = () => {
        setViewMode(false)
        setOfferShow(false);
    }
    const offerHandleShow = () => setOfferShow(true);

    // redux controller
    const { product } = useSelector((state) => state.product);
    const { loading, offers } = useSelector(state => state.offer)
    const dispatch = useDispatch();


    // delete handler
    function deleteHandler(event) {

        const id = event.target.id

        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this Product",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {

                axios.get(`/admin/product/delete/${id}`).then(res => {

                    if (res.data) {
                      
                        swal("Product has been deleted!", {
                            icon: "success",
                        }).then(k=>{

                            dispatch(fetchProduct())
                        })
                    }
                })
            } else {
                swal("Product is safe!");
            }
        });
    }

    // 
    async function showOfferHandler(e) {

        const selectedOffer = offers.find(value => value.offerName === e.target.value)
        const { offerName, percentage, expiryDate, _id } = selectedOffer
        const formatedDate = format.dateFormatter(expiryDate)

        setOfferName(offerName)
        setPercentage(percentage)
        setExpiryDate(formatedDate)
        setOfferId(_id)
    }


    // apply offer handler
    const applyOfferHandler = (e) => {
        const offerId = e.target.id

        if (!offerId) return setWarning('Select a offer')
        axios.post('/offer/applyProductOffer', { productId, offerId }).then(res => {
            if (res.data.warning) {
                return Swal.fire(res.data.warning)
            }

            if (res.data) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: res.data.response,
                    showConfirmButton: false,
                    timer: 1500
                })
                dispatch(fetchProduct())
                return offerHandleClose()
            }




        }).catch(err => {

            console.error('this is apply offer arror  ' + err);


        })


    }

    // see offer handler

    function seeOfferHandler(e) {
        const id = e.target.id
        setProductId(id)
        setViewMode(true)
        const thisProduct = product.find(value => value._id === id)
        const { offer } = thisProduct

        const { offerId, offerName, expiryDate, percentage } = offer
        setOfferName(offerName)
        setPercentage(percentage)
        setExpiryDate(format.dateFormatter(expiryDate))
        console.log(offer);

        offerHandleShow()

       
    }
    //   show offer handler

    // remove offer

    function removeOfferHandler(){
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, remove it!'
        }).then((result) => {
            if (result.isConfirmed) {

                axios.get(`/offer/removeOffer/${productId}`).then(res => {
                    if (res.data) {
                        Swal.fire(
                            'Deleted!',
                            'Offer is removed',
                            'success'
                        )
                        dispatch(fetchProduct())
                        return offerHandleClose()
                    }

                })
            }
        })


    }
    function showOfferModal(e) {
        const id = e.target.id

        setProductId(id)
        offerHandleShow()


    }

    // useEffects





    useEffect(() => {
        dispatch(fetchProduct());
        dispatch(fetchOffers())


    }, [dispatch]);

    // test

    return (

        <Row className="table-Container">

            <Col sm={12} md={8} className="mx-auto mt-5">
                <Table striped bordered hover size='lg'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>subcategory</th>
                            <th>price</th>
                            <th>stock</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {product
                            ? product.map((product, no) => {


                                return <tr key={product._id} >
                                    <td >{no + 1}</td>
                                    <td > <img className='table_image' src={product.imageUrl[0].img} id={product.imageUrl[0]._id} alt="productIMage" /> </td>
                                    {!product.isOffer ? <td > {product.name}</td>
                                        : <td > {product.name} <Badge style={{ cursor: 'pointer' }} className='me-auto' bg="success" id={product._id} onClick={seeOfferHandler}>Show offer</Badge></td>}
                                    <td >{product.category}</td>
                                    <td >{product.subCat}</td>
                                    <td >{product.price}</td>
                                    <td >{product.quantity}</td>

                                    <td className='table-icons'>
                                        <i className="fas fa-trash-alt " id={product._id} onClick={deleteHandler}></i>
                                        <i className="fas fa-tag" onClick={showOfferModal} id={product._id}></i>
                                    </td>

                                </tr>
                            })
                            : null}
                    </tbody>
                </Table>
            </Col>


            {/* Apply offer Modal start */}
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

                            <p>{name}</p>
                        </ListGroup.Item>
                        <ListGroup.Item className='d-flex justify-content-between'>

                            <h6>Expiry Date</h6>
                            <p>{date}</p>


                        </ListGroup.Item>
                        <ListGroup.Item className='d-flex justify-content-between' >

                            <h6>Discount(%)</h6>
                            <p>{discount}%</p>

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


            {/*Apply offer modal end modal end */}
        </Row>


    );
}

export default ShowProductScreen;
