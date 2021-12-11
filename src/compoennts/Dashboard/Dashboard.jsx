import React, { useEffect, useState } from "react";
import Sibebar from "../adminRoutes/Sibebar";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../REDUX/GET USER/userAction";
import { fetchDashboardCount } from "../../REDUX/admin/adminAction";
import Loader from "react-loader-spinner";
import { Table, Row, Col } from "react-bootstrap";
import { fetchOrders } from "../../REDUX/ORDERSTORE/orderAction";
import { Link } from "react-router-dom";
import {PieChart} from "./ChartJs/PieChart";
// import PieChart from "./ChartJs/PieChart";

function Dashboard() {
  const [totalSales, setTotalSales] = useState();
  const [totalOrders, setTotalOrders] = useState();
  const [totalDelivary, setTotalDelivary] = useState();
  const [totalProduct, setTotalProduct] = useState();
  const [orderHere, setOrderHere] = useState();

  const dispatch = useDispatch();
  const { countDetails, loading: countLoading } = useSelector(
    (state) => state.dashboardCount
  );
  const { orders, loading: orderLoading } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(fetchUser());
    dispatch(fetchDashboardCount());
    dispatch(fetchOrders());
  }, [dispatch]);

  useEffect(() => {
    if (!countDetails) return;
    setTotalSales(countDetails.totalSalesAmount);
    setTotalProduct(countDetails.totalProduct);
    setTotalDelivary(countDetails.totalDeliveryCount);
    setTotalOrders(countDetails.totalOrders);

    if (!orders) return;

    const extOrder = orders.splice(0, 10);
    setOrderHere(extOrder);
  }, [dispatch, countDetails]);

  console.log(orderHere);
  return (
    <>
      <Sibebar />

      <section className="home-section">
        <div className="home-content">
          {countLoading ? (
            <Loader
              type="Puff"
              color="#00BFFF"
              height={100}
              width={100}
              timeout={3000} //3 secs
            />
          ) : (
            <div className="overview-boxes">
              <div className="box">
                <div className="right-side">
                  <div className="box-topic">Total Order</div>
                  <div className="number">{totalOrders}</div>
                  <div className="indicator">
                    <i className="bx bx-up-arrow-alt"></i>
                    <span className="text">Up from yesterday</span>
                  </div>
                </div>
                <i className="bx bx-cart-alt cart"></i>
              </div>
              <div className="box">
                <div className="right-side">
                  <div className="box-topic">Total Sales</div>
                  <div className="number">₹{totalSales}</div>
                  <div className="indicator">
                    <i className="bx bx-up-arrow-alt"></i>
                    <span className="text">Up from yesterday</span>
                  </div>
                </div>
                <i className="bx bxs-cart-add cart two"></i>
              </div>
              <div className="box">
                <div className="right-side">
                  <div className="box-topic">Total Products</div>
                  <div className="number">{totalProduct}</div>
                  <div className="indicator">
                    <i className="bx bx-up-arrow-alt"></i>
                    <span className="text">Up from yesterday</span>
                  </div>
                </div>
                <i className="bx bx-cart cart three"></i>
              </div>
              <div className="box">
                <div className="right-side">
                  <div className="box-topic">Total Delivary</div>
                  <div className="number">{totalDelivary}</div>
                  <div className="indicator">
                    <i className="bx bx-down-arrow-alt down"></i>
                    <span className="text">Down From Today</span>
                  </div>
                </div>
                <i className="bx bxs-cart-download cart four"></i>
              </div>
            </div>
          )}

          <div className="sales-boxes">
            <div className="recent-sales box">
              <div className="title">Recent Sales</div>
              <Table hover variant="light" borderless>
                <thead>
                  <tr>
                    <th>Date </th>
                    <th>Customer</th>
                    <th>Status</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {orderLoading
                    ? ""
                    : orderHere?.map((value) => {
                        return (
                          <tr key={value.orders._id}>
                            <td>{value.updatedAt}</td>
                            <td>{value.email}</td>
                            <td>{value.orders.orderStatus}</td>
                            {value.orders.isPaid ? (
                              <td style={{ color: "green" }}>
                                {value.orders.amount}
                              </td>
                            ) : (
                              <td style={{ color: "red" }}>
                                {value.orders.amount}
                              </td>
                            )}
                          </tr>
                        );
                      })}
                </tbody>
              </Table>
              <div className="button">
                <Link to="/orders">See All</Link>
              </div>
            </div>
            <div className="top-sales box">
              <div className="title">Top Seling Product</div>
              <ul className="top-sales-details">
                <li>
                  <a href="#">
                    <img src="images/sunglasses.jpg" alt="" />
                    <span className="product">Vuitton Sunglasses</span>
                  </a>
                  <span className="price">$1107</span>
                </li>
                <li>
                  <a href="#">
                    <img src="images/jeans.jpg" alt="" />
                    <span className="product">Hourglass Jeans </span>
                  </a>
                  <span className="price">$1567</span>
                </li>
                <li>
                  <a href="#">
                    <img src="images/nike.jpg" alt="" />
                    <span className="product">Nike Sport Shoe</span>
                  </a>
                  <span className="price">$1234</span>
                </li>
                <li>
                  <a href="#">
                    <img src="images/scarves.jpg" alt="" />
                    <span className="product">Hermes Silk Scarves.</span>
                  </a>
                  <span className="price">$2312</span>
                </li>
                <li>
                  <a href="#">
                    <img src="images/blueBag.jpg" alt="" />
                    <span className="product">Succi Ladies Bag</span>
                  </a>
                  <span className="price">$1456</span>
                </li>
                <li>
                  <a href="#">
                    <img src="images/bag.jpg" alt="" />
                    <span className="product">Gucci Womens's Bags</span>
                  </a>
                  <span className="price">$2345</span>
                </li>
                <li>
                  <a href="#">
                    <img src="images/addidas.jpg" alt="" />
                    <span className="product">Addidas Running Shoe</span>
                  </a>
                  <span className="price">$2345</span>
                </li>
                <li>
                  <a href="#">
                    <img src="images/shirt.jpg" alt="" />
                    <span className="product">Bilack Wear's Shirt</span>
                  </a>
                  <span className="price">$1245</span>
                </li>
              </ul>
            </div>
          </div>

          <Row className="sales-boxes ">
            <Col  className="recent-sales box my-4">
              <PieChart type='pie' />
            </Col >
            <Col  className="top-sales box my-4"></Col >
          </Row>
        </div>
      </section>
    </>
  );
}

export default Dashboard;
