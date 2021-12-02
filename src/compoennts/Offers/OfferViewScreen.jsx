import React, { useState, useEffect } from 'react'
import { Row, Col, Table, Container } from 'react-bootstrap'
import { Space } from 'antd'
import AddOfferModal from './AddOfferModal';
import { useSelector, useDispatch } from 'react-redux'
import { addOffer, fetchOffers } from '../../REDUX/OFFER/offerAction';
import Swal from 'sweetalert2'
import Loader from 'react-loader-spinner';




function OfferViewScreen() {

    // use states
    const [addshow, setAddShow] = useState(false); //usestate for edit modal
    // modals forms
    const [offerName, setOfferName] = useState('.')
    const [expiryDate, setExpiryDate] = useState('.')
    const [percentage, setPercentage] = useState('.')

    // modal form error
    const [offerNameError, setOfferNameError] = useState('.')
    const [expiryDateError, setExpiryDateError] = useState('.')
    const [percentageError, setPercentageError] = useState('.')

    console.log(offerName, expiryDate, percentage);
    //   modal controller function 
    const addHandleClose = () => setAddShow(false);
    const addHandleShow = () => setAddShow(true);


    //  redux
    const { offers,loading } = useSelector(state => state.offer)
    const dispatch = useDispatch()

    // Add offer function 

    function addOfferHandler() {

        if (!offerName || !expiryDate || !percentage) {
            return setPercentageError('Fill all')

        }

        let currentDate = new Date()

        if (expiryDate < currentDate) {

            return setExpiryDateError('Enter a valid Error')
        }

        dispatch(addOffer(offerName, expiryDate, percentage))
        addHandleClose()

    }


    // useEffects

    useEffect(() => {

        dispatch(fetchOffers())

    }, [dispatch])





    return (
        <>

            <Container>
                <Row className='d-flex' >
                    {/* Modalss start */}
                    <AddOfferModal
                        addHandleClose={addHandleClose}
                        addshow={addshow}
                        offerName={offerName}
                        expiryDate={expiryDate}
                        percentage={percentage}
                        offerNameError={offerNameError}
                        expiryDateError={expiryDateError}
                        percentageError={percentageError}
                        setOfferName={setOfferName}
                        setExpiryDate={setExpiryDate}
                        setPercentage={setPercentage}
                        setOfferNameError={setOfferNameError}
                        setExpiryDateError={setExpiryDateError}
                        setPercentageError={setPercentageError}
                        addOfferHandler={addOfferHandler}
                        addOfferHandler={addOfferHandler}
                        loading={loading}
                    />
                    {/* MOdals ens */}
                    <Col>
                        <Row className='d-flex' className=''>
                            <Space direction='horizontal'>
                                <h2 as={Col} md={8}>User details</h2>
                                <h2 as={Col} md={4} className='buttonIcons mx-3' onClick={addHandleShow} ><i className="fas fa-plus-square"></i> </h2>
                            </Space>
                        </Row>
                    </Col>

                
                </Row>
                <Row>

                <Table striped bordered hover>
  <thead>
    <tr>
      <th>#</th>
      <th>Offer Name</th>
      <th>Discount (%)</th>
      <th>Start Date</th>
      <th>Expiry Date</th>
    </tr>
  </thead>
  <tbody>
      <>
      {!offers?
        <Loader
        type="Puff"
        color="#00BFFF"
        height={100}
        width={100}
        timeout={3000} //3 secs
      />:
     
      
     <>
     {offers.map((value,i)=>{
  return  <tr key={value._id} >
      <td>{i+1}</td>
      <td>{value.offerName}</td>
      <td>{value.percentage} %</td>
      <td>{value.createdAt}</td>
      <td>{(value.expiryDate)}</td>
    </tr> })}
    </>
}
</>
  </tbody>
</Table>

                </Row>
            </Container>

        </>
    )
}

export default OfferViewScreen
