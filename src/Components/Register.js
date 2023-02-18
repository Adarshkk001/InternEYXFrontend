import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import { useAlert } from "react-alert";

const Register = () => {
  // const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const alert = useAlert();

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    await setIsLoading(true);
    const User = {
      name,
      email,
      password,
    };
    // console.log(User);
    await axios
      .post("https://interneyx.onrender.com/users/register", {
        name: User.name,
        email: User.email,
        password: User.password,
      })
      .then((response) => {
        alert.success(`Successfully Registered`);
        navigate("/login");
      })
      .catch((error) => {
        // console.log(error);
        if (error.response.status === 400) {
          error.response.data.errors.map((err) => {
            return alert.error(`Error: ${err.msg}`);
          });
        } else if (error.response.status === 409) {
          alert.error(`Error: ${error.response.data.errors}`);
        }
      });
    setIsLoading(false);
  };

  return (
    <div className="container">
      <h1 className="text-center">Register</h1>
      <div className="d-flex justify-content-center">
        {!isLoading ? (
          <form className="w-50">
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="name"
                className="form-control"
                id="name"
                aria-describedby="emailHelp"
                onChange={handleNameChange}
                placeholder="Length must be greater than 3"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                aria-describedby="emailHelp"
                onChange={handleEmailChange}
                placeholder="Enter a valid email"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                onChange={handlePasswordChange}
                placeholder="Length must be greater than 5"
              />
            </div>
            <button
              onClick={handleRegister}
              type="submit"
              className="btn btn-primary"
            >
              Submit
            </button>
          </form>
        ) : (
          <RotatingLines
            strokeColor="#4285F4"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
          />
        )}
      </div>
    </div>
  );
};

export default Register;
