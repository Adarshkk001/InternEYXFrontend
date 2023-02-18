import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import store from "../app/store";
import { userLogin } from "../features/users/userSlice";
import { useDispatch } from "react-redux";
import { useAlert } from "react-alert";

import { RotatingLines } from "react-loader-spinner";

// console.log("Initial State", store.getState());

// store.dispatch(fetchUser());
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  // const user = useSelector((state) => state.user);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleLogin = async (event) => {
    event.preventDefault();
    await setIsLoading(true);
    console.log(isLoading);
    const User = {
      email: { email },
      password: { password },
    };
    await dispatch(userLogin(User))
      .unwrap()
      .then((User) => {
        alert.success(`Successfully Logged In`);
        navigate("/mainpage");
      })
      .catch((err) => {
        if (err.code === "ERR_NETWORK")
          alert.error(`Unable To Reach The Server`);
        else alert.error(`Error: Bad Credentials`);
      });
    setIsLoading(false);
  };

  return (
    <div className="container">
      <h1 className="text-center">Login</h1>
      <div className="d-flex justify-content-center">
        {!isLoading ? (
          <form className="w-50">
            <div className="mb-3">
              <label className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                id="inputEmail"
                aria-describedby="emailHelp"
                name="email"
                onChange={handleEmailChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="inputPassword"
                name="password"
                onChange={handlePasswordChange}
              />
            </div>
            <button
              type="submit"
              onClick={handleLogin}
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

export default Login;
