import React, { useState, useEffect } from "react";
import { Row, Col, Table, Container } from "react-bootstrap";
import { Space } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { addCoupen, fetchCoupen } from "../../REDUX/OFFER/offerAction";
import Loader from "react-loader-spinner";
import AddCoupenModal from "./AddCoupenModal";
import axios from "axios";
import Swal from "sweetalert2";

function CoupenViewScreen() {
  // use states
  const [addshow, setAddShow] = useState(false); //usestate for edit modal
  // modals forms
  const [coupenName, setCoupenName] = useState(".");
  const [expiryDate, setExpiryDate] = useState(".");
  const [percentage, setPercentage] = useState(".");
  const [minAmount, setMinAmount] = useState(".");
  // modal form error
  const [coupenNameError, setCoupenNameError] = useState(".");
  const [expiryDateError, setExpiryDateError] = useState(".");
  const [percentageError, setPercentageError] = useState(".");
  const [minAmountError, setMinAmountError] = useState(".");
  //   modal controller function
  const addHandleClose = () => setAddShow(false);
  const addHandleShow = () => setAddShow(true);

  //  redux
  const { coupen, loading } = useSelector((state) => state.coupen);
  const dispatch = useDispatch();
  // delete coupen handler

  function deleteHandler(e) {
    const id = e.target.id;
    // Swal.fire({
    //     position: 'top-end',
    //     icon: 'success',
    //     title: 'Password Changed Succesfully',
    //     showConfirmButton: false,
    //     timer: 1500
    // })
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    })
      .then((result) => {
        if (result.isConfirmed) {
          axios.get(`/offer/coupen/delete/${id}`).then((res) => {
            Swal.fire("Deleted!", "Coupen has been deleted.", "success");
            dispatch(fetchCoupen())
          });
        } else {
          Swal("Coupen is safe!");
        }
      })
     
  }

  // Add offer function
  function addCoupenHandler() {
    if (!coupenName || !expiryDate || !percentage || !minAmount) {
      return setPercentageError("Fill all");
    }

    let currentDate = new Date();

    if (expiryDate < currentDate) {
      return setExpiryDateError("Enter a valid Error");
    }

    dispatch(addCoupen(coupenName, expiryDate, percentage, minAmount));
    addHandleClose();
    setCoupenName(".");
    setExpiryDate(".");

    setPercentage(".");
  }

  // useEffects

  useEffect(() => {
    dispatch(fetchCoupen());
  }, [dispatch]);

  return (
    <>
      <Container>
        <Row className="d-flex">
          {/* Modalss start */}
          <AddCoupenModal
            addHandleClose={addHandleClose}
            addshow={addshow}
            coupenName={coupenName}
            expiryDate={expiryDate}
            percentage={percentage}
            couponNameError={coupenNameError}
            expiryDateError={expiryDateError}
            percentageError={percentageError}
            setCoupenName={setCoupenName}
            setExpiryDate={setExpiryDate}
            setPercentage={setPercentage}
            setCoupenNameError={setCoupenNameError}
            setExpiryDateError={setExpiryDateError}
            setPercentageError={setPercentageError}
            addCoupenHandler={addCoupenHandler}
            loading={loading}
            setMinAmount={setMinAmount}
            minAmountError={minAmountError}
            setMinAmountError={setMinAmountError}
          />
          {/* MOdals ens */}
          <Col>
            <Row className="d-flex">
              <Space direction="horizontal">
                <h2 as={Col} md={8}>
                  Coupen Details
                </h2>
                <h2
                  as={Col}
                  md={4}
                  className="buttonIcons mx-3"
                  onClick={addHandleShow}
                >
                  <i className="fas fa-plus-square"></i>{" "}
                </h2>
              </Space>
            </Row>
          </Col>
        </Row>
        <Row>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Coupen Name</th>
                <th>Discount (%)</th>
                <th>Min Amount</th>
                <th>Start Date</th>
                <th>Expiry Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <>
                {!coupen ? (
                  <Loader
                    type="Puff"
                    color="#00BFFF"
                    height={100}
                    width={100}
                    timeout={3000} //3 secs
                  />
                ) : (
                  <>
                    {coupen.map((value, i) => {
                      return (
                        <tr key={value._id}>
                          <td>{i + 1}</td>
                          <td>{value.name}</td>
                          <td>{value.percentage} %</td>
                          <td>₹{value.minAmount}</td>
                          <td>{value.createdAt}</td>
                          <td>{value.expiryDate}</td>
                          <td>
                            <i
                              className="fas fa-trash-alt buttonIcons"
                              id={value._id}
                            
                              onClick={deleteHandler}
                            ></i>
                          </td>
                        </tr>
                      );
                    })}
                  </>
                )}
              </>
            </tbody>
          </Table>
        </Row>
      </Container>
    </>
  );
}

export default CoupenViewScreen;
