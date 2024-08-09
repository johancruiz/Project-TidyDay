// src/Components/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserName } from '../Redux/Action';
import smallLogo from '../assets/smallLogo.png';
import { Link } from 'react-router-dom';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const login = async (e) => {
    e.preventDefault();
    const formData = new URLSearchParams();
    formData.append('email', email);
    formData.append('password', password);

    try {
      const response = await fetch('http://localhost:9090/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData.toString(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data !== 'Invalid login') {
        console.log('User logged in successfully');
        localStorage.setItem('username', data.username);
        localStorage.setItem('userId', data.id); // Almacena el ID del usuario
        dispatch(setUserName(data.username));
        navigate(`/pma/projects/${data.id}`); // Redirigir a la URL con el userId
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error('Error', error);
    }
  };

  return (
    <div className="login-page m-0">
      <section className="w-95 d-flex justify-content-center pb-4 p-4">
        <form className="card log-in-card" onSubmit={login}>
          <div data-mdb-input-init className="form-outline mb-4 text-center">
            <img src={smallLogo} alt="" className="logo" />
          </div>

          <div data-mdb-input-init className="form-outline mb-4">
            <h6>Email</h6>
            <input
              type="email"
              className="form-control"
              value={email}
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
              value={password}
              name="password"
              onChange={handleChange}
            />
          </div>
          <small>
            I agree to the <a href="#">workspace customer agreement</a>,<br />
            which incorporates by reference the AI product-specific terms and
            acknowledge the <a href="#">privacy policy</a>
          </small>

          <button
            data-mdb-ripple-init
            type="submit"
            className="btn btn-primary btn-block mb-4 mt-3"
          >
            Sign in
          </button>

          <div className="text-center">
            <p>Or sign in with:</p>
            {/* Social buttons here */}
          </div>
          <div className="text-center">
            <p>
              Don’t have an account? <Link to="/pma/signup">Sign up here</Link> {/* Ajustado */}
            </p>
          </div>
        </form>
      </section>
    </div>
  );
}

export default Login;
