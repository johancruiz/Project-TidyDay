// src/Components/SignUp.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserName } from "../Redux/Action";
import tidyday3 from '../assets/tidyday3.png';

function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });

  const validateForm = () => {
    let isValid = true;
    let newErrors = { username: "", email: "", password: "" };

    if (formData.username.trim().length < 3) {
      newErrors.username = "Username must be at least 3 characters long";
      isValid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      newErrors.email = "Invalid email address";
      isValid = false;
    }

    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch("http://localhost:9090/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (response.status === 201) {
        dispatch(setUserName(formData.username)); // Opcional: Puedes configurar el nombre del usuario aquí si es necesario
        navigate("/pma/login"); // Redirige al usuario a la página de inicio de sesión
      } else {
        setErrors(prevErrors => ({ ...prevErrors, form: "Signup failed. Please try again." }));
      }
    } catch (error) {
      console.error("Error", error);
      setErrors(prevErrors => ({ ...prevErrors, form: "Signup failed. Please try again." }));
    }
  };

  return (
    <div className="signup-page m-0">
      <section className="w-95 d-flex justify-content-center pb-4 p-4">
        <form className="card log-in-card" onSubmit={handleSubmit}>
          <div data-mdb-input-init className="form-outline mb-4 text-center">
            <img src={tidyday3} alt="" className="logo" />
            <br />
            <small style={{ color: '#fff' }}>Create a new account to get started with myWorkSpace</small>
          </div>

          <div data-mdb-input-init className="form-outline mb-4">
            <h6 style={{ color: '#fff' }}>Username</h6>
            <input
              type="text"
              className="form-control"
              value={formData.username}
              name="username"
              onChange={handleChange}
              required
            />
            {errors.username && <p style={{ color: 'red' }}>{errors.username}</p>}
          </div>

          <div data-mdb-input-init className="form-outline mb-4">
            <h6 style={{ color: '#fff' }}>Email</h6>
            <input
              type="email"
              className="form-control"
              value={formData.email}
              name="email"
              onChange={handleChange}
              required
            />
            {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
          </div>

          <div data-mdb-input-init className="form-outline mb-4">
            <h6 style={{ color: '#fff' }}>Password</h6>
            <input
              type="password"
              className="form-control"
              value={formData.password}
              name="password"
              onChange={handleChange}
              required
            />
            {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
          </div>

          {errors.form && <p style={{ color: 'red' }}>{errors.form}</p>}

          <button
            data-mdb-ripple-init
            type="submit"
            className="btn btn-primary btn-block mb-4 mt-3"
          >
            Sign Up
          </button>

          <div className="text-center">
            <p style={{ color: '#fff' }}>
              Already have an account? <Link to="/pma/login">Sign in here</Link>
            </p>
          </div>
        </form>
      </section>
    </div>
  );
}

export default SignUp;
