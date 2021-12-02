import React, { useEffect, useState } from "react";
import { Container, Table, Row, Col, Modal, Button, Form } from "react-bootstrap";
import Sibebar from "../adminRoutes/Sibebar";
import { useSelector, useDispatch } from 'react-redux'
import { fetchOrders } from "../../REDUX/ORDERSTORE/orderAction";
import { Link, useSearchParams } from 'react-router-dom'
import axios from "axios";
import Swal from "sweetalert2";

function OrderScreen() {


  // redux start
  const dispatch = useDispatch()
  const { orders } = useSelector(state => state.order)
  // redux end


  // useStates start\


  const [orderStatus, setOrderStatus] = useState()

  // useState end

  // editing modal start controls 
  const [editShow, setEditShow] = useState(false);
  const editHandleClose = () => setEditShow(false);
  const editHandleShow = () => setEditShow(true);


  let [searchParams, setSearchParams] = useSearchParams();
  let user = searchParams.get("user");
  let orderId = searchParams.get("orderId");


  function handleOrderStatus(e) {

    setOrderStatus(e.target.value)
    const orderStatus = e.target.value

    axios.post('/order/changeStatus', { user, orderId, orderStatus }).then(res => {


      if (res.data) {

        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: `order status changed`,
          showConfirmButton: false,
          timer: 1500
        })
        dispatch(fetchOrders())
        editHandleClose()
      }
    })



  }





  // useEffect start\
  useEffect(() => {
    console.log('ibJNKJND');
    dispatch(fetchOrders())

  }, [dispatch])





  return (

    <>
      <Sibebar />

      <div className='home-section'>
        <Container >
          <Row className='align-items-center'>
            <h2>Orders</h2>
            <div className='table-Container' >
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>no</th>
                    <th>User Details</th>
                    <th>Order ID</th>
                    <th>Payment Method</th>
                    <th>Order Status</th>
                    <th>Amount</th>
                    <th>Action</th>


                  </tr>
                </thead>
                <tbody>
                  {orders ? orders.map((value, i) => {
                    return <tr key={value.orders._id}>
                      <td>{i + 1}</td>
                      <td>{value.email}</td>
                      <td>{value.orders._id}</td>
                      <td>{value.orders.paymentMethod}</td>
                      <td>{value.orders.orderStatus}</td>
                      <td>{value.orders.amount}</td>
                      <td className='table-icons '>
                        {value.orders.orderStatus === 'delivered' ? 'Delivered' : value.orders.orderStatus === 'canceled' ? 'Cancelled'
                          : <Link to={`/orders/?user=${value.user}&orderId=${value.orders._id}`}>
                            <i id='value.orders._id' onClick={editHandleShow} className="fas fa-edit"></i>
                          </Link>}
                      </td>

                    </tr>
                  }) : ''}
                </tbody>
              </Table>
              <Col sm={12} md={8} className='mx-auto mt-5'></Col>
            </div>
          </Row>





          {/* Modaal for editing */}
          <>


            <Modal
              show={editShow}
              onHide={editHandleClose}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header closeButton>
                <Modal.Title>Edit order status</Modal.Title>
              </Modal.Header>
              <Modal.Body>




                <Row>
                  <Col>
                    <Form>
                      <h4>Change order status</h4>

                      <Form.Group as={Row} className="mb-3">

                        <Col sm={10}>
                          <Form.Check
                            type="radio"
                            value='ordered'
                            label='ordered'
                            name="formHorizontalRadios"
                            id="formHorizontalRadios1"
                            onChange={handleOrderStatus}
                          />
                          <Form.Check
                            type="radio"
                            value='shipped'
                            label='shipped'
                            name="formHorizontalRadios"
                            id="formHorizontalRadios2"
                            onChange={handleOrderStatus}
                          />
                          <Form.Check
                            type="radio"
                            value='delivered'
                            label='delivered'
                            name="formHorizontalRadios"
                            id="formHorizontalRadios3"
                            onChange={handleOrderStatus}
                          />
                          <Form.Check
                            type="radio"
                            value='canceled'
                            label='canceled'
                            name="formHorizontalRadios"
                            id="formHorizontalRadios3"
                            onChange={handleOrderStatus}
                          />
                        </Col>

                      </Form.Group>
                    </Form>
                  </Col>
                </Row>






              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={editHandleClose}>
                  Close
                </Button>

              </Modal.Footer>
            </Modal>
          </>

        </Container>
      </div>
    </>
  )


}


export default OrderScreen