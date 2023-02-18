import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userLogout } from "../features/users/userSlice";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import RegisterButton from "./RegisterButton";
import { BiUser } from "react-icons/bi";
import { useAlert } from "react-alert";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();

  const user = useSelector((state) => state.user);

  const handleLogin = (event) => {
    event.preventDefault();
    navigate("/login");
  };
  const handleLogout = (event) => {
    event.preventDefault();
    dispatch(userLogout());
    alert.success("Successfully Logged Out");
    navigate("/login");
  };
  const handleRegister = (event) => {
    event.preventDefault();
    navigate("/register");
  };
  const handleShop = (event) => {
    event.preventDefault();
    navigate("/mainpage");
  };
  const handlePreferences = (event) => {
    event.preventDefault();
    navigate("/preferences");
  };
  const handlePersonalPreferences = (event) => {
    event.preventDefault();
    navigate("/personalPage");
  };
  return (
    <div>
      <nav className="navbar fixed-top navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            InternEYX
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex">
              <li className="nav-item">
                <Link className="nav-link active" to="/" aria-current="page">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/about"
                >
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/contact"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <button
                  type="submit"
                  onClick={handleShop}
                  className="nav-link mx-1 active"
                >
                  Shop
                </button>
              </li>
              {user.authToken && (
                <li>
                  <button
                    type="submit"
                    onClick={handlePreferences}
                    className="nav-link mx-1 active"
                  >
                    Preferences
                  </button>
                </li>
              )}
              {user.authToken && (
                <li>
                  <button
                    type="submit"
                    onClick={handlePersonalPreferences}
                    className="nav-link mx-1 active"
                  >
                    Featured For You
                  </button>
                </li>
              )}
            </ul>

            {user.authToken && (
              <button disabled={true} className="btn btn-primary mx-1">
                {user.name} <BiUser />
              </button>
            )}
            {user.authToken && <LogoutButton handleLogout={handleLogout} />}
            {!user.authToken && <LoginButton handleLogin={handleLogin} />}
            {!user.authToken && (
              <RegisterButton handleRegister={handleRegister} />
            )}
          </div>
        </div>
      </nav>
      {!navigator.onLine && (
        <div className="alert alert-warning text-center p-1" role="alert">
          Unable to reach the server
        </div>
      )}
    </div>
  );
};

export default Navbar;
