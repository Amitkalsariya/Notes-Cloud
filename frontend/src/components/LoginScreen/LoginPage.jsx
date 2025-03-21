// import React, { useEffect } from "react";
// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "./LoginPage.css";

// import { Form, Button, Row, Col } from "react-bootstrap";
// import MainPage from "../MainPage/MainPage";
// import Loading from "../Loading/Loading";
// import ErrorMsg from "../ErrorMsg/ErrorMsg";
// import { useDispatch, useSelector } from "react-redux";
// import { login } from "../../actions/userAction";
// const LoginPage = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate=useNavigate()
//   const dispatch=useDispatch()


//   const userLogin=useSelector((state)=> state.userLogin)
//   const {loading,error,userInfo}=userLogin

//   useEffect(()=>{
//     if(userInfo)
//     {
//       navigate("/mynotes")
//     }
//   },[navigate,userInfo])
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     dispatch(login(email,password))
   
//   };
//   return (
//     <MainPage title="LOGIN">
//       <div className="loginContainer">
//          {error && <ErrorMsg variant="danger">{error}</ErrorMsg>}
//         {loading && <Loading />} 
//         <Form onSubmit={handleSubmit}>
//           <Form.Group controlId="formBasicEmail">
//             <Form.Label>Email address</Form.Label>
//             <Form.Control
//               type="email"
//               value={email}
//               placeholder="Enter email"
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </Form.Group>

//           <Form.Group controlId="formBasicPassword">
//             <Form.Label>Password</Form.Label>
//             <Form.Control
//               type="password"
//               value={password}
//               placeholder="Password"
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </Form.Group>
//           <Button variant="dark" type="submit">
//             Submit
//           </Button>
//         </Form>
//         <Row className="py-3">
//           <Col>
//             New Customer ? <Link to="/register">Register Here</Link>
//           </Col>
//         </Row>
//       </div>
//     </MainPage>
//   );
// };

// export default LoginPage;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/userAction";
import Loading from "../Loading/Loading";
import ErrorMsg from "../ErrorMsg/ErrorMsg";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      navigate("/mynotes");
    }
  }, [navigate, userInfo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <div className="login-page-container">
      {loading && (
        <div className="loading-overlay">
          <Loading />
        </div>
      )}

      <div className="login-box">
        <h2 className="login-title">Welcome Back</h2>
        <p className="login-subtitle">Sign in to access your notes</p>

        {error && <ErrorMsg variant="danger">{error}</ErrorMsg>}

        <form onSubmit={handleSubmit} className="signin-form">
          <div className="form-group">
            <label className="label" htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="label" htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-group d-flex align-items-center">
            <label className="checkbox-wrap">
              Remember Me
              <input type="checkbox"/>
              <span className="checkmark"></span>
            </label>
          </div>

          <div className="form-group">
            <button type="submit" className="btn-submit" disabled={loading}>
              Sign In
            </button>
          </div>
        </form>

        <p className="register-link">
          New User? <a href="/register">Create an Account</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
