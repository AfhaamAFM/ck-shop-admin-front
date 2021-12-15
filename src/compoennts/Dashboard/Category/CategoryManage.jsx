import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Table,
  Col,
  Button,
  Tab,
  Tabs,
  Badge,
} from "react-bootstrap";
import Sibebar from "../../adminRoutes/Sibebar";
import Loader from "react-loader-spinner";

import { useDispatch, useSelector } from "react-redux";
import { fetchCategory } from "../../../REDUX/category/categoryAction";
import axios from "axios";
import swal from "sweetalert";
import Subctegory from "../Category/Subctegory";

import CategoryEditModal from "./CategoryEditModal";
import OfferModal from "./OfferModal";
import format from "../../../simple-react-form-validation-helper1/utilFunctions";
import Swal from "sweetalert2";
import { fetchProduct } from "../../../REDUX/PRODUCTS/productAction";
import { fetchOffers } from "../../../REDUX/OFFER/offerAction";

function CategoryManage() {
  const [categoryName, setCategory] = useState("");
  const { category, loading } = useSelector((state) => state.category);
  const {offers } = useSelector((state) => state.offer);

  const [show, setShow] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [oldCategory, setOldCategory] = useState("");
  const [nameError, setError] = useState("");

  //offer modal states

  const [offeredCategory, setOfferedCategory] = useState("");
  const [offerShow, setOfferShow] = useState(false);
  const [viewMode, setViewMode] = useState(false);

  const [offerName, setOfferName] = useState();
  const [percentage, setPercentage] = useState();
  const [expiryDate, setExpiryDate] = useState();
  const [offerId, setOfferId] = useState();
  const [warning, setWarning] = useState();
  const [categoryId, setCategoryId] = useState();
  // offer modal states

  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = (e) => {
    setShow(true);
    setOldCategory(e.target.id);
    setNewCategory(e.target.id);
    console.log(e.target.id);
  };

  // modal handler

  function seeOfferHandler(e) {
    const id = e.target.id;
    setCategoryId(id);
    setViewMode(true);
    const thisCategory = category.find((value) => value.category === id);
    const { offer } = thisCategory;

    const { offerName, expiryDate, percentage } = offer;
    setOfferName(offerName);
    setPercentage(percentage);
    setExpiryDate(format.dateFormatter(expiryDate));
    console.log(offer);

    offerHandleShow();
  }

  const offerHandleClose = () => {
    setViewMode(false);
    setOfferShow(false);
  };
  const offerHandleShow = () => setOfferShow(true);

  function showOfferModal(e) {
    const value = e.target.id;

    setOfferedCategory(value);
    offerHandleShow();
  }

  async function showOfferHandler(e) {
    const selectedOffer = offers.find(
      (value) => value.offerName === e.target.value
    );
    const { offerName, percentage, expiryDate, _id } = selectedOffer;
    const formatedDate = format.dateFormatter(expiryDate);

    setOfferName(offerName);
    setPercentage(percentage);
    setExpiryDate(formatedDate);
    setOfferId(_id);
  }

  const applyOfferHandler = (e) => {
    // const offerId = e.target.id;

    if (!offerId) return setWarning("Select a offer");
    axios
      .post("/offer/applyCategoryOffer", { offeredCategory, offerId })
      .then((res) => {
        if (res.data.warning) {
          return Swal.fire(res.data.warning);
        }

        if (res.data) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: res.data.response,
            showConfirmButton: false,
            timer: 1500,
          });
          dispatch(fetchCategory());
          dispatch(fetchProduct());
          return offerHandleClose();
        }
      })
      .catch((err) => {
        console.error("this is apply offer arror  " + err);
      });
  };

  function removeOfferHandler() {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.get(`/offer/removeOffer/category/${categoryId}`).then((res) => {
          if (res.data.response) {
            Swal.fire(res.data.response);
            dispatch(fetchProduct());
            dispatch(fetchCategory());

            return offerHandleClose();
          }
          if (res.data.warning) {
            Swal.fire(res.data.warning);
            // dispatch(fetchProduct());
            return offerHandleClose();
          }
        });
      }
    });
  }

  // offer modal end

  function editHandler() {
    axios
      .post("/admin/category/edit", { oldCategory, newCategory })
      .then((res) => {
        if (res.data.response) {
          swal(res.data.response);
        }
        if (res.data === true) {
          handleClose();
          swal("Added successfully");
          dispatch(fetchCategory());
        }
      });
  }

  function addHandler() {
    axios.post("/admin/category/add", { categoryName }).then((res) => {
      console.log(res.data.response);
      if (res.data.response) {
        swal(res.data.response);
      }
      if (res.data === true) {
        swal("Added successfully");
        dispatch(fetchCategory());
      }
    });
  }

  function deleteHandler(event) {
    const id = event.target.id;
    console.log(id);
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this Category!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .get(`/admin/category/delete/${id}`)
          .then((res) => {
            if (res.data) {
              dispatch(fetchCategory());
              swal("Category has been deleted!", {
                icon: "success",
              });
            }
          });
        // category/delete/:id
      } else {
        swal("Category is safe!");
      }
    });
  }

  useEffect(() => {
    dispatch(fetchOffers())
    dispatch(fetchCategory());
  }, [dispatch]);

  return (
    <>
      <Sibebar />

      <div className="home-section">
        <Container>
          <OfferModal
            showOfferHandler={showOfferHandler}
            offers={offers}
            offerHandleClose={offerHandleClose}
            viewMode={viewMode}
            offerShow={offerShow}
            offerName={offerName}
            percentage={percentage}
            warning={warning}
            applyOfferHandler={applyOfferHandler}
            offerId={offerId}
            expiryDate={expiryDate}
            category={category}
            removeOfferHandler={removeOfferHandler}
          />
          <CategoryEditModal
            setNewCategory={setNewCategory}
            nameError={nameError}
            setError={setError}
            oldCategory={oldCategory}
            newCategory={newCategory}
            show={show}
            handleClose={handleClose}
            editHandler={editHandler}
            // offerName,offerId,date,discount applyOfferHandler,removeOfferHandler,showOfferHandler,offers
          />
          <Tabs
            defaultActiveKey="Category"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="Category" title="Home">
              <Row className="align-items-center">
                <h2>Category List</h2>
                <div className="table-Container">
                  <Col sm={12} md={8} className="mx-auto mt-5">
                    {loading ? (
                      <Loader
                        type="Puff"
                        color="#00BFFF"
                        height={100}
                        width={100}
                        timeout={3000} //3 secs
                      />
                    ) : (
                      <Table striped bordered hover>
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Category</th>
                            <th>Sub category</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {category.map((category, i) => {
                            return (
                              <tr key={category._id}>
                                <td>{i + 1}</td>
                                {!category.isOffer ? (
                                  <td> {category.category}</td>
                                ) : (
                                  <td>
                                    {" "}
                                    {category.category}{" "}
                                    <Badge
                                      style={{ cursor: "pointer" }}
                                      className="me-auto"
                                      bg="success"
                                      id={category.category}
                                      onClick={seeOfferHandler}
                                    >
                                      Show offer
                                    </Badge>
                                  </td>
                                )}
                                <td>{category?.subCat.length}</td>
                                <td>
                                  <div className="table-icons">
                                    <i
                                      className="fas fa-trash-alt "
                                      id={category._id}
                                      onClick={deleteHandler}
                                    ></i>
                                    <i
                                      className="fas fa-edit"
                                      onClick={handleShow}
                                      id={category.category}
                                    ></i>
                                    <i
                                      className="fas fa-tag"
                                      onClick={showOfferModal}
                                      id={category.category}
                                    ></i>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </Table>
                    )}

                    <div className="add-new mx-3">
                      <input
                        name="category"
                        placeholder="Enter new category"
                        onChange={(e) => {
                          setCategory(e.target.value);
                        }}
                      />
                      <Button variant="success" onClick={addHandler}>
                        Add new Category
                      </Button>
                    </div>
                  </Col>
                </div>
              </Row>
            </Tab>
            <Tab eventKey="profile" title="sub category">
              <Subctegory />
            </Tab>
            {/* <Tab eventKey="contact" title="EDit">
   <EditCtaegoryScreen/>
  </Tab> */}
          </Tabs>
        </Container>
      </div>
    </>
  );
}

export default CategoryManage;
