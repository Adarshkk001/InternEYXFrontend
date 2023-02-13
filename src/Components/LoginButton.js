import React from "react";

const LoginButton = (props) => {
  return (
    <button
      type="submit"
      onClick={props.handleLogin}
      className="btn btn-primary mx-1"
    >
      Login
    </button>
  );
};

export default LoginButton;
