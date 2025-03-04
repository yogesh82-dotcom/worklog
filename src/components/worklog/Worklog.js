import * as React from "react";
import { useEffect, useState } from "react";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import "./Worklog.css";

export default function Worklog() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [worklog, setWorklog] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [editId, setEditId] = useState(-1);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  //modal usestates
  const [showModal, setShowModal] = useState(false);
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  //edit usestates
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const apiUrl = "http://localhost:8000";
  //const apiUrl = "https://worklog-server-s3y8.onrender.com"

  const handleSubmit = () => {
    setShowModal(false);
    setError("");
    if (title.trim() !== "" && description.trim() !== "") {
      fetch(apiUrl + "/worklogs", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({ userId, title, description }),
      })
        .then((res) => {
          if (res.ok) {
            setWorklog((worklog) => [...worklog, { title, description }]);
            setTitle("");
            setDescription("");
            setMessage("Scribe added successully");
            setTimeout(() => {
              setMessage("");
            }, 3000);
          } else {
            setError("Unable to create New Log ");
          }
        })
        .catch((err) => {
          setError("Unable to create new scribe");
        });
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  const getItems = () => {
    fetch(apiUrl + `/worklogs/${userId}`)
      .then((res) => res.json())
      .then((res) => {
        setWorklog(res);
      });
  };

  const handleEdit = (item) => {
    setEditId(item._id);
    setEditTitle(item.title);
    setEditDescription(item.description);
  };

  const handleUpdate = () => {
    setError("");
    if (editTitle.trim() !== "" && editDescription.trim() !== "") {
      fetch(apiUrl + "/worklogs/" + editId, {
        method: "PUT",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({
          title: editTitle,
          description: editDescription,
        }),
      })
        .then((res) => {
          if (res.ok) {
            const updatedWorklog = worklog.map((item) => {
              if (item._id === editId) {
                item.title = editTitle;
                item.description = editDescription;
              }
              return item;
            });
            setWorklog(updatedWorklog);
            setTitle("");
            setDescription("");
            setMessage("Log updated successully");
            setTimeout(() => {
              setMessage("");
            }, 3000);
            setEditId(-1);
          } else {
            setError("Unable to Update Log ");
          }
        })
        .catch(() => {
          setError("Unable to create new log");
        });
    }
  };

  const handleEditCancel = () => {
    setEditId(-1);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure want to delete")) {
      fetch(apiUrl + "/worklogs/" + id, {
        method: "DELETE",
      }).then(() => {
        const updatedWorklog = worklog.filter((item) => item._id !== id);
        setWorklog(updatedWorklog);
      });
    }
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <>
      <nav className="flex navbar navbar-expand navbar-dark bg-black gap-16 fixed-top">
        <div className="container-fluid ">
          <a className="navbar-brand italiana-regular" href="/homepage">
            Scribly
          </a>
        </div>
        <div className="d-flex">
          <a
            href="https://mail.google.com/mail/u/0/?fs=1&to=yogeshbalaji82@gmail.com&su=Subject&body=Message%22&tf=cm"
            target="blank"
            className="me-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              fill="white"
              class="bi bi-envelope"
              viewBox="0 0 16 14"
            >
              <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z" />
            </svg>
          </a>
          <a href="https://github.com/yogesh82-dotcom" class="me-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="white"
              class="bi bi-github"
              viewBox="0 0 16 16"
            >
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
            </svg>
          </a>
          <a href="https://linkedin.com" className="me-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="white"
              class="bi bi-linkedin"
              viewBox="0 0 16 16"
            >
              <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
            </svg>
          </a>
          <a href="https://www.instagram.com/i_.yogesh_.i/" className="me-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="white"
              class="bi bi-instagram"
              viewBox="0 0 16 16"
            >
              <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
            </svg>
          </a>
        </div>
      </nav>
      <div className="container-fluid mt-5 pt-4">
        <div className="d-flex justify-content-end mt-4">
          <button
            type="button"
            className="btn btn-black px-4 py-2 rounded-pill playwrite-vn-font"
            onClick={handleShow}
          >
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="currentcolor"
                class="bi bi-plus-lg me-2 pb-1"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"
                />
              </svg>
            </span>
            start scribe
          </button>
          <button
            className="btn btn-black px-4 py-2.5 rounded-pill playwrite-vn-font ms-2"
            onClick={handleLogout}
          >
            <span className="me-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="currentColor"
                class="bi bi-box-arrow-right"
                viewBox="0 2 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"
                />
                <path
                  fill-rule="evenodd"
                  d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"
                />
              </svg>
            </span>
            end scribe
          </button>
        </div>
      </div>
      {showModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          role="dialog"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title lexend-font">Add new scribe</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleClose}
                ></button>
              </div>
              <div className="modal-body">
                <TextField
                  id="outlined-basic"
                  className="form-control mb-3"
                  label="Title"
                  variant="outlined"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  sx={{ width: "100%" }}
                />
                <TextField
                  id="outlined-multiline-static"
                  className="form-control mb-2"
                  label="Description"
                  multiline
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  sx={{ width: "100%" }}
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  onClick={handleClose}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-outline-success"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {message && (
        <Alert
          className="fixed-bottom mx-auto text-center custom-alert"
          variant="filled"
          severity="success"
        >
          {message}
        </Alert>
      )}
      <div className="container-fluid mt-4 px-2">
        {worklog.length === 0 ? (
          <div
            className="container-fluid d-flex justify-content-center align-items-center"
            style={{ minHeight: "60vh" }}
          >
            <h3 className="text-muted">
              No entries found, start scribing now!
            </h3>
          </div>
        ) : (
          <div className="container-fluid">
            <div className="masonry-grid">
              {worklog.map((item) => (
                <div
                  key={item._id}
                  className="card text-white masonry-item"
                  style={{ backgroundColor: "black", borderRadius: 15 }}
                >
                  <div className="card-body">
                    {editId === -1 || editId !== item._id ? (
                      <>
                        <h5 className="card-title">{item.title}</h5>
                        <p className="card-text">{item.description}</p>
                      </>
                    ) : (
                      <div className="form-group">
                        <input
                          placeholder="Title"
                          onChange={(e) => setEditTitle(e.target.value)}
                          value={editTitle}
                          className="form-control mb-2"
                          type="text"
                          style={{
                            backgroundColor: "black",
                            color: "white",
                            borderColor: "white",
                          }}
                        />
                        <input
                          placeholder="Description"
                          onChange={(e) => setEditDescription(e.target.value)}
                          value={editDescription}
                          className="form-control mb-2"
                          type="text"
                          style={{
                            backgroundColor: "black",
                            color: "white",
                            borderColor: "white",
                          }}
                        />
                      </div>
                    )}
                  </div>
                  <div className="card-footer d-flex justify-content-between">
                    {editId === -1 || editId !== item._id ? (
                      <>
                        <button
                          className="btn btn-outline-warning btn-sm"
                          onClick={() => handleEdit(item)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-sm red-btn"
                          onClick={() => handleDelete(item._id)}
                        >
                          Delete
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="btn btn-outline-success btn-sm"
                          onClick={handleUpdate}
                        >
                          Update
                        </button>
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={handleEditCancel}
                        >
                          Cancel
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {error && (
        <Alert
          className="fixed-bottom mx-auto text-center custom-alert"
          variant="filled"
          severity="error"
        >
          {error}
        </Alert>
      )}
    </>
  );
}
//from handleUpdate.

/*
    return <>
        <div className="p-4 bg-success text-light ">
            <h1><center>Worklog Website using MERN stack</center></h1>
        </div>
        <div >
            <h3>Add new log</h3>
            {message && <p className="text-success">{message}</p>}
            <div className="form-group d-flex gap-2">
                <input placeholder="Title" onChange={(e) => setTitle(e.target.value)} value={title} className="form-control" type="text"></input>
                <input placeholder="description" onChange={(e) => setDescription(e.target.value)} value={description} className="form-control" type="text"></input>
                <input placeholder="Time" onChange={(e) => setWorking_hours(e.target.value)} value={working_hours} className="form-control" type="time"></input>
                <button className="btn btn-dark" onClick={handleSubmit}>Submit</button>
            </div>
            {error && <p className="text-danger">{error}</p>}
        </div>
        <div className="row mt-3">
            <h3>Worklogs</h3>
            <ul className="list-group">
            {
                worklog.map((item) => <li className="list-group-item text-white bg-dark d-flex justify-content-between align-items-center my-2">
                    <div className="d-flex flex-column me-2 ">
                        {
                            editId == -1 || editId !== item._id ? <>
                                <span className="fw-bold">{item.title}</span>
                                <span>{item.description}</span>
                            </> : <>
                                <div className="form-group d-flex gap-2">
                                    <input placeholder="Title" onChange={(e) => setEditTitle(e.target.value)} value={editTitle} className="form-control" type="text"></input>
                                    <input placeholder="description" onChange={(e) => setEditDescription(e.target.value)} value={editDescription} className="form-control" type="text"></input>
                                    <input placeholder="Time" onChange={(e) => setEditWorking_hours(e.target.value)} value={editWorking_hours} className="form-control" type="time"></input>
                                </div>
                            </>
                        }
                    </div>
                    <div className="d-flex gap-2">
                        { editId == -1 ?<button className="btn btn-warning" onClick={ ()=>handleEdit(item)}> Edit </button> : <button className="btn btn-warning" onClick={handleUpdate}>Update</button> }
                        { editId == -1 ?<button className="btn btn-danger" onClick={ ()=>handleDelete(item._id)}>Delete</button> :
                        <button className="btn btn-danger" onClick={handleEditCancel}>Cancel</button> }
                    </div>
                </li>)
            }
            </ul>
        </div>
    </>
 */
