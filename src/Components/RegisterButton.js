import React from "react";

const RegisterButton = (props) => {
  return (
    <button
      type="submit"
      onClick={props.handleRegister}
      className="btn btn-primary mx-1"
    >
      Register
    </button>
  );
};

export default RegisterButton;
