import React, { useEffect } from "react";
import { Col, Row, Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { fetchProduct } from "../../REDUX/PRODUCTS/productAction";

function ShowProductScreen() {
  const { product } = useSelector((state) => state.product);
  const dispatch = useDispatch();

function deleteHandler(){

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
              <Table striped bordered hover>
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
                    ? product.map((products,no) => {
                      
                       return <>
                          <tr key={products._id}>
                            <td>{no+1}</td>
                            <td> <img className='table_image' src={products.imageUrl[0].img} id={products.imageUrl[0]._id} alt="productIMage" /> </td>
                            <td> {products.name}</td>
                            <td>{products.category}</td>
                            <td>{products.subCat}</td>
                            <td>{products.price}</td>
                            <td>{products.quantity}</td>
                            <div className='table-icons'>
                                <td>
            <i className="fas fa-trash-alt " id={products._id} onClick={deleteHandler}></i>
            {/* <i className="fas fa-edit" onClick={editHandler} id={category._id}></i> */}
            </td>
          </div>
                          </tr>
                        </>;
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
