import axios from "axios";
import React, { useEffect } from "react";
import { Col, Row, Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { fetchProduct } from "../../REDUX/PRODUCTS/productAction";
import ProductTableRow from "./ProductTableRow";
import swal from 'sweetalert'

function ShowProductScreen() {
    const { product } = useSelector((state) => state.product);
    const dispatch = useDispatch();

    function deleteHandler(event) {

        const id = event.target.id

        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this Product",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {

                    axios.get(`/admin/product/delete/${id}`).then(res => {


                        if (res.data) {
dispatch(fetchProduct())
                            swal("Product has been deleted!", {
                                icon: "success",
                            });
                        }
                    })
             


                } else {
                    swal("Product is safe!");
                }
            });
    }






    useEffect(() => {
        dispatch(fetchProduct());
    }, []);

    return (
        <Row>
            <Col>
                <div className="table-Container">
                    <Row>
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
                                    </tr>
                                </thead>
                                <tbody>
                                    {product
                                        ? product.map((products, no) => {

                                            return <ProductTableRow key={products._id} product={products} no={no} deleteHandler={deleteHandler} />
                                        })
                                        : null}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </div>
            </Col>
        </Row>
    );
}

export default ShowProductScreen;
