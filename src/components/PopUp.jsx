import axios from "axios";
import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { useForm } from "react-hook-form";
const baseURL = "http://localhost:5000/todo";
const token = localStorage.getItem("token");
const PopUp = ({ setShowPopup, popupContent, setUpdateUI }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      todo: popupContent.text,
    },
  });

  const updateToDo = (data) => {
    axios
      .put(
        `${baseURL}/update/${popupContent.id}`,
        { todo: data.todo },
        { headers: { Authorization: token } }
      )
      .then((res) => {
        console.log(res.data);
        setUpdateUI((prevState) => !prevState);
        setShowPopup(false);
        reset();
      });
  };

  return (
    <div className="backdrop">
      <div className="popup">
        <RxCross1 className="cross" onClick={() => setShowPopup(false)} />
        <h1>Update ToDo</h1>

        <form
          onSubmit={handleSubmit(updateToDo)}
          className="popup_input_holder"
        >
          <input
            type="text"
            name="todo"
            placeholder="Update ToDo..."
            {...register("todo", { required: true })}
          />
          <button type="submit">Update</button>
        </form>
        {errors.todo && <p className="error-alert">This field is required</p>}
      </div>
    </div>
  );
};

export default PopUp;
