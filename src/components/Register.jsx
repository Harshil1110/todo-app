import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
const baseURL = "http://localhost:5000/user";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    axios
      .post(`${baseURL}/register`, data)
      .then((res) => {
        // setUser(res.data.user); // Set user data to parent component
        // // Redirect or update UI as needed
        alert("register successfully");
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
    </div>
  );
};

export default Register;
