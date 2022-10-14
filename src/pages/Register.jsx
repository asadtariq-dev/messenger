import React from "react";
import { Link } from "react-router-dom";
import AvatarLogo from "../img/addAvatar.png";

const Register = () => {
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <p className="logo">Purple</p>
        <form>
          <input type="text" placeholder="Name" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <input style={{ display: "none" }} type="file" id="file" />
          <div
            style={{
              border: "1px solid whitesmoke",
              padding: "5px",
              borderRadius: "10px",
            }}
          >
            <label htmlFor="file">
              <img src={AvatarLogo} width="40" alt="avatar" />
              <span>Add an avatar</span>
            </label>
          </div>
          <button>Sign up</button>
        </form>
        <p>Already have an account? </p>
        <Link className="link" to={"/login"}>
          Login
        </Link>
      </div>
    </div>
  );
};

export default Register;
