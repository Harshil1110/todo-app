import axios from "axios";
import React, { useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
const baseURL = "http://localhost:5000/todo";
const token = localStorage.getItem("token");

const Todo = ({
  text,
  id,
  completed,
  setUpdateUI,
  setShowPopup,
  setPopupContent,
}) => {
  const [isChecked, setIsChecked] = useState(completed);
  const deleteTodo = () => {
    axios
      .delete(`${baseURL}/delete/${id}`, { headers: { Authorization: token } })
      .then((res) => {
        console.log(res.data);
        setUpdateUI((prevState) => !prevState);
      });
  };

  const updateToDo = () => {
    setPopupContent({ text, id });
    setShowPopup(true);
  };
  const toggleComplete = () => {
    setIsChecked((prev) => !prev);
    axios
      .put(
        `${baseURL}/update/${id}`,
        { completed: !isChecked },
        { headers: { Authorization: token } }
      )
      .then((res) => {
        console.log(res.data);
        setUpdateUI((prevState) => !prevState);
      });
  };
  return (
    <div className="toDo">
      <input type="checkbox" checked={isChecked} onChange={toggleComplete} />
      <span className={isChecked ? "completed" : ""}>{text}</span>
      <div className="icons">
        <AiFillEdit className="icon" onClick={updateToDo} />
        <RxCross1 className="icon" onClick={deleteTodo} />
      </div>
    </div>
  );
};

export default Todo;
