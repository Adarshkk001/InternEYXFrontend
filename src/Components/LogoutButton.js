import React from "react";

const LogoutButton = (props) => {
  return (
    <button
      type="submit"
      onClick={props.handleLogout}
      className="btn btn-primary mx-1"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
