import React, { useContext } from "react";
import { AuthContext } from "./AuthProvider"; // Assuming handleLogout is in the context
import { Link, useNavigate } from "react-router-dom";

const Logout = () => {
  const { handleLogout } = useContext(AuthContext); // Destructure handleLogout from context
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    handleLogout(); // Call the logout function from the context
    navigate("/", { state: { message: "You have been logged out!" } }); // Redirect to home with message
  };

  return (
    <>
      <li>
        <Link className="dropdown-item" to="/profile">
          Profile
        </Link>
      </li>
      <li>
        <hr className="dropdown-divider" />
      </li>
      <button className="dropdown-item" onClick={handleLogoutClick}>
        Logout
      </button>
    </>
  );
};

export default Logout;
