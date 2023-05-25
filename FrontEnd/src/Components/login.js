import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { userAction } from "../Actions/userAction";
import { useDispatch, useSelector } from "react-redux";
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

const Login = () => {
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.User.error);
  const [loginFormValue, setLoginFormValue] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    console.log(error.response);
    if (error) {
      alert(error);
    }
  }, [error]);

  const handleInputChange = (e) => {
    setLoginFormValue({ ...loginFormValue, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = loginFormValue;

    dispatch(userAction(email, password));
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
          <h5>Login</h5>
          <MDBCardBody>
            <MDBValidation
              onSubmit={handleSubmit}
              noValidate
              className="row g-3"
            >
              <div className="col-md-12">
                <MDBInput
                  label="Email"
                  type="email"
                  name="email"
                  value={loginFormValue.email}
                  onChange={handleInputChange}
                  required
                  invalid
                  validation="Please provide your email"
                />
              </div>
              <div className="col-md-12">
                <MDBInput
                  label="Password"
                  type="password"
                  name="password"
                  value={loginFormValue.password}
                  onChange={handleInputChange}
                  required
                  invalid
                  validation="Please provide your password"
                />
              </div>
              <div className="col-12">
                <MDBBtn style={{ width: "100%" }} className="mt-2">
                  Login
                </MDBBtn>
              </div>
            </MDBValidation>
          </MDBCardBody>
          <MDBCardFooter>
            <Link to="/register">
              <p>Don't have an account ? Register</p>
            </Link>
          </MDBCardFooter>
        </MDBCard>
      </div>
    </>
  );
};

export default Login;
