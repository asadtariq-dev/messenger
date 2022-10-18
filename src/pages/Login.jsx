import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async () => {
    try {
      if (email && password) {
        await signInWithEmailAndPassword(auth, email, password);
        setError("");
        navigate("/");
      } else {
        setError("Email or password can't be blank");
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <p className="logo">Purple</p>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div>
          <input
            required={true}
            type="email"
            placeholder="Email"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <input
            required={true}
            type="password"
            placeholder="Password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />

          <button onClick={onSubmit}>Login</button>
        </div>
        <p>Don't have an account? </p>
        <Link className="link" to={"/register"}>
          Register
        </Link>
      </div>
    </div>
  );
};

export default Login;
