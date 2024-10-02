import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useForm } from "react-hook-form";
import Todo from "./components/Todo";
import PopUp from "./components/PopUp";
import Login from "./components/Login";
import Register from "./components/Register";

const baseURL = "http://localhost:5000";

const App = () => {
  const [toDos, setToDos] = useState([]);
  const [updateUI, setUpdateUI] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState({});
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (isAuthenticated) {
      axios
        .get(`${baseURL}/todo/list`, {
          headers: { Authorization: token },
        })
        .then((res) => setToDos(res.data))
        .catch((err) => console.log(err));
    }
  }, [updateUI, isAuthenticated]);

  const saveToDo = (data) => {
    axios
      .post(
        `${baseURL}/todo/create`,
        { todo: data.todo },
        { headers: { Authorization: token } }
      )
      .then((res) => {
        console.log(res.data);
        setUpdateUI((prevState) => !prevState);
        reset();
      })
      .catch((err) => console.log(err));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/todos" />
            ) : (
              <Login setIsAuthenticated={setIsAuthenticated} />
            )
          }
        />

        <Route
          path="/register"
          element={isAuthenticated ? <Navigate to="/todos" /> : <Register />}
        />

        <Route
          path="/todos"
          element={
            isAuthenticated ? (
              <div className="container">
                <h1 className="title">ToDo App</h1>

                <form
                  onSubmit={handleSubmit(saveToDo)}
                  className="input_holder"
                >
                  <input
                    type="text"
                    placeholder="Add a ToDo..."
                    name="todo"
                    {...register("todo", { required: true })}
                  />
                  <button type="submit">Add</button>
                </form>
                {errors.todo && (
                  <p className="error-alert">This field is required</p>
                )}

                <div className="list">
                  {toDos.length > 0 ? (
                    toDos.map((td) => (
                      <Todo
                        key={td._id}
                        text={td.todo}
                        id={td._id}
                        completed={td.completed}
                        setUpdateUI={setUpdateUI}
                        setShowPopup={setShowPopup}
                        setPopupContent={setPopupContent}
                      />
                    ))
                  ) : (
                    <p style={{ textAlign: "center" }}>
                      You Don't have any todos.
                    </p>
                  )}
                </div>

                {showPopup && (
                  <PopUp
                    setShowPopup={setShowPopup}
                    popupContent={popupContent}
                    setUpdateUI={setUpdateUI}
                  />
                )}

                <button
                  onClick={handleLogout}
                  style={{ position: "absolute", top: "16px", right: "-285px" }}
                >
                  Logout
                </button>
              </div>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
