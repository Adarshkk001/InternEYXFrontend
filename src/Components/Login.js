import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import store from "../app/store";
import { userLogin } from "../features/users/userSlice";
import { useDispatch } from "react-redux";
import { useAlert } from "react-alert";

// console.log("Initial State", store.getState());

// store.dispatch(fetchUser());
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  // const user = useSelector((state) => state.user);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleLogin = async (event) => {
    event.preventDefault();
    const User = {
      email: { email },
      password: { password },
    };
    dispatch(userLogin(User))
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
  };

  return (
    <div className="container w-50">
      <form>
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
        <button type="submit" onClick={handleLogin} className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
