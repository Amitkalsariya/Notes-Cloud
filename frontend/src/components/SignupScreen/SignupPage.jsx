// import React, { useEffect, useState } from "react";
// import { Button, Col, Form, Row } from "react-bootstrap";
// import MainPage from "../MainPage/MainPage";
// import { Link, useNavigate } from "react-router-dom";
// import ErrorMsg from "../ErrorMsg/ErrorMsg";

// import Loading from "../Loading/Loading";
// import { useDispatch, useSelector } from "react-redux";
// import { register } from "../../actions/userAction";
// const SignupPage = () => {
//   const [email, setEmail] = useState("");
//   const [name, setName] = useState("");
//   const [pic, setPic] = useState(
//     "https://images.rawpixel.com/image_png_social_square/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsX29mZmljZV8zNF9mdWxsX2JvZHlfM2RfYXZhdGFyXzNkX3JlbmRlcl9vZl9hX2J1c2luZXNzbV82OGUzZDg5NS0yMGI0LTQ0ODMtYjY2OS0yMWI0ODRlZTZiYzNfMS5wbmc.png"
//   );
//   const [password, setPassword] = useState("");
//   const [confirmpassword, setConfirmPassword] = useState("");
//   const [message, setMessage] = useState(null);
//   const [picMessage, setPicMessage] = useState(null);
//   const dispatch = useDispatch();
//   const navigate=useNavigate()
//   const userRegister = useSelector((state) => state.userRegister);

//   const { error, loading, userInfo } = userRegister;
//   useEffect(()=>{
//     if(userInfo)
//     {
//       navigate("/mynotes")
//     }
//   },[navigate,userInfo])
//   const handleSubmit = async (e) => {
// e.preventDefault();
// if(password!== confirmpassword)
// {
//   setMessage("Password Do Not Match")
// }
// else{
//   dispatch(register(name,email,password,pic))
// }
//   };
//   const postDetails = (pics) => {
//     if (!pics) {
//       setPicMessage("Please Select an Image");
//       return;
//     }

//     console.log("Selected File:", pics); // 🔍 Debug file details

//     if (pics.type !== "image/jpeg" && pics.type !== "image/png") {
//       setPicMessage("Invalid file format. Please select a PNG or JPEG image.");
//       return;
//     }

//     const data = new FormData();
//     data.append("file", pics);
//     data.append("upload_preset", "Cloud_Memo");
//     data.append("cloud_name", "dqtdj39bp");

//     fetch("https://api.cloudinary.com/v1_1/dqtdj39bp/image/upload", {
//       method: "post",
//       body: data,
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         console.log("Cloudinary Response:", data);
//         if (data.secure_url) {
//           setPic(data.secure_url);
//           console.log("Uploaded Image URL:", data.secure_url);
//         } else {
//           console.error("Upload Failed:", data);
//         }
//       })
//       .catch((err) => console.error("Upload Error:", err));
//   };

//   return (
//     <MainPage title="REGISTER">
//       <div className="loginContainer">
//         {error && <ErrorMsg variant="danger">{error}</ErrorMsg>}
//         {message && <ErrorMsg variant="danger">{message}</ErrorMsg>}
//         {loading && <Loading />}{" "}
//         <Form onSubmit={handleSubmit}>
//           <Form.Group controlId="name">
//             <Form.Label>Name</Form.Label>
//             <Form.Control
//               type="name"
//               value={name}
//               placeholder="Enter name"
//               onChange={(e) => setName(e.target.value)}
//             />
//           </Form.Group>

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

//           <Form.Group controlId="confirmPassword">
//             <Form.Label>Confirm Password</Form.Label>
//             <Form.Control
//               type="password"
//               value={confirmpassword}
//               placeholder="Confirm Password"
//               onChange={(e) => setConfirmPassword(e.target.value)}
//             />
//           </Form.Group>

//           {picMessage && <ErrorMsg variant="danger">{picMessage}</ErrorMsg>}
//           <Form.Group controlId="pic">
//             <Form.Label>Profile Picture</Form.Label>
//             <Form.Control
//               type="file"
//               accept="image/png, image/jpeg"
//               onChange={(e) => postDetails(e.target.files[0])}
//               label="Upload Profile Picture"
//             />
//           </Form.Group>

//           <Button variant="primary" type="submit">
//             Register
//           </Button>
//         </Form>
//         <Row className="py-3">
//           <Col>
//             Have an Account ? <Link to="/login">Login</Link>
//           </Col>
//         </Row>
//       </div>
//     </MainPage>
//   );
// };

// export default SignupPage;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../actions/userAction";
import Loading from "../Loading/Loading";
import ErrorMsg from "../ErrorMsg/ErrorMsg";
import "./SignupPage.css";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pic, setPic] = useState(
    "https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
  );
  const [picName, setPicName] = useState("No file selected"); // ✅ Store selected image name
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [picMessage, setPicMessage] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userRegister = useSelector((state) => state.userRegister);
  const { error, loading, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      navigate("/mynotes");
    }
  }, [navigate, userInfo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(register(name, email, password, pic));
    }
  };

  const postDetails = (pics) => {
    if (!pics) {
      setPicMessage("Please Select an Image");
      return;
    }

    if (pics.type !== "image/jpeg" && pics.type !== "image/png") {
      setPicMessage("Invalid file format. Please select a PNG or JPEG image.");
      return;
    }

    setPicName(pics.name); // ✅ Update file name when selected

    const data = new FormData();
    data.append("file", pics);
    data.append("upload_preset", "Cloud_Memo");
    data.append("cloud_name", "dqtdj39bp");

    fetch("https://api.cloudinary.com/v1_1/dqtdj39bp/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.secure_url) {
          setPic(data.secure_url);
        }
      })
      .catch((err) => console.error("Upload Error:", err));
  };

  return (
    <div className="signup-page-container">
      {loading && (
        <div className="loading-overlay">
          <Loading />
        </div>
      )}

      <div className="signup-box">
        <h2 className="signup-title">Create Your Account</h2>
        <p className="signup-subtitle">Join us and start organizing your notes</p>

        {error && <ErrorMsg variant="danger">{error}</ErrorMsg>}
        {message && <ErrorMsg variant="danger">{message}</ErrorMsg>}

        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-group">
            <label className="label">Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="label">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {picMessage && <ErrorMsg variant="danger">{picMessage}</ErrorMsg>}

          <div className="form-group file-input-group">
            <label className="label">Profile Picture</label>
            <label className="custom-file-upload">
              <input
                type="file"
                accept="image/png, image/jpeg"
                onChange={(e) => postDetails(e.target.files[0])}
              />
              Choose Image
            </label>
            <span className="file-name">{picName}</span> {/* ✅ Show selected file name */}
          </div>

          <button type="submit" className="btn-submit" disabled={loading}>
            Register
          </button>
        </form>

        <p className="login-link">
          Already have an account? <a href="/login">Login here</a>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
