import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { SiShopify } from "react-icons/si";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../Store/features/user_slice";
import { logout as logoutStore } from "../../Store/features/authSlice";
import { useNavigate } from "react-router-dom";
import SearchBox from "../SearchBox";

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { UserInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutapi] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutapi();
      dispatch(logoutStore());
      navigate("/login");
    } catch (error) {
      console.log("error in logout in header", error);
    }
  };

  return (
    <header>
      <Navbar
        bg="dark"
        variant="dark"
        expand="md"
        collapseOnSelect
        className="py-3 shadow-md"
      >
        <Container>
          {/* Logo */}
          <Navbar.Brand
            as={Link}
            to="/"
            className="d-flex align-items-center gap-2 text-xl font-bold text-green-400 hover:text-green-300 transition"
          >
            <SiShopify size={28} />
            <span>Shop</span>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto flex items-center gap-4">
              <SearchBox />

              {/* Cart */}
              <Nav.Link
                as={Link}
                to="/cart"
                className="relative flex items-center gap-1 hover:text-green-300 transition"
              >
                <FaShoppingCart />
                Cart
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-0.5">
                    {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                  </span>
                )}
              </Nav.Link>

              {/* User Menu */}
              {UserInfo ? (
                <NavDropdown
                  title={<span className="font-semibold">{UserInfo.name}</span>}
                  id="username"
                  menuVariant="dark"
                >
                  <NavDropdown.Item as={Link} to="/profile">
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link
                  as={Link}
                  to="/login"
                  className="hover:text-green-300 transition"
                >
                  <FaUser /> Sign In
                </Nav.Link>
              )}

              {/* Admin Menu */}
              {UserInfo && UserInfo.isAdmin && (
                <NavDropdown title="Admin" id="adminmenu" menuVariant="dark">
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
