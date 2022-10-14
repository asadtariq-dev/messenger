import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <p className="logo">Purple</p>
        <form>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />

          <button>Login</button>
        </form>
        <p>Don't have an account? </p>
        <Link className="link" to={"/register"}>
          Register
        </Link>
      </div>
    </div>
  );
};

export default Login;
