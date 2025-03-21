import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/userAction";

const Header = ({ setSearch }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <Container fluid className="p-0"> {/* ✅ Ensures the header stays within its container */}
      <Navbar
        expand="lg"
        style={{
          background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
          padding: "14px 0",
        }}
        variant="dark"
      >
        <Container style={{ maxWidth: "1140px" }}> {/* ✅ Ensures the header stays centered */}
          {/* Brand Name */}
          <Navbar.Brand
            as={Link}
            to="/"
            style={{
              fontWeight: "bold",
              fontSize: "1.8rem",
              letterSpacing: "1.2px",
              color: "#ffffff",
              marginLeft: "10px",
              textDecoration: "none",
            }}
          >
            Cloud Memo
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ marginRight: "10px" }} />

          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
            {/* Search Bar */}
            <Form className="d-flex mx-auto" style={{ width: "100%", maxWidth: "250px" }}>
              <Form.Control
                type="search"
                placeholder="🔍 Search..."
                className="me-2"
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Search"
                style={{
                  borderRadius: "25px",
                  padding: "10px 15px",
                  border: "none",
                  outline: "none",
                  fontSize: "1rem",
                  boxShadow: "0px 0px 6px rgba(255, 255, 255, 0.3)",
                  backgroundColor: "#f8f9fa",
                }}
              />
            </Form>

            {/* Navigation Links */}
            {userInfo ? (
              <Nav className="ms-auto mt-2 mt-lg-0">
                <Nav.Link
                  as={Link}
                   className="w-full sm:w-auto text-center"
                  to="/mynotes"
                  style={{
                    fontWeight: "600",
                    fontSize: "1.2rem",
                    color: "#ffffff",
                    margin: "5px 15px",
                    transition: "0.3s",
                    textDecoration: "none",
                  }}
                  onMouseOver={(e) => (e.target.style.color = "#FFD700")}
                  onMouseOut={(e) => (e.target.style.color = "#ffffff")}
                >
                  My Notes
                </Nav.Link>

                <NavDropdown
                  title={userInfo?.name}
                  className="w-full sm:w-auto text-center"
                  id="basic-nav-dropdown"
                  style={{ fontSize: "1.2rem", marginTop: "5px" }}
                >
                  <NavDropdown.Item as={Link} className="text-center" to="/profile" style={{ fontSize: "15px" }}>
                    My Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={handleLogout}className="text-center"style={{ fontSize: "15px" }}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            ) : (
              <Nav className="ms-auto">
                <Nav.Link
                  as={Link}
                  className="w-full sm:w-auto text-center"
                  to="/login"
                  style={{
                    fontWeight: "600",
                    fontSize: "1.2rem",
                    color: "#ffffff",
                    margin: "5px 15px",
                    transition: "0.3s",
                    textDecoration: "none",
                  }}
                  onMouseOver={(e) => (e.target.style.color = "#FFD700")}
                  onMouseOut={(e) => (e.target.style.color = "#ffffff")}
                >
                  Login
                </Nav.Link>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container> {/* ✅ Ensures header is contained and centered */}
      </Navbar>
    </Container>
  );
};

export default Header;
