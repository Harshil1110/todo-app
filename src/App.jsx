import React, { useState, useEffect } from "react";
import axios from "axios";
import Todo from "./components/Todo";
import PopUp from "./components/PopUp";
import { useForm } from "react-hook-form";
import Login from "./components/Login";
import Register from "./components/Register";

const baseURL = "http://localhost:5000";
const token = localStorage.getItem("token");

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

  useEffect(() => {
    axios
      .get(`${baseURL}/todo/list`, {
        headers: { Authorization: token },
      })
      .then((res) => setToDos(res.data))
      .catch((err) => console.log(err));
  }, [updateUI]);

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

  return (
    <>
      <main>
        <div className="container">
          <h1 className="title">ToDo App</h1>

          <form onSubmit={handleSubmit(saveToDo)} className="input_holder">
            <input
              type="text"
              placeholder="Add a ToDo..."
              name="todo"
              {...register("todo", { required: true })}
            />
            <button type="submit">Add</button>
          </form>
          {errors.todo && <p className="error-alert">This field is required</p>}

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
              <p style={{ textAlign: "center" }}>You Don't have any todos.</p>
            )}
          </div>
        </div>
        {showPopup && (
          <PopUp
            setShowPopup={setShowPopup}
            popupContent={popupContent}
            setUpdateUI={setUpdateUI}
          />
        )}
      </main>
      <Login/>
    </>
    // <Register/>
  );
};

export default App;
