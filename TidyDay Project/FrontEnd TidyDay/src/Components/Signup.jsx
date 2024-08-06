import { Link, useNavigate } from "react-router-dom";
import smallLogo from "../assets/smallLogo.png";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { setUserName } from "../Redux/Action";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const email = useSelector((state) => state.email);

  const [data, setData] = useState({
    email: email,
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => {
      const updatedData = { ...prevData, [name]: value };
      if (name === "username") {
        dispatch(setUserName(updatedData.username));
      }
      return updatedData;
    });
  };

  const signin = async (event) => {
    event.preventDefault();
    if (data.username.length > 0 && data.password.length > 0) {
      try {
        const response = await fetch("http://localhost:9090/users/addUser", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        if (response.ok) {
          const result = await response.json(); // Assuming the response is JSON
          console.log("Posted", result);
          navigate("/pma/home");
        } else {
          console.log("Failed to sign up");
        }
      } catch (error) {
        console.log("Error signing up", error);
      }
    } else {
      console.log("Enter details");
    }
  };

  return (
    <div className="login-page">
      <section className="w-95 d-flex justify-content-center pb-4 p-4">
        <form className="card log-in-card" onSubmit={signin}>
          <div data-mdb-input-init className="form-outline mb-4 text-center">
            <img src={smallLogo} alt="" className="logo" />
            <br />
            <small>
              Hi, we have sent a verification email to{" "}
              <h6 className="fw-bold">{email}</h6>. Please enter your details
              to join myWorkSpace
            </small>
          </div>
          <div data-mdb-input-init className="form-outline mb-4">
            <h6>Create username</h6>
            <input
              type="text"
              className="form-control"
              value={data.username}
              onChange={handleChange}
              name="username"
            />
          </div>
          <div data-mdb-input-init className="form-outline mb-4">
            <h6>Create Password</h6>
            <input
              type="password"
              className="form-control"
              value={data.password}
              onChange={handleChange}
              name="password"
            />
          </div>
          <button
            data-mdb-ripple-init
            type="submit"
            className="btn btn-primary btn-block mb-4 mt-3"
          >
            Verify
          </button>{" "}
          <hr />
          <small className="text-center">
            Didn't receive email? <a href="#">Resend</a>,<br />
          </small>
        </form>
      </section>
    </div>
  );
}

export default Signup;
