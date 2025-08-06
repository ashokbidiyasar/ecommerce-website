import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { SiShopify } from "react-icons/si";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { useSelector,useDispatch } from "react-redux";
import { useLogoutMutation } from "../../Store/features/user_slice";
import { logout as logoutStore } from "../../Store/features/authSlice";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { UserInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutapi] = useLogoutMutation();
  
  const logoutHandler = async() => {
      try {
        await logoutapi();
        dispatch(logoutStore());
        navigate("/login");
      } catch (error) {
         console.log("error in logout in header",error);
      }
  };
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
        <Container>
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center gap-2">
            <SiShopify />
            Shop
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/cart">
                <div className="flex space-x-1 items-center">
                  <FaShoppingCart /> Cart
                  {cartItems.length > 0 ? (
                    <div className="px-2 rounded-[50%] bg-green-400 text-white font-semibold text-center">
                      {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                    </div>
                  ) : null}
                </div>
              </Nav.Link>
              {UserInfo ? (
                <>
                  <NavDropdown title={UserInfo.name} id="username">
                    <NavDropdown.Item as={Link} to="/profile">
                      Profile
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <Nav.Link as={Link} to="/login">
                  <FaUser /> Sign In
                </Nav.Link>
              )}

              {/* Admin Links */}
              {UserInfo && UserInfo.isAdmin && (
                <NavDropdown title="Admin" id="adminmenu">
                  <NavDropdown.Item as={Link} to="/admin/productlist">
                    Products
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/admin/orderlist">
                    Orders
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/admin/userlist">
                    Users
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
