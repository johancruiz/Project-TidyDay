// src/Components/SignUp.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserName } from "../Redux/Action";
import tidyday3 from '../assets/tidyday3.png';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "../App.css"; // Asegúrate de crear este archivo para los estilos personalizados

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
	const [loading, setLoading] = useState(false); // Estado para la animación de carga

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

		setLoading(true); // Mostrar spinner de carga

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
		} finally {
			setLoading(false); // Ocultar spinner de carga
		}
	};

	return (
		<>
			<div className='welcome-mode'>
				<Navbar bg="light" expand="lg">
					<Container>
						<Navbar.Toggle aria-controls="basic-navbar-nav" className="custom-toggler" />
						<Navbar.Collapse id="basic-navbar-nav">
							<Nav>
								<Nav.Link href="/pma/login">Login</Nav.Link>
								<Nav.Link href="/pma/signup">Register</Nav.Link>
							</Nav>
							<Nav className="me-auto">
								<Nav.Link href="/pma">Home</Nav.Link>
							</Nav>
						</Navbar.Collapse>
					</Container>
				</Navbar>
			</div>
			<div className="mode-user">
				<div className="signup-page m-0">
					<section className="w-95 d-flex justify-content-center pb-4 p-4">
						{loading && (
							<div className="overlay">
								<div className="spinner"></div>
							</div>
						)}
						<form className={`card log-in-card ${loading ? 'blurred' : ''}`} onSubmit={handleSubmit}>
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
			</div>
		</>
	);
}

export default SignUp;
