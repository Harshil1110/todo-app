import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
const baseURL = "http://localhost:5000/user";

const Login = ({ setUser }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    axios
      .post(`${baseURL}/login`, data)
      .then((res) => {
        // setUser(res.data.user);
        // // Redirect or update UI as needed
        alert("login successfully");
      })
      .catch((err) => {
        console.error(err);
        alert(err.response.data);
      });
  };

  return (
    <div className="auth-container">
      <h1 className="title">Login</h1>
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

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
