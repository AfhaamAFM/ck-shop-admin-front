import axios from "axios";
import React, { useEffect } from "react";
import { Link, useNavigate} from "react-router-dom";
import { useDispatch } from "react-redux";
import { adminlogged } from "../../REDUX/admin/adminAction";
import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";

function Sibebar() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(adminlogged());
  }, [dispatch]);

  function logoutHandler() {
    axios
      .get("/admin/logout")
      .then((res) => {
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div>
      <div git className="sidebar">
        <div className="logo-details">
          <i className="bx bxl-c-plus-plus"></i>
          <span className="logo_name">CK SHOP ADMIN</span>
        </div>
        <ul id="navLinks" className="nav-links">
          <li>
            <Link to="/dashboard">
              <i className="bx bx-grid-alt"></i>
              <span className="links_name">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="/category">
              <i className="bx bx-coin-stack"></i>
              <span className="links_name">Category</span>
            </Link>
          </li>
          <li>
            <Link to="/product">
              <i className="bx bx-box"></i>
              <span className="links_name">Products</span>
            </Link>
          </li>
          <li>
            <Link to="/orders">
              <i className="bx bx-box"></i>
              <span className="links_name">Orders</span>
            </Link>
          </li>
          <li>
            <Link to="/offers">
              <i className="fas fa-percent"></i>{" "}
              <span className="links_name">Offers{' & '}coupen</span>
            </Link>
          </li>

          <li>
            <Link to="/sales">
              <i className="fas fa-balance-scale-left"></i>
              <span className="links_name">Sales</span>
            </Link>
          </li>
          {/* <li>
            <a href="#">
              <i className="bx bx-pie-chart-alt-2"></i>
              <span className="links_name">Analytics</span>
            </a>
          </li> */}

          {/* <li>
            <a href="#">
              <i className="bx bx-book-alt"></i>
              <span className="links_name">Total order</span>
            </a>
          </li> */}
          <li>
            <Link to="/userManage">
              <i className="bx bx-user"></i>
              <span className="links_name">User Managment</span>
            </Link>
          </li>
          {/* <li>
            <a href="#">
              <i className="bx bx-message"></i>
              <span className="links_name">Messages</span>
            </a>
          </li> */}
          {/* <li>
            <a href="#">
              <i className="bx bx-heart"></i>
              <span className="links_name">Favrorites</span>
            </a>
          </li> */}
          {/* <li>
            <a href="#">
              <i className="bx bx-cog"></i>
              <span className="links_name">Setting</span>
            </a>
          </li> */}
          <Button variant="danger" onClick={logoutHandler}>
            logout
          </Button>
        </ul>
      </div>
      <nav className="header">
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand href="#home"></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#link">Link</Nav.Link>
                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">
                    Something
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Separated link
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </nav>
    </div>
  );
}

export default Sibebar;
