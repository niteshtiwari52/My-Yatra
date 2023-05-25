import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCardFooter,
  MDBValidation,
  MDBBtn,
  MDBIcon,
  MDBSpinner,
} from "mdb-react-ui-kit";

const Register = () => {
  const [FormValue, setFormValue] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handlechange = (e) => {
    setFormValue({ ...FormValue, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "450px",
          alignContent: "center",
          marginTop: "120px",
        }}
      >
        <MDBCard alignment="center">
          <MDBIcon fas icon="user-circle" className="fa-2x" />
          <h5>Register</h5>
          <MDBCardBody>
            <MDBValidation
              onSubmit={handleSubmit}
              noValidate
              className="row g-3"
            >
              <div className="col-md-12">
                <MDBInput
                  label="Name"
                  type="text"
                  name="name"
                  value={FormValue.name}
                  onChange={handlechange}
                  required
                  invalid
                  validation="Please provide first name"
                />
              </div>

              <div className="col-md-12">
                <MDBInput
                  label="Email"
                  type="email"
                  name="email"
                  value={FormValue.email}
                  onChange={handlechange}
                  required
                  invalid
                  validation="Please provide email"
                />
              </div>
              <div className="col-md-12">
                <MDBInput
                  label="Password"
                  type="password"
                  name="password"
                  value={FormValue.password}
                  onChange={handlechange}
                  required
                  invalid
                  validation="Please provide password"
                />
              </div>
              <div className="col-md-12">
                <MDBInput
                  label="Confirm Password"
                  type="password"
                  name="confirmPassword"
                  value={FormValue.confirmPassword}
                  onChange={handlechange}
                  required
                  invalid
                  validation="Please provide confirm password"
                />
              </div>
              <div className="col-12">
                <MDBBtn style={{ width: "100%" }} className="mt-2">
                  Register
                </MDBBtn>
              </div>
            </MDBValidation>
          </MDBCardBody>
          <MDBCardFooter>
            <Link to="/login">
              <p>Already have an account ? Login</p>
            </Link>
          </MDBCardFooter>
        </MDBCard>
      </div>
    </>
  );
};
export default Register;
