import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
import { useAlert } from "react-alert";

// import { useDispatch } from "react-redux";

const Register = () => {
  // const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

    const User = {
      name,
      email,
      password,
    };
    // console.log(User);
    await axios
      .post("http://localhost:3500/users/register", {
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
  };

  return (
    <div className="container w-50">
      <form>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="name"
            className="form-control"
            id="name"
            aria-describedby="emailHelp"
            onChange={handleNameChange}
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
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            onChange={handlePasswordChange}
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
    </div>
  );
};

export default Register;
