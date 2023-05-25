import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCollapse,
  MDBIcon,
} from "mdb-react-ui-kit";
const Navbar = () => {
  const navigate = useNavigate();
  const [showNav, setShowNav] = useState(false);

  return (
    <>
      <MDBNavbar expand="lg" light bgColor="light">
        <MDBContainer fluid>
          <MDBNavbarBrand
            onClick={() => navigate("/home")}
            style={{ cursor: "pointer" }}
          >
            My-Yatra
          </MDBNavbarBrand>
          <MDBNavbarToggler
            type="button"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => setShowNav(!showNav)}
          >
            <MDBIcon icon="bars" fas />
          </MDBNavbarToggler>
          <MDBCollapse navbar show={showNav}>
            <MDBNavbarNav className="d-flex justify-content-end">
              <MDBNavbarItem>
                <MDBNavbarLink
                  onClick={() => navigate("/home")}
                  style={{ cursor: "pointer" }}
                >
                  Home
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink
                  onClick={() => navigate("/about")}
                  style={{ cursor: "pointer" }}
                >
                  About
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink
                  onClick={() => navigate("/login")}
                  style={{ cursor: "pointer" }}
                >
                  Login
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink
                  onClick={() => navigate("/register")}
                  style={{ cursor: "pointer" }}
                >
                  Register
                </MDBNavbarLink>
              </MDBNavbarItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    </>
  );
};

export default Navbar;
