import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const baseURL = "https://todo-app-1h6x.onrender.com";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = (data) => {
    axios
      .post(`${baseURL}/register`, data)
      .then((res) => {
        navigate("/login");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="auth-container">
      <h1 className="title">SignUp</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="input_holder_form">
        <input
          type="email"
          placeholder="Email"
          {...register("email", { required: true })}
        />
        {errors.email && <p className="error-alert">Email is required</p>}

        <input
          type="password"
          placeholder="Password"
          {...register("password", { required: true })}
        />
        {errors.password && <p className="error-alert">Password is required</p>}

        <button type="submit">SignUp</button>
      </form>
      <p style={{ textAlign: "center", marginTop: "10px" }}>
        Already have an account? <Link to="/login">Click Here</Link>
      </p>
    </div>
  );
};

export default Register;
