
// src/Components/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserName } from '../Redux/Action';
import tidyday3 from '../assets/tidyday3.png';
import { Link } from 'react-router-dom';

function Login() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState(''); // Estado para manejar el mensaje de error

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

			const data = await response.json();

			if (response.ok) {
				if (data === 'Invalid login') {
					setError('Incorrect email or password. Please try again.'); // Mensaje para credenciales incorrectas
				} else {
					console.log('User logged in successfully');
					localStorage.setItem('username', data.username);
					localStorage.setItem('userId', data.id); // Almacena el ID del usuario
					dispatch(setUserName(data.username));
					navigate(`/pma/projects/${data.id}`); // Redirigir a la URL con el userId
					setError(''); // Limpiar mensaje de error en caso de éxito
				}
			} else {
				setError('An unexpected error occurred. Please try again later.'); // Mensaje para errores generales
			}
		} catch (error) {
			console.error('Error', error);
			setError('An unexpected error occurred. Please try again later.'); // Mensaje de error general
		}
	};

	return (
		<div className="login-page">
			<section className="w-95 d-flex justify-content-center pb-4 p-4">
				<form className="card log-in-card" onSubmit={login}>
					<div data-mdb-input-init className="form-outline mb-4 text-center">
						<img src={tidyday3} alt="" className="logo" />
					</div>
		
					<div data-mdb-input-init className="form-outline mb-4">
						<h6 style={{ color: '#fff' }}>Email</h6>
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
						<h6 style={{ color: '#fff' }}>Password</h6>
						<input 
							type="password"
							className="form-control"
							value={password}
							name="password"
							onChange={handleChange}
							required
						/>
					</div>
					
					{/* Mostrar mensaje de error */}
					{error && <p style={{ color: 'red' }}>{error} user or password is incorrect</p>}
		
					<small style={{ color: '#fff' }}> 
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
						<p style={{ color: '#fff' }}>Or sign in with:</p>
						{/* Social buttons here */}
					</div>
					<div className="text-center">
						<p style={{ color: '#fff' }}> 
							Don’t have an account? <Link to="/pma/signup">Sign up here</Link> {/* Ajustado */}
						</p>
					</div>
				</form>
			</section>
		</div>
	);
}

export default Login;
