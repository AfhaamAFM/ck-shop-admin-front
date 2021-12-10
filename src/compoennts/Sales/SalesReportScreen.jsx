import React,{useState,useEffect} from 'react'
import { Container, Row, Col, Form,Table,Button } from 'react-bootstrap'
import DataTable from 'react-data-table-component';
import {useSelector,useDispatch} from 'react-redux'
import { fetchSalesReportRange, fetchSalesReportType } from '../../REDUX/ORDERSTORE/orderAction';
import Loader from 'react-loader-spinner';
import axios from 'axios';

function SalesReportScreen() {

const[reportType,setReportType]=useState('Monthly')
const[salesReport,setSalesReport]=useState()
const{report,loading:reportLoading}=useSelector(state=>state.sales)
const dispatch = useDispatch()
const[fromDate,setFromDate]=useState()
const[toDate,setToDate]=useState()
const[dateWarning,setDateWarning]=useState()

// local function
function typeFetchHandler(e){
setReportType(e.target.id)
dispatch(fetchSalesReportType(e.target.id))
setSalesReport(report)
}

// 
const reportHandler= async ()=>{

try {

if(!fromDate||!toDate){
    return setDateWarning('Fill all')

}

const now =new Date()
if(toDate>now){

 return setDateWarning('Future Report is not available,select valid date')
}

   dispatch(fetchSalesReportRange())

} catch (error) {
    
    console.error('This is the error from report by range   '+ error);
}

}



useEffect(async()=>{
dispatch(fetchSalesReportType(reportType))
setSalesReport(report)


},[])

    return (
        <>
            <Container>
                <h1>Sales Report</h1>

           <Row className='d-flex border-bottom pb-3'>
                    <Col md={4} className='d-flex align-content-around'>
                        <h6>Filter <i className="fas fa-filter"></i></h6>
                     
                            <Button className='mx-2' type="primary" shape="round" id='Yearly'  onClick={typeFetchHandler} >By Year</Button>
                            <Button className='mx-2' type="primary" shape="round" id='Monthly' onClick={typeFetchHandler} >By Month</Button>
                            <Button className='mx-2' type="primary" shape="round" id='Daily'   onClick={typeFetchHandler} > By Day</Button>
                       
                    </Col>
                    <Form.Group as={Col} md={2} controlId="formGridEmail">
                        <Form.Label>From</Form.Label>
                        <Form.Control

                            type="date"
                            placeholder="Start date"
                        onChange={(e) => {
                            setFromDate(e.target.value);
                        }}
                        />
                    </Form.Group>
                    <Form.Group as={Col} md={2} controlId="formGridEmail">
                        <Form.Label>To</Form.Label>
                        <Form.Control
                            type="date"
                            placeholder="E date"
                        onChange={(e) => {
                            setToDate(e.target.value);                        }}
                        />
                    </Form.Group>
                    <Col><Button onClick={reportHandler} >Search</Button> 
                    <p style={{color:'red'}}>{dateWarning}</p>
                    
                      </Col>
                </Row>
                {/* Table start */}
              { reportLoading?  <Loader
        type="Puff"
        color="#00BFFF"
        height={100}
        width={100}
      /> :(<Table striped bordered hover variant="dark">
  <thead>
    <tr>
      <th>#</th>
      <th>Username</th>
      <th>Order Id</th>
      <th>Payment Id</th>
      <th>Payment Method</th>
      <th>Payment Date</th>
      <th>Product Count</th>
      <th>Amount</th>
    </tr>
  </thead>
  <tbody>
      
  { !report?  <Loader
        type="Puff"
        color="#00BFFF"
        height={100}
        width={100}
      />:report.map((data,i)=>{
      return<tr key={data.orders.orderId}>
      <td>{i+1}</td>
      <td>{data.email}</td>
      <td>{data.orders.orderId}</td>
      <td>{data.orders.paymentResult.payId}</td>
      <td>{data.orders.paymentMethod}</td>
      <td>{data.orders.paymentResult.payed_Date}</td>
      <td>{data.orders.orderItem.length}</td>
      <td>{data.orders.amount}</td>


    </tr>})
}
  </tbody>

</Table>)}

                {/* Table end */}
            </Container>
        </>
    )
}

export default SalesReportScreen
