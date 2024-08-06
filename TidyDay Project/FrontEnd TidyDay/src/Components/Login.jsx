import { Link } from "react-router-dom";
import smallLogo from "../assets/smallLogo.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserName } from "../Redux/Action";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const login = async (e) => {
    e.preventDefault();
    const formData = new URLSearchParams();
    formData.append("email", email);
    formData.append("password", password);

    try {
      const response = await fetch(`http://localhost:9090/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData.toString(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data !== "Invalid login") {
        console.log("User logged in successfully");
        localStorage.setItem("username", data.username);
        dispatch(setUserName(data.username));
        navigate("/pma/home");
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <>
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
              <button
                data-mdb-ripple-init
                type="button"
                className="btn btn-light btn-floating mx-1"
              >
                {/* google */}
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  version="1.1"
                  x="0px"
                  y="0px"
                  viewBox="0 0 48 48"
                  enableBackground="new 0 0 48 48"
                  height="1.2em"
                  width="1.2em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="#FFC107"
                    d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12
	c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24
	c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                  ></path>
                  <path
                    fill="#FF3D00"
                    d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657
	C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                  ></path>
                  <path
                    fill="#4CAF50"
                    d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36
	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                  ></path>
                  <path
                    fill="#1976D2"
                    d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571
	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                  ></path>
                </svg>
              </button>

              <button
                data-mdb-ripple-init
                type="button"
                className="btn btn-light btn-floating mx-1"
              >
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 1024 1024"
                  height="1.2em"
                  width="1.2em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M747.4 535.7c-.4-68.2 30.5-119.6 92.9-157.5-34.9-50-87.7-77.5-157.3-82.8-65.9-5.2-138 38.4-164.4 38.4-27.9 0-91.7-36.6-141.9-36.6C273.1 298.8 163 379.8 163 544.6c0 48.7 8.9 99 26.7 150.8 23.8 68.2 109.6 235.3 199.1 232.6 46.8-1.1 79.9-33.2 140.8-33.2 59.1 0 89.7 33.2 141.9 33.2 90.3-1.3 167.9-153.2 190.5-221.6-121.1-57.1-114.6-167.2-114.6-170.7zm-10.6 267c-14.3 19.9-28.7 35.6-41.9 45.7-10.5 8-18.6 11.4-24 11.6-9-.1-17.7-2.3-34.7-8.8-1.2-.5-2.5-1-4.2-1.6l-4.4-1.7c-17.4-6.7-27.8-10.3-41.1-13.8-18.6-4.8-37.1-7.4-56.9-7.4-20.2 0-39.2 2.5-58.1 7.2-13.9 3.5-25.6 7.4-42.7 13.8-.7.3-8.1 3.1-10.2 3.9-16.8 6.3-25.3 9.2-34.4 9.3-5.5-.3-13.9-3.6-24.3-11.6-14.1-10.5-28.4-26-43-45.4-49.1-68.6-82.2-161.2-82.2-231.9 0-64.8 15.7-115.7 45.4-150.5 12.3-14.3 27.1-26.1 43.6-34.9 19.5-10.1 38.3-16.2 56.6-18.6 6.1-.8 11.8-1.2 17.4-1.2 11.8 0 22.2 2.4 35.4 5.2 14.2 3.1 26.5 5.8 42.4 5.8 13.5 0 27.7-2.5 44.3-6.3 15.6-3.6 30.3-5.1 44-5.1 15.5 0 31.8 2.2 50.1 6.7 20.2 4.9 37.9 12.4 53.2 21.9 15.6 9.7 29.6 22.3 41.7 37.6-8.7 5.7-17.5 11.6-25.8 17.7-40.2 29.5-61.5 64.1-61.1 105.3.3 33.5 13.6 69.1 36.7 98.4 9.2 11.8 20.3 22.9 33.1 33.2-9.7 26.5-22.1 54.5-37.3 81.1z"></path>
                  <path d="M702.6 74.6c-50.6 2-111.1 35.1-147.1 79.4-31.9 38.4-55.1 91.8-47.8 145.5 56.1 2.3 114.3-30.5 148.9-78.4 29.4-38.4 51.2-91.1 46-146.5z"></path>
                </svg>
              </button>

              <button
                data-mdb-ripple-init
                type="button"
                className="btn btn-light btn-floating mx-1"
              >
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 512 512"
                  height="1.2em"
                  width="1.2em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M349.33,69.34A144,144,0,0,0,162.67,69.34a155.45,155.45,0,0,0-32.53,50.55A150.73,150.73,0,0,0,117.33,203.2c0,55.11,31.78,127,88.09,199.52a615.1,615.1,0,0,0,57.27,65.61,8,8,0,0,0,11.24,0A615.1,615.1,0,0,0,331.2,402.72c56.31-72.55,88.09-144.45,88.09-199.52a150.73,150.73,0,0,0-12.81-83.31A155.45,155.45,0,0,0,349.33,69.34ZM256,163.76A60.24,60.24,0,1,1,195.76,224,60.27,60.27,0,0,1,256,163.76Z"></path>
                </svg>
              </button>
            </div>
            <div className="text-center">
              <p>
                Don’t have an account? <Link to="/signup">Sign up here</Link>
              </p>
            </div>
          </form>
        </section>
      </div>
    </>
  );
}

export default Login;
