  import React, { useEffect, useState } from "react";
  import MainPage from "../MainPage/MainPage";
  import { Button, Col, Form, Row } from "react-bootstrap";
  import { useDispatch, useSelector } from "react-redux";
  import ErrorMsg from "../ErrorMsg/ErrorMsg";
  import { useNavigate } from "react-router-dom";
  import { updateProfile } from "../../actions/userAction";
  import Loading from "../Loading/Loading";
  import "./Profile.css";

  const Profile = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pic, setPic] = useState();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [picMessage, setPicMessage] = useState();
    const [showSuccess, setShowSuccess] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const userUpdate = useSelector((state) => state.userUpdate);
    const { loading, error, success } = userUpdate;

    useEffect(() => {
      if (!userInfo) {
        navigate("/");
      } else {
        setName(userInfo.name);
        setEmail(userInfo.email);
        setPic(userInfo.pic);
      }
    }, [navigate, userInfo]);

    useEffect(() => {
      if (success) {
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
        }, 3000);
      }
    }, [success]);

    const postDetails = (pics) => {
      if (!pics) {
        setPicMessage("Please Select an Image");
        return;
      }

      if (pics.type !== "image/jpeg" && pics.type !== "image/png") {
        setPicMessage("Invalid file format. Please select a PNG or JPEG image.");
        return;
      }

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

    const handleSubmit = (e) => {
      e.preventDefault();
      if (password === confirmPassword)
        dispatch(updateProfile({ name, email, password, pic }));
    };

    return (
      <MainPage title={<h2 className="edit-profile-title">Edit Profile</h2>}>

        <div>
          <Row className="profilesContainer">
            <Col md={6}>
              <Form onSubmit={handleSubmit} className="profile-form">
                {loading && <Loading />}
                
                {showSuccess && (
                  <ErrorMsg variant="success">Updated Successfully</ErrorMsg>
                )}
                
                {error && <ErrorMsg variant="danger">{error}</ErrorMsg>}

                <Form.Group controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="modern-input"
                  />
                </Form.Group>

                <Form.Group controlId="email">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="modern-input"
                  />
                </Form.Group>

                <Form.Group controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="modern-input"
                  />
                </Form.Group>

                <Form.Group controlId="confirmPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="modern-input"
                  />
                </Form.Group>

                {picMessage && <ErrorMsg variant="danger">{picMessage}</ErrorMsg>}

                <Form.Group controlId="pic" className="file-input-group">
                  <Form.Label>Change Profile Picture</Form.Label>
                  <label className="custom-file-upload">
                    <input
                      type="file"
                      accept="image/png, image/jpeg"
                      onChange={(e) => postDetails(e.target.files[0])}
                    />
                    Choose Image
                  </label>
                </Form.Group>

                <Button type="submit" className="modern-button">
                  Update
                </Button>
              </Form>
            </Col>
            <Col className="profile-image-container">
              <img src={pic} alt={name} className="profilePic" />
            </Col>
          </Row>
        </div>
      </MainPage>
    );
  };

  export default Profile;
