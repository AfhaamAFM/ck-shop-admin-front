import React from 'react'
import { Container, Tab,Tabs } from 'react-bootstrap'
import Sibebar from '../adminRoutes/Sibebar'
import AddProductScreen from './AddProductScreen'
import EditProductScreen from './EditProductScreen'
import ShowProductScreen from './ShowProductScreen'

function ProducScreen() {
    return (
        <>
        <Sibebar />
       
        <div className='home-section'>
          <Container fluid>
            <Tabs id="uncontrolled-tab-example" className="mb-3">
  <Tab eventKey="home" title="Products">
   <ShowProductScreen/>
  </Tab>
  <Tab eventKey="profile" title="Add product">
    <AddProductScreen />
  </Tab>
  <Tab eventKey="contact" title="Edit Product" >
    <EditProductScreen/>
  </Tab>
</Tabs>
</Container>
        </div>
        </>
    )
}

export default ProducScreen
