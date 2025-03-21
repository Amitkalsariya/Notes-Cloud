import React, { useState } from "react";
import MainPage from "../MainPage/MainPage";
import { Button, Card, Form, Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createNoteAction } from "../../actions/noteActions";
import Loading from "../Loading/Loading";
import ErrorMsg from "../ErrorMsg/ErrorMsg";
import ReactMarkdown from "react-markdown";
import { useNavigate } from "react-router-dom";

function CreateNote() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const noteCreate = useSelector((state) => state.noteCreate);
  const { loading, error } = noteCreate;

  const resetHandler = () => {
    setTitle("");
    setCategory("");
    setContent("");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!title || !content || !category) return;
    dispatch(createNoteAction(title, content, category));
    resetHandler();
    navigate("/mynotes");
  };

  return (
    <MainPage>
      {/* Title */}
      <h2
        style={{
          textAlign: "center",
          fontSize: "32px",
          fontWeight: "bold",
          color: "#2F3C7E",
          marginBottom: "20px",
        }}
      >
        📝 Create a Note
      </h2>

      <Container
        style={{
          maxWidth: "750px", // Increased width for better layout
          backgroundColor: "#ffffff",
          padding: "25px",
          borderRadius: "12px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Card style={{ border: "none", backgroundColor: "#f9f9f9" }}>
          <Card.Body>
            <Form onSubmit={submitHandler}>
              {error && <ErrorMsg variant="danger">{error}</ErrorMsg>}

              <Form.Group controlId="title">
                <Form.Label style={{ fontWeight: "bold" }}>Title</Form.Label>
                <Form.Control
                  type="text"
                  value={title}
                  placeholder="Enter the title..."
                  onChange={(e) => setTitle(e.target.value)}
                  style={{
                    borderRadius: "8px",
                    padding: "10px",
                    fontSize: "16px",
                    border: "1px solid #ccc",
                  }}
                />
              </Form.Group>

              <Form.Group controlId="content" className="mt-3">
                <Form.Label style={{ fontWeight: "bold" }}>Content</Form.Label>
                <Form.Control
                  as="textarea"
                  value={content}
                  placeholder="Write your note..."
                  rows={5}
                  onChange={(e) => setContent(e.target.value)}
                  style={{
                    borderRadius: "8px",
                    padding: "10px",
                    fontSize: "16px",
                    border: "1px solid #ccc",
                  }}
                />
              </Form.Group>

              {content && (
                <Card className="mt-3">
                  <Card.Header style={{ fontWeight: "bold", backgroundColor: "#eef2f5" }}>
                    📄 Note Preview
                  </Card.Header>
                  <Card.Body>
                    <ReactMarkdown>{content}</ReactMarkdown>
                  </Card.Body>
                </Card>
              )}

              <Form.Group controlId="category" className="mt-3">
                <Form.Label style={{ fontWeight: "bold" }}>Category</Form.Label>
                <Form.Control
                  type="text"
                  value={category}
                  placeholder="Enter category..."
                  onChange={(e) => setCategory(e.target.value)}
                  style={{
                    borderRadius: "8px",
                    padding: "10px",
                    fontSize: "16px",
                    border: "1px solid #ccc",
                  }}
                />
              </Form.Group>

              {loading && <Loading size={50} />}
              
              {/* ✅ Responsive Button Layout (Fixed UI Issue) */}
              <Row className="mt-4">
                <Col xs={12} md={6} className="mb-2 mb-md-0">
                  <Button
                    type="submit"
                    className="w-100"
                    style={{
                      backgroundColor: "#007bff",
                      border: "none",
                      padding: "10px",
                      fontSize: "16px",
                      borderRadius: "8px",
                      transition: "0.3s",
                    }}
                    onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
                    onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
                  >
                    ➕ Create Note
                  </Button>
                </Col>

                <Col xs={12} md={6}>
                  <Button
                    onClick={resetHandler}
                    className="w-100"
                    style={{
                      backgroundColor: "#dc3545",
                      border: "none",
                      padding: "10px",
                      fontSize: "16px",
                      borderRadius: "8px",
                      transition: "0.3s",
                    }}
                    onMouseOver={(e) => (e.target.style.backgroundColor = "#a71d2a")}
                    onMouseOut={(e) => (e.target.style.backgroundColor = "#dc3545")}
                  >
                    🔄 Reset
                  </Button>
                </Col>
              </Row>
            </Form>
          </Card.Body>
          <Card.Footer
            className="text-center"
            style={{ fontSize: "14px", color: "#555", backgroundColor: "#f1f1f1" }}
          >
            ✨ Created on - {new Date().toLocaleDateString()}
          </Card.Footer>
        </Card>
      </Container>
    </MainPage>
  );
}

export default CreateNote;
