import React, { useEffect, useState } from "react";
import MainPage from "../../MainPage/MainPage";
import { Link, useNavigate } from "react-router-dom";
import { Accordion, Badge, Button, Card, CardBody } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import { FaDownload, FaEdit, FaTrash } from "react-icons/fa";
import "./Mynotes.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteNoteAction, listNotes } from "../../../actions/noteActions";
import Loading from "../../Loading/Loading";
import ErrorMsg from "../../ErrorMsg/ErrorMsg";
import { marked } from "marked";
import { NOTE_LIST_RESET } from "../../../constants/noteContstant";

const Mynotes = ({ search }) => {
  const [activeKey, setActiveKey] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const noteList = useSelector((state) => state.noteList);
  const { loading, notes, error } = noteList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const noteCreate = useSelector((state) => state.noteCreate);
  const { success: createSuccess } = noteCreate;

  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { success: updateSuccess } = noteUpdate;

  const noteDelete = useSelector((state) => state.noteDelete);
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = noteDelete;

  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    } else {
      dispatch({type:NOTE_LIST_RESET})
      dispatch(listNotes());
    }
  }, [dispatch, userInfo, navigate, createSuccess, updateSuccess, successDelete]);

  // Reverse Notes before rendering to prevent click order issues
  const reversedNotes = [...(notes || [])].reverse();

  const handleDelete = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteNoteAction(id));
    }
  };

  const handleDownload = (note) => {
    const formattedDate = new Date(note.createdAt).toLocaleDateString();
    const markdownContent = marked(note.content); // Convert Markdown to HTML

    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${note.title}</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            padding: 20px;
            background-color: #f4f4f4;
            margin: 0;
          }
          .container {
            max-width: 800px;
            background: white;
            padding: 20px;
            margin: auto;
            box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
            border-radius: 10px;
          }
          h1 {
            color: #2F3C7E;
            text-align: center;
            margin-bottom: 10px;
            word-wrap: break-word;
          }
          .category {
            font-weight: bold;
            color: #28a745;
            text-align: center;
            margin-bottom: 15px;
            word-wrap: break-word;
          }
          .content {
            border-left: 5px solid #007bff;
            padding-left: 15px;
            font-size: 16px;
            color: #333;
            line-height: 1.6;
            word-wrap: break-word;
            overflow-wrap: break-word;
          }
          footer {
            font-size: 14px;
            color: #777;
            margin-top: 20px;
            text-align: center;
          }
          @media (max-width: 600px) {
            .container {
              max-width: 95%;
              padding: 15px;
            }
            h1 {
              font-size: 22px;
            }
            .content {
              font-size: 14px;
              padding-left: 10px;
            }
            footer {
              font-size: 12px;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>${note.title}</h1>
          <p class="category">Category: ${note.category}</p>
          <div class="content">${markdownContent}</div>
          <footer>Created On: ${formattedDate}</footer>
        </div>
      </body>
      </html>
    `;

    const blob = new Blob([htmlContent], { type: "text/html" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${note.title}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <MainPage>
      <div className="welcome-message">
        👋 Welcome Back, <span className="user-name">{userInfo?.name}</span>
        <p className="sub-text">Manage your notes effortlessly!</p>
      </div>

      <div className="create-note-btn">
        <Link to="/createnote">
          <Button variant="primary" size="lg" className="create-btn">
            + Create New Note
          </Button>
        </Link>
      </div>

      {errorDelete && <ErrorMsg variant="danger">{errorDelete}</ErrorMsg>}
      {loadingDelete && <Loading />}
      {error && <ErrorMsg variant="danger">{error}</ErrorMsg>}
      {loading && <Loading />}

      {notes?.length === 0 && (
        <p style={{ textAlign: "center", fontSize: "18px", marginTop: "20px" }}>
          No notes found. Create a new note!
        </p>
      )}

      <Accordion activeKey={activeKey}>
        {reversedNotes
          .filter((filteredNote) =>
            filteredNote.title.toLowerCase().includes((search || "").toLowerCase())
          )
          .map((note, index) => (
            <Card key={note._id} className="note-card">
              <Card.Header
                className="note-header"
                onClick={() =>
                  setActiveKey(activeKey === index.toString() ? null : index.toString())
                }
                style={{ wordWrap: "break-word", overflowWrap: "break-word" }}
              >
                <span className="note-title">{note.title}</span>
                <div className="note-actions">
                  <Button href={`/note/${note._id}`} size="sm" className="edit-btn">
                    <FaEdit /> Edit
                  </Button>

                  <Button onClick={() => handleDelete(note._id)} size="sm" className="delete-btn">
                    <FaTrash /> Delete
                  </Button>

                  <Button onClick={() => handleDownload(note)} size="sm" className="download-btn">
                    <FaDownload /> Download
                  </Button>
                </div>
              </Card.Header>

              <Accordion.Collapse eventKey={index.toString()}>
                <CardBody className="note-body">
                  <h4>
                    <Badge bg="success" className="category-badge" style={{ wordWrap: "break-word" }}>
                      Category: {note.category}
                    </Badge>
                  </h4>
                  <blockquote className="blockquote">
                    <p className="note-content" style={{ wordWrap: "break-word", overflowWrap: "break-word" }}>
                      <ReactMarkdown>{note.content}</ReactMarkdown>
                    </p>
                    <footer className="blockquote-footer">
                      Created On - {new Date(note.createdAt).toLocaleDateString()}
                    </footer>
                  </blockquote>
                </CardBody>
              </Accordion.Collapse>
            </Card>
          ))}
      </Accordion>
    </MainPage>
  );
};

export default Mynotes;
// 