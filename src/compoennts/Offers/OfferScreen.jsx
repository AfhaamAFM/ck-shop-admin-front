import React from 'react'
import {Container,Tabs,Tab,Row} from 'react-bootstrap'
import Sibebar from '../adminRoutes/Sibebar'
import OfferViewScreen from './OfferViewScreen'



function OfferScreen() {
    return (
        <>
             <Sibebar />

<div className='home-section'>
<Container>
<Row>

<Tabs  id="uncontrolled-tab-example" className="mb-3">
  <Tab eventKey="home" title="Home">

<OfferViewScreen/>
  </Tab>
  <Tab eventKey="Coupen" title="coupens">
   {/* <UserAdressScreen users={users} />  */}
  </Tab>
  {/* <Tab eventKey="contact" title="My Orders" >
    <MyordersScreen />
  </Tab>  */}
</Tabs>
</Row>

      </Container>
      </div>
      </>
        
    )
}

export default OfferScreen
