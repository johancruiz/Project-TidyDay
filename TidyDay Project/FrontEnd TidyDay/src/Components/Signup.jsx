import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import smallLogo from "../assets/smallLogo.png";
import { useDispatch } from "react-redux";
import { setUserName } from "../Redux/Action";

function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
        alert("Signup failed");
      }
    } catch (error) {
      console.error("Error", error);
      alert("Signup failed");
    }
  };

  return (
    <div className="signup-page m-0">
      <section className="w-95 d-flex justify-content-center pb-4 p-4">
        <form className="card log-in-card" onSubmit={handleSubmit}>
          <div data-mdb-input-init className="form-outline mb-4 text-center">
            <img src={smallLogo} alt="" className="logo" />
            <br />
            <small>Create a new account to get started with myWorkSpace</small>
          </div>

          <div data-mdb-input-init className="form-outline mb-4">
            <h6>Username</h6>
            <input
              type="text"
              className="form-control"
              value={formData.username}
              name="username"
              onChange={handleChange}
              required
            />
          </div>

          <div data-mdb-input-init className="form-outline mb-4">
            <h6>Email</h6>
            <input
              type="email"
              className="form-control"
              value={formData.email}
              name="email"
              onChange={handleChange}
              required
            />
          </div>

          <div data-mdb-input-init className="form-outline mb-4">
            <h6>Password</h6>
            <input
              type="password"
              className="form-control"
              value={formData.password}
              name="password"
              onChange={handleChange}
              required
            />
          </div>

          <button
            data-mdb-ripple-init
            type="submit"
            className="btn btn-primary btn-block mb-4 mt-3"
          >
            Sign Up
          </button>

          <div className="text-center">
            <p>
              Already have an account? <Link to="/pma/login">Sign in here</Link>
            </p>
          </div>
        </form>
      </section>
    </div>
  );
}

export default SignUp;
