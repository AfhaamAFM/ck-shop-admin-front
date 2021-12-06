import React from 'react'
import {Container,Tabs,Tab,Row} from 'react-bootstrap'
import Sibebar from '../adminRoutes/Sibebar'
import SalesReportScreen from './SalesReportScreen'


function SalesScreen() {
    return (
        <>
        <Sibebar />

<div className='home-section'>
<Container>
<Row>

<Tabs  id="uncontrolled-tab-example" className="mb-3">
<Tab eventKey="home" title="Home">

<SalesReportScreen/>
</Tab>
{/* <Tab eventKey="Address" title="Address">
</Tab>
<Tab eventKey="contact" title="My Orders" >
</Tab> */}
</Tabs>
</Row>

 </Container>
 </div>
 </>
    )
}

export default SalesScreen
