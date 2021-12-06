import React from 'react'
import { Container, Row, Col, Form,Table } from 'react-bootstrap'
import { Button } from 'antd';

function SalesReportScreen() {
    return (
        <>
            <Container>
                <h1>Sales Report</h1>

                <Row className='d-flex border-bottom pb-3'>
                    <Col md={4} className='d-flex align-content-around'>
                        <h6>Filter <i className="fas fa-filter"></i></h6>
                        <Button.Group>

                            <Button className=' mx-2' type="primary" shape="round" >Year</Button>
                            <Button className=' mx-2' type="primary" shape="round"  >Month</Button>
                            <Button className=' mx-2' type="primary" shape="round"  >Day</Button>
                        </Button.Group>
                    </Col>
                    <Form.Group as={Col} md={2} controlId="formGridEmail">
                        <Form.Label>From</Form.Label>
                        <Form.Control

                            type="date"
                            placeholder="Start date"
                        // onChange={(e) => {
                        //     setName(e.target.value);
                        // }}
                        />
                    </Form.Group>
                    <Form.Group as={Col} md={2} controlId="formGridEmail">
                        <Form.Label>To</Form.Label>
                        <Form.Control

                            type="date"
                            placeholder="E date"
                        // onChange={(e) => {
                        //     setName(e.target.value);
                        // }}
                        />
                    </Form.Group>
                    <Col><Button>Search</Button></Col>
                </Row>
                {/* Table start */}
                <Table striped bordered hover variant="dark">
  <thead>
    <tr>
      <th>#</th>
      <th></th>
      <th>Last Name</th>
      <th>Username</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
  
  </tbody>
</Table>

                {/* Table end */}
            </Container>
        </>
    )
}

export default SalesReportScreen
